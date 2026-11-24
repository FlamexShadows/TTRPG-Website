# PowerShell script to create an organized Spells.html file

# Read the organized spells data
$organizedSpellsContent = Get-Content "organized_spells_final.txt" -Raw -Encoding UTF8

# Parse the organized spells data
$schools = @{}
$currentSchool = ""
$currentRank = ""

$lines = $organizedSpellsContent -split "`n"
foreach ($line in $lines) {
    $line = $line.Trim()
    
    # Check if this is a school header
    if ($line -match "^([^:]+):$" -and $line -notmatch "Organized Spells") {
        $currentSchool = $matches[1]
        if (-not $schools.ContainsKey($currentSchool)) {
            $schools[$currentSchool] = @{
                "Minor" = @()
                "Adept" = @()
                "Major" = @()
                "Grand" = @()
            }
        }
    }
    
    # Check if this is a rank header
    if ($line -match "^\s*([^:]+):$") {
        $currentRank = $matches[1]
    }
    
    # Check if this is a spell entry
    if ($line -match "^\s*-\s*(.+)$") {
        $spellName = $matches[1].Trim()
        if ($currentSchool -and $currentRank -and $schools.ContainsKey($currentSchool)) {
            if ($schools[$currentSchool].ContainsKey($currentRank)) {
                $schools[$currentSchool][$currentRank] += $spellName
            }
        }
    }
}

# Create the HTML content
$htmlContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sparks | Spells - Organized by School and Level</title>
  <link rel="stylesheet" type="text/css" href="A-Nav-bar.css"/>
  <style>
    body {
      font-family: sans-serif;
    }
    header {
      width: 100%;
    }
    .main-content {
      text-align: left;
      position: absolute;
      left: 0;
      width: 100%;
    }
    .spell-description-box {
        margin-top: 100px;
        background-color: rgba(0,0,0,0.7);
        border-radius: 10px;
        padding: 25px;
        color: #f0f0f0;
        margin-bottom: 30px;
        line-height: 1.6;
        font-size: 0.95em;
    }
    .spell-description-box h3 {
        color: #FFA07A;
        margin-top: 0;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        padding-bottom: 10px;
        font-size: 1.4em;
        font-weight: bold;
    }
    .spell-description-box h4 {
        color: #FFD700;
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 1.2em;
        font-weight: bold;
    }
    .spell-description-box p {
        margin-bottom: 15px;
    }
    .spell-description-box strong {
        color: #B0E0E6;
        font-weight: bold;
    }
    .spell-description-box ul {
        margin-left: 20px;
        margin-bottom: 15px;
        list-style-type: disc;
    }
    .spell-description-box ul ul {
        list-style-type: circle;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .spell-description-box li {
        margin-bottom: 6px;
    }
    
    .school-section {
        margin-bottom: 40px;
        background-color: rgba(0,0,0,0.5);
        border-radius: 10px;
        padding: 20px;
        color: white;
    }
    .school-title {
        color: #FFA07A;
        font-size: 1.8em;
        font-weight: bold;
        margin-bottom: 20px;
        border-bottom: 2px solid #FFA07A;
        padding-bottom: 10px;
    }
    .rank-section {
        margin-bottom: 20px;
    }
    .rank-title {
        color: #FFD700;
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom: 10px;
        border-left: 4px solid #FFD700;
        padding-left: 10px;
    }
    .spell-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 10px;
        margin-left: 20px;
    }
    .spell-item {
        background-color: rgba(255,255,255,0.1);
        padding: 8px 12px;
        border-radius: 5px;
        border-left: 3px solid #ADD8E6;
    }
    .spell-item a {
        color: #ADD8E6;
        text-decoration: none;
        font-weight: 500;
    }
    .spell-item a:hover {
        color: #E0FFFF;
        text-decoration: underline;
    }
    .no-spells {
        color: #888;
        font-style: italic;
        margin-left: 20px;
    }
  </style>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script>
  `$(function(){
    `$("header").load("A-Header.html", function(response, status, xhr) {
      if (status == "error") {
        var msg = "Sorry but there was an error loading the header: ";
        console.error(msg + xhr.status + " " + xhr.statusText);
      }
    });
  });
  </script>
</head>
<body>
  <header>
  </header>
  <div class="main-content">
    <div class="spell-description-box">
        <h3>Spells Organized by School and Level</h3>
        <p>This page displays all spells organized by their magical school and spell level. Spells are classified by the amount of mana required to cast them: <strong>Minor</strong>, <strong>Adept</strong>, <strong>Major</strong>, and <strong>Grand</strong>.</p>
        <p>The spell schools include: <strong>Pneumamancy</strong>, <strong>Biomancy</strong>, <strong>Tenemancy</strong>, <strong>Arcanomancy</strong>, <strong>Heavenly</strong>, <strong>Otherworldly</strong>, <strong>Nature</strong>, <strong>Chronomancy</strong>, <strong>Demonology</strong>, <strong>Enchantment</strong>, <strong>Necromancy</strong>, <strong>Transmutation</strong>, <strong>Hydromancy</strong>, <strong>Pyromancy</strong>, <strong>Geomancy</strong>, and <strong>Aeromancy</strong>.</p>
    </div>
"@

# Add each school section
foreach ($school in ($schools.Keys | Sort-Object)) {
    $htmlContent += "    <div class=`"school-section`">`n"
    $htmlContent += "        <div class=`"school-title`">$school</div>`n"
    
    # Add each rank section
    foreach ($rank in @("Minor", "Adept", "Major", "Grand")) {
        $htmlContent += "        <div class=`"rank-section`">`n"
        $htmlContent += "            <div class=`"rank-title`">$rank</div>`n"
        
        if ($schools[$school][$rank].Count -gt 0) {
            $htmlContent += "            <div class=`"spell-list`">`n"
            foreach ($spell in $schools[$school][$rank]) {
                # Create the link - try to find the correct file
                $spellFileName = $spell -replace " ", "-" -replace "'", "" -replace ":", "" -replace "\.", ""
                $spellFileName = $spellFileName.ToLower()
                
                # Try different possible file locations
                $possiblePaths = @(
                    "spells/$spellFileName.html",
                    "Webpages/$spellFileName.html",
                    "spells/$($spell.ToLower()).html",
                    "Webpages/$($spell.ToLower()).html"
                )
                
                $linkPath = $possiblePaths[0] # Default to first option
                $htmlContent += "                <div class=`"spell-item`"><a href=`"$linkPath`">$spell</a></div>`n"
            }
            $htmlContent += "            </div>`n"
        } else {
            $htmlContent += "            <div class=`"no-spells`">No $rank spells available</div>`n"
        }
        
        $htmlContent += "        </div>`n"
    }
    
    $htmlContent += "    </div>`n"
}

# Close the HTML
$htmlContent += @"
  </div>
</body>
</html>
"@

# Save the new organized Spells.html file
$htmlContent | Out-File "Webpages/Spells_Organized.html" -Encoding UTF8

Write-Host "New organized Spells.html file created as 'Webpages/Spells_Organized.html'"
Write-Host "The file contains all spells organized by school and level as requested."

# Also create a summary
$totalSpells = 0
foreach ($school in $schools.Keys) {
    foreach ($rank in @("Minor", "Adept", "Major", "Grand")) {
        $totalSpells += $schools[$school][$rank].Count
    }
}

Write-Host "`nSummary:"
Write-Host "Total schools: $($schools.Count)"
Write-Host "Total spells: $totalSpells"
Write-Host "`nSchools included:"
foreach ($school in ($schools.Keys | Sort-Object)) {
    Write-Host "  - $school"
}
