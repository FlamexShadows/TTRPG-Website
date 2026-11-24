# Spell Organization Script for PowerShell
# Organizes all spell HTML files by school and rank (Minor, Adept, Major, Grand)

# Spell school definitions
$spellSchools = @{
    'Aeromancy' = @('air bubble', 'electric pulse', 'endless lightning', 'evasion', 'gust', 'lightning ball', 'lightning spear', 'lightning talon', 'mass vacuum', 'shocking touch', 'static charge', 'thunderstorm', 'tornado', 'vacuum', 'wall of wind', 'zap')
    'Arcanomancy' = @('arcane shield', 'arcane ward', 'armor of magic', 'banish', 'bind creature', 'finger of doom', 'gwenivenes gambit', 'identify', 'magic dome', 'magic sense', 'sleep', 'spectral weapon', 'stillness of the mind', 'summoners circle', 'symbol of power', 'telepathy', 'upon a star')
    'Biomancy' = @('adaptive camouflage', 'blindness', 'carapace of the insect', 'echolocation', 'eyes of the beast', 'final evolution', 'gift of the hydra', 'mutate', 'perfect regeneration', 'serpents fangs', 'steal genetic sequence', 'venomous sludge')
    'Chronomancy' = @('alter gravity', 'continuity error', 'deja vu', 'demiplane', 'dimensional lock', 'foresight', 'greater planar rift', 'infinity', 'omnipresence', 'planar rift', 'reciprocating dimensions', 'rewind creature', 'scrying', 'slow', 'speed', 'teleport', 'time loop', 'void swap', 'watch history')
    'Demonology' = @('beautiful world', 'cackling end', 'conjure fiend', 'curse', 'demonic embodiment', 'demonic tether', 'enthralling invitation', 'false miracle', 'fiendish beguile', 'gut of lead', 'liars lash', 'ray of the vile', 'repurpose vitality', 'sphere of agony', 'unholy burst', 'visions of the mire')
    'Enchantment' = @('bravery', 'calm', 'charm', 'cloud mind', 'confession', 'cowardice', 'devourer of hope', 'enhance body', 'enslave', 'euphoria', 'heighten mind', 'hypnosis', 'ignore', 'mental acrobatics', 'reframe perspective')
    'Geomancy' = @('armor of stone', 'create crystal golem', 'crush', 'crystal spikes', 'crystalize', 'dancing grains', 'earthquake', 'hurl earth', 'incarnate of shards', 'isolated tectonics', 'lance of tar', 'loosen earth', 'magnetize', 'mend metal', 'mold metal ore', 'oil field', 'reshape earth', 'reshape land', 'sinkhole', 'siphon venom')
    'Heavenly' = @('angels grace', 'beckon angel', 'blood to ichor', 'celestial linguistics', 'celestial shroud', 'celestial tongue', 'celestial understanding', 'grace', 'halos eminence', 'pillars of ruin', 'purge', 'rejuvenating light', 'resurrection', 'shield of light')
    'Hydromancy' = @('armor of ice', 'blizzard', 'chilling touch', 'create ice golem', 'dueling waves', 'freeze liquid', 'ice spikes', 'ice wall', 'mending waters', 'rain', 'shape ice', 'shards of ice', 'shatter', 'soothing fog', 'tomb of ice', 'tsunami', 'water tentacle')
    'Nature' = @('cloud scribe', 'envelop', 'find animals', 'plant growth', 'poison cloud', 'poison splash', 'rebirth', 'the hunt')
    'Necromancy' = @('armor of bones', 'banshees cry', 'dance with death', 'false life', 'funeral rites', 'gaze of flesh', 'grasp of the grave', 'leech positive energy', 'mimic life', 'plague cloud', 'shroud of ghosts', 'transfer vitality', 'transport through decay')
    'Otherworldly' = @('anagisa', 'duplicate', 'false eyes', 'false fortitude', 'false mana', 'gates of the abyss', 'key of the mind', 'leeching grasp', 'mirage', 'rend reality', 'void calling', 'whispering madness')
    'Pneumamancy' = @('disparate', 'essence vampirism', 'genesis', 'imprison essence', 'projection', 'rejuvenation', 'ruination', 'spectral graveyard', 'sunder')
    'Pyromancy' = @('blinding flash', 'catastrophe', 'cauterize wounds', 'columns of fire', 'control fire', 'create magma golem', 'finger flame', 'fireball', 'firework', 'flame shroud', 'flame web', 'flames of the phoenix', 'flaming weapon', 'heat object', 'heatwave', 'hurl fire', 'ignite', 'smoke screen', 'whip of flame')
    'Tenemancy' = @('absolute darkness', 'banishment', 'dimming', 'kumulipo', 'paralysis', 'shadow champion', 'shadow leap', 'silencing darkness', 'umbral grasp', 'umbral servant', 'umbral tether')
    'Transmutation' = @('ascendant element', 'condense', 'conduction', 'contamination', 'create material', 'crown of honey', 'greater create material', 'greater transmute material', 'harness water', 'polymorph', 'swarm of insects', 'transmute material', 'tyrants hand', 'warding wine')
}

