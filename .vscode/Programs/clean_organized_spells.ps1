# PowerShell script to remove Unknown category from organized spells

# Read the organized spells data
$content = Get-Content "organized_spells_final.txt" -Raw -Encoding UTF8

# Split into lines
$lines = $content -split "`n"

# Create new content without Unknown category
$newContent = @()
$skipUnknown = $false
$inUnknownSection = $false

foreach ($line in $lines) {
    # Check if we're entering the Unknown section
    if ($line -match "^Unknown:$") {
        $inUnknownSection = $true
        continue
    }
    
    # If we're in the Unknown section, skip until we find the next school
    if ($inUnknownSection) {
        # Check if we've reached the end of the Unknown section (next school or end of file)
        if ($line -match "^[A-Z][a-zA-Z]+:$" -and $line -notmatch "Unknown:") {
            $inUnknownSection = $false
            $newContent += $line
        }
        # If we're still in Unknown section, skip this line
        continue
    }
    
    # Add the line if we're not in Unknown section
    $newContent += $line
}

# Join the lines back together
$cleanedContent = $newContent -join "`n"

# Save the cleaned content
$cleanedContent | Out-File "organized_spells_cleaned.txt" -Encoding UTF8

Write-Host "Cleaned organized spells file created as 'organized_spells_cleaned.txt'"
Write-Host "Removed the Unknown category containing martial maneuvers and other non-spell content."
