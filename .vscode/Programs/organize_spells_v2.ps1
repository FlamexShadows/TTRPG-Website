# PowerShell script to organize spells by school and level - Version 2

# Function to extract spell information from HTML file
function Get-SpellInfo {
    param([string]$FilePath)
    
    try {
        $content = Get-Content $FilePath -Raw -Encoding UTF8
        
        # Extract spell name from title
        $titleMatch = [regex]::Match($content, '<title>Sparks\|\s*(.*?)</title>')
        $spellName = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { $null }
        
        # Also check for h2 tag
        if (-not $spellName) {
            $h2Match = [regex]::Match($content, '<h2>(.*?)</h2>')
            if ($h2Match.Success) {
                $spellName = $h2Match.Groups[1].Value.Trim()
            }
        }
        
        # Extract spell rank/level
        $spellRank = $null
        $apCost = $null
        
        # Look for Spell Rank
        $rankMatch = [regex]::Match($content, 'Spell Rank:\s*(\w+)')
        if ($rankMatch.Success) {
            $spellRank = $rankMatch.Groups[1].Value
        }
        
        # Look for AP Cost
        $apMatch = [regex]::Match($content, 'AP Cost:\s*(\d+)')
        if ($apMatch.Success) {
            $apCost = [int]$apMatch.Groups[1].Value
        }
        
        # Infer level from AP cost if no explicit rank
        if (-not $spellRank -and $apCost) {
            if ($apCost -le 2) {
                $spellRank = "Minor"
            } elseif ($apCost -le 5) {
                $spellRank = "Adept"
            } elseif ($apCost -le 10) {
                $spellRank = "Major"
            } else {
                $spellRank = "Grand"
            }
        }
        
        # Default to Minor if no information found
        if (-not $spellRank) {
            $spellRank = "Minor"
        }
        
        return @{
            Name = $spellName
            Rank = $spellRank
            APCost = $apCost
        }
    }
    catch {
        Write-Host "Error processing $FilePath : $_"
        return $null
    }
}

# Function to build spell school mapping from Spells.html
function Build-SpellSchoolMapping {
    param([string]$SpellsHtmlContent)
    
    $mapping = @{}
    $lines = $SpellsHtmlContent -split "`n"
    $currentSchools = @()
    $currentSpells = @()
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        
        # Check if this is a school header row
        if ($line -match '<tr>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*<th>(.*?)</th>\s*</tr>') {
            $currentSchools = @($matches[1], $matches[2], $matches[3], $matches[4], $matches[5], $matches[6], $matches[7], $matches[8])
            continue
        }
        
        # Check if this is a spell row
        if ($line -match '<tr>\s*<td>') {
            # Get the next few lines to capture the full td content
            $tdContent = ""
            $j = $i
            while ($j -lt $lines.Count -and $lines[$j] -notmatch '</tr>') {
                $tdContent += $lines[$j] + "`n"
                $j++
            }
            
            # Extract all href links from this row
            $hrefMatches = [regex]::Matches($tdContent, 'href="([^"]*)"[^>]*>([^<]*)</a>')
            
            for ($k = 0; $k -lt [Math]::Min($hrefMatches.Count, $currentSchools.Count); $k++) {
                $href = $hrefMatches[$k].Groups[1].Value
                $spellName = $hrefMatches[$k].Groups[2].Value
                
                # Clean up the spell name and href
                $spellName = $spellName.Trim()
                $href = $href.Trim()
                
                if ($spellName -and $href) {
                    $mapping[$spellName] = $currentSchools[$k]
                    $mapping[$href] = $currentSchools[$k]
                }
            }
        }
    }
    
    return $mapping
}

# Main execution
Write-Host "Analyzing spells..."

# Read the spells.html file to get school information
$spellsHtmlContent = Get-Content "Webpages/Spells.html" -Raw -Encoding UTF8

# Build the spell school mapping
$spellSchoolMapping = Build-SpellSchoolMapping $spellsHtmlContent