function Get-SpellSchool {
    param([string]$spellName)
    
    $spellNameLower = $spellName.ToLower()
    
    # Check predefined lists first
    foreach ($school in $spellSchools.Keys) {
        if ($spellSchools[$school] -contains $spellNameLower) {
            return $school
        }
    }
    
    # If not found, try to guess based on name
    if ($spellNameLower -match 'fire|flame|heat|burn') { return 'Pyromancy' }
    elseif ($spellNameLower -match 'ice|water|cold|freeze') { return 'Hydromancy' }
    elseif ($spellNameLower -match 'earth|stone|crystal|metal') { return 'Geomancy' }
    elseif ($spellNameLower -match 'wind|air|lightning|thunder') { return 'Aeromancy' }
    elseif ($spellNameLower -match 'bone|death|grave|ghost') { return 'Necromancy' }
    elseif ($spellNameLower -match 'angel|celestial|heaven|light') { return 'Heavenly' }
    elseif ($spellNameLower -match 'demon|fiend|curse|unholy') { return 'Demonology' }
    elseif ($spellNameLower -match 'mind|charm|calm|bravery') { return 'Enchantment' }
    elseif ($spellNameLower -match 'time|dimension|teleport|gravity') { return 'Chronomancy' }
    elseif ($spellNameLower -match 'plant|nature|animal|poison') { return 'Nature' }
    elseif ($spellNameLower -match 'void|reality|duplicate|false') { return 'Otherworldly' }
    elseif ($spellNameLower -match 'essence|spirit|spectral|soul') { return 'Pneumamancy' }
    elseif ($spellNameLower -match 'shadow|darkness|umbral') { return 'Tenemancy' }
    elseif ($spellNameLower -match 'transmute|create|polymorph|material') { return 'Transmutation' }
    elseif ($spellNameLower -match 'body|evolution|genetic|mutation') { return 'Biomancy' }
    elseif ($spellNameLower -match 'arcane|magic|bind|banish') { return 'Arcanomancy' }
    else { return 'Uncategorized' }
}

function Get-SpellRank {
    param([int]$apCost)
    
    switch ($apCost) {
        1 { return 'Minor' }
        2 { return 'Adept' }
        3 { return 'Major' }
        { $_ -ge 4 } { return 'Grand' }
        default { return 'Unknown' }
    }
}

function Analyze-SpellFile {
    param([string]$filePath)
    
    try {
        $content = Get-Content $filePath -Raw
        $spellName = [System.IO.Path]::GetFileNameWithoutExtension($filePath)
        
        # Extract AP cost
        if ($content -match '<b>AP Cost:</b>\s*(\d+)') {
            $apCost = [int]$matches[1]
            $rank = Get-SpellRank $apCost
        } else {
            $apCost = 0
            $rank = 'Unknown'
        }
        
        # Determine school
        $school = Get-SpellSchool $spellName
        
        return @{
            Name = $spellName
            School = $school
            Rank = $rank
            APCost = $apCost
            FilePath = $filePath
        }
    }
    catch {
        Write-Host "Error analyzing $filePath : $_"
        return $null
    }
}

# Main execution
Write-Host "Analyzing spell files..." -ForegroundColor Green

$spellsDir = "spells"
if (-not (Test-Path $spellsDir)) {
    Write-Host "Spells directory not found!" -ForegroundColor Red
    exit
}

$spellFiles = Get-ChildItem "$spellsDir\*.html"
$spellsData = @()

Write-Host "Found $($spellFiles.Count) spell files to analyze..." -ForegroundColor Yellow

foreach ($file in $spellFiles) {
    $spellData = Analyze-SpellFile $file.FullName
    if ($spellData) {
        $spellsData += $spellData
    }
}

# Organize by school and rank
$organizedSpells = @{}

foreach ($spell in $spellsData) {
    $school = $spell.School
    $rank = $spell.Rank
    
    if (-not $organizedSpells.ContainsKey($school)) {
        $organizedSpells[$school] = @{}
    }
    
    if (-not $organizedSpells[$school].ContainsKey($rank)) {
        $organizedSpells[$school][$rank] = @()
    }
    
    $organizedSpells[$school][$rank] += $spell
}

# Display results
Write-Host "`n" + "="*80 -ForegroundColor Cyan
Write-Host "SPELLS ORGANIZED BY SCHOOL AND RANK" -ForegroundColor Cyan
Write-Host "="*80 -ForegroundColor Cyan

foreach ($school in ($organizedSpells.Keys | Sort-Object)) {
    Write-Host "`n$($school.ToUpper())" -ForegroundColor Yellow
    Write-Host ("-" * $school.Length) -ForegroundColor Yellow
    
    foreach ($rank in @('Minor', 'Adept', 'Major', 'Grand')) {
        if ($organizedSpells[$school].ContainsKey($rank) -and $organizedSpells[$school][$rank].Count -gt 0) {
            $spells = $organizedSpells[$school][$rank] | Sort-Object Name
            Write-Host "`n  $rank ($($spells.Count) spells):" -ForegroundColor Green
            foreach ($spell in $spells) {
                Write-Host "    - $($spell.Name) (AP: $($spell.APCost))" -ForegroundColor White
            }
        }
    }
}

# Summary statistics
Write-Host "`n" + "="*80 -ForegroundColor Cyan
Write-Host "SUMMARY STATISTICS" -ForegroundColor Cyan
Write-Host "="*80 -ForegroundColor Cyan

Write-Host "Total spells analyzed: $($spellsData.Count)" -ForegroundColor Yellow

foreach ($school in ($organizedSpells.Keys | Sort-Object)) {
    $schoolTotal = 0
    foreach ($rank in $organizedSpells[$school].Keys) {
        $schoolTotal += $organizedSpells[$school][$rank].Count
    }
    Write-Host "$school`: $schoolTotal spells" -ForegroundColor White
}

# Save to file
$outputFile = "organized_spells_report.txt"
$reportContent = @()

$reportContent += "SPELLS ORGANIZED BY SCHOOL AND RANK"
$reportContent += "="*80
$reportContent += ""

foreach ($school in ($organizedSpells.Keys | Sort-Object)) {
    $reportContent += "$($school.ToUpper())"
    $reportContent += ("-" * $school.Length)
    
    foreach ($rank in @('Minor', 'Adept', 'Major', 'Grand')) {
        if ($organizedSpells[$school].ContainsKey($rank) -and $organizedSpells[$school][$rank].Count -gt 0) {
            $spells = $organizedSpells[$school][$rank] | Sort-Object Name
            $reportContent += ""
            $reportContent += "  $rank ($($spells.Count) spells):"
            foreach ($spell in $spells) {
                $reportContent += "    - $($spell.Name) (AP: $($spell.APCost))"
            }
        }
    }
    $reportContent += ""
}

$reportContent | Out-File -FilePath $outputFile -Encoding UTF8
Write-Host "`nDetailed report saved to: $outputFile" -ForegroundColor Green