# Get all spell files
$spellFiles = @()

# Check spells directory
if (Test-Path "spells") {
    $spellFiles += Get-ChildItem "spells" -Filter "*.html" | ForEach-Object { $_.FullName }
}

# Check Webpages directory for spell files
if (Test-Path "Webpages") {
    $spellFiles += Get-ChildItem "Webpages" -Filter "*.html" | Where-Object { 
        $_.Name -notlike "A-*" -and $_.Name -ne "Spells.html" 
    } | ForEach-Object { $_.FullName }
}

# Extract information from all spells
$spellsInfo = @()
foreach ($filePath in $spellFiles) {
    $info = Get-SpellInfo $filePath
    if ($info -and $info.Name) {
        # Get the school from mapping
        $school = "Unknown"
        $fileName = [System.IO.Path]::GetFileNameWithoutExtension($filePath)
        
        # Try to find the school using the spell name or filename
        if ($spellSchoolMapping.ContainsKey($info.Name)) {
            $school = $spellSchoolMapping[$info.Name]
        } elseif ($spellSchoolMapping.ContainsKey($fileName)) {
            $school = $spellSchoolMapping[$fileName]
        } elseif ($spellSchoolMapping.ContainsKey("$fileName.html")) {
            $school = $spellSchoolMapping["$fileName.html"]
        }
        
        $info.School = $school
        $spellsInfo += $info
    }
}

# Organize spells by school and level
$organizedSpells = @{}

foreach ($spell in $spellsInfo) {
    $school = $spell.School
    $rank = $spell.Rank
    
    if (-not $organizedSpells.ContainsKey($school)) {
        $organizedSpells[$school] = @{
            "Minor" = @()
            "Adept" = @()
            "Major" = @()
            "Grand" = @()
        }
    }
    
    $organizedSpells[$school][$rank] += $spell.Name
}

# Sort spells within each level
foreach ($school in $organizedSpells.Keys) {
    foreach ($rank in @("Minor", "Adept", "Major", "Grand")) {
        if ($organizedSpells[$school].ContainsKey($rank)) {
            $organizedSpells[$school][$rank] = $organizedSpells[$school][$rank] | Sort-Object
        }
    }
}

# Print organized spells
Write-Host "`nOrganized Spells by School and Level:"
Write-Host "=" * 50

$output = "Organized Spells by School and Level:`n"
$output += "=" * 50 + "`n"

foreach ($school in ($organizedSpells.Keys | Sort-Object)) {
    Write-Host "`n$school`:"
    Write-Host ("-" * $school.Length)
    
    $output += "`n$school`:`n"
    $output += ("-" * $school.Length) + "`n"
    
    foreach ($rank in @("Minor", "Adept", "Major", "Grand")) {
        if ($organizedSpells[$school].ContainsKey($rank) -and $organizedSpells[$school][$rank].Count -gt 0) {
            Write-Host "`n  $rank`:"
            $output += "`n  $rank`:`n"
            
            foreach ($spell in $organizedSpells[$school][$rank]) {
                Write-Host "    - $spell"
                $output += "    - $spell`n"
            }
        }
    }
}

# Save to a file for reference
$output | Out-File "organized_spells_v2.txt" -Encoding UTF8

Write-Host "`nOrganized spells saved to 'organized_spells_v2.txt'"

# Also save the mapping for debugging
$mappingOutput = "Spell School Mapping:`n"
$mappingOutput += "=" * 30 + "`n"
foreach ($spell in ($spellSchoolMapping.Keys | Sort-Object)) {
    $mappingOutput += "$spell -> $($spellSchoolMapping[$spell])`n"
}
$mappingOutput | Out-File "spell_mapping_debug.txt" -Encoding UTF8

Write-Host "Spell mapping debug info saved to 'spell_mapping_debug.txt'"

# Return the organized spells for further use
return $organizedSpells
