# PowerShell script to organize spells by school and level - Final Version

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

# Manual spell school mapping based on Spells.html
$spellSchoolMapping = @{
    # Pneumamancy
    "Sunder" = "Pneumamancy"
    "Disparate" = "Pneumamancy"
    "Imprison Essence" = "Pneumamancy"
    "Ruination" = "Pneumamancy"
    "Essence Vampirism" = "Pneumamancy"
    "Spectral Graveyard" = "Pneumamancy"
    "Rejuvenation" = "Pneumamancy"
    "Genesis" = "Pneumamancy"
    "Projection" = "Pneumamancy"
    
    # Biomancy
    "Mutate" = "Biomancy"
    "Gift of the Hydra" = "Biomancy"
    "Echolocation" = "Biomancy"
    "Adaptive Camouflage" = "Biomancy"
    "Eyes of the Beast" = "Biomancy"
    "Carapace of the Insect" = "Biomancy"
    "Serpent's Fangs" = "Biomancy"
    "Venomous Sludge" = "Biomancy"
    "Perfect Regeneration" = "Biomancy"
    "Steal Genetic Sequence" = "Biomancy"
    "Final Evolution" = "Biomancy"
    "Blindness" = "Biomancy"
    
    # Tenemancy
    "Dimming" = "Tenemancy"
    "Umbral Tether" = "Tenemancy"
    "Banishment" = "Tenemancy"
    "Kumulipo" = "Tenemancy"
    "Paralysis" = "Tenemancy"
    "Absolute Darkness" = "Tenemancy"
    "Shadow Champion" = "Tenemancy"
    "Umbral Servant" = "Tenemancy"
    "Shadow Leap" = "Tenemancy"
    "Umbral Grasp" = "Tenemancy"
    "Silencing Darkness" = "Tenemancy"
    
    # Arcanomancy
    "Magic Sense" = "Arcanomancy"
    "Identify" = "Arcanomancy"
    "Arcane Bolts" = "Arcanomancy"
    "Finger of Doom" = "Arcanomancy"
    "Gwenivene's Gambit" = "Arcanomancy"
    "Sleep" = "Arcanomancy"
    "Telepathy" = "Arcanomancy"
    "Symbol of Power" = "Arcanomancy"
    "Upon a Star" = "Arcanomancy"
    "Spectral Weapon" = "Arcanomancy"
    "Banish" = "Arcanomancy"
    "Stillness of The Mind" = "Arcanomancy"
    "Armor of Magic" = "Arcanomancy"
    "Summoner's Circle" = "Arcanomancy"
    "Magic Dome" = "Arcanomancy"
    "Bind Creature" = "Arcanomancy"
    "Arcane Ward" = "Arcanomancy"
    "Arcane Shield" = "Arcanomancy"
    
    # Heavenly
    "Spectral Sword Divine" = "Heavenly"
    "Grace" = "Heavenly"
    "Beckon Angel" = "Heavenly"
    "Angel's Grace" = "Heavenly"
    "Halo's Eminence" = "Heavenly"
    "Celestial Shroud" = "Heavenly"
    "Celestial Tongue" = "Heavenly"
    "Resurrection" = "Heavenly"
    "Pillars of Ruin" = "Heavenly"
    "Rejuvenating Light" = "Heavenly"
    "Celestial Understanding" = "Heavenly"
    "Celestial Linguistics" = "Heavenly"
    "Blood to Ichor" = "Heavenly"
    "Purge" = "Heavenly"
    "Shield of Light" = "Heavenly"
    
    # Otherworldly
    "Void Calling" = "Otherworldly"
    "Key of the Mind" = "Otherworldly"
    "Mirage" = "Otherworldly"
    "Rend Reality" = "Otherworldly"
    "Disfigure" = "Otherworldly"
    "Chaos Bolt" = "Otherworldly"
    "Gates of the Abyss" = "Otherworldly"
    "Anagisa" = "Otherworldly"
    "False Eyes" = "Otherworldly"
    "Leeching Grasp" = "Otherworldly"
    "Devour Magic" = "Otherworldly"
    "False Mana" = "Otherworldly"
    "Whispering Madness" = "Otherworldly"
    "Duplicate" = "Otherworldly"
    "False Fortitude" = "Otherworldly"
    
    # Nature
    "Plant Growth" = "Nature"
    "Binding Vines" = "Nature"
    "The Hunt" = "Nature"
    "World Tree" = "Nature"
    "Poison Splash" = "Nature"
    "Healing Sap" = "Nature"
    "Cloud Scribe" = "Nature"
    "Find Animals" = "Nature"
    "Poison Cloud" = "Nature"
    "Rebirth" = "Nature"
    "Find Plants" = "Nature"
    "Envelop" = "Nature"
    "Nature Lore" = "Nature"
    
    # Chronomancy
    "Slow" = "Chronomancy"
    "Void Swap" = "Chronomancy"
    "Deja Vu" = "Chronomancy"
    "Foresight" = "Chronomancy"
    "Speed" = "Chronomancy"
    "Reciprocating Dimensions" = "Chronomancy"
    "Teleport" = "Chronomancy"
    "Rewind Creature" = "Chronomancy"
    "Continuity Error" = "Chronomancy"
    "Scrying" = "Chronomancy"
    "Alter Gravity" = "Chronomancy"
    "Time Loop" = "Chronomancy"
    "Watch History" = "Chronomancy"
    "Planar Rift" = "Chronomancy"
    "Demiplane" = "Chronomancy"
    "Dimensional Lock" = "Chronomancy"
    "Omnipresence" = "Chronomancy"
    "Greater Planar Rift" = "Chronomancy"
    "Infinity" = "Chronomancy"
    
    # Demonology
    "Spectral Sword Demonic" = "Demonology"
    "Demonic Tether" = "Demonology"
    "Liar's Lash" = "Demonology"
    "Enthralling Invitation" = "Demonology"
    "Gut of Lead" = "Demonology"
    "Cackling End" = "Demonology"
    "Unholy Burst" = "Demonology"
    "Mark of Lethargy" = "Demonology"
    "Sphere of Agony" = "Demonology"
    "Repurpose Vitality" = "Demonology"
    "Ray of the Vile" = "Demonology"
    "False Miracle" = "Demonology"
    "Conjure Fiend" = "Demonology"
    "Demonic Embodiment" = "Demonology"
    "Curse" = "Demonology"
    "Visions of the Mire" = "Demonology"
    "Beautiful World" = "Demonology"
    "Fiendish Beguile" = "Demonology"
    
    # Enchantment
    "Enhance Body" = "Enchantment"
    "Cloud Mind" = "Enchantment"
    "Charm" = "Enchantment"
    "Hypnosis" = "Enchantment"
    "Alter Memory" = "Enchantment"
    "Devourer of Hope" = "Enchantment"
    "Reframe Perspective" = "Enchantment"
    "Bravery" = "Enchantment"
    "Confession" = "Enchantment"
    "Enslave" = "Enchantment"
    "Calm" = "Enchantment"
    "Cowardice" = "Enchantment"
    "Heighten Mind" = "Enchantment"
    "Ignore" = "Enchantment"
    "Euphoria" = "Enchantment"
    "Mental Acrobatics" = "Enchantment"
    
    # Necromancy
    "False Life" = "Necromancy"
    "Mimic Life" = "Necromancy"
    "Banshee's Cry" = "Necromancy"
    "Necrotic Ray" = "Necromancy"
    "Leech Positive Energy" = "Necromancy"
    "Grave Walk" = "Necromancy"
    "Grasp of the Grave" = "Necromancy"
    "Armor of Bones" = "Necromancy"
    "Shroud of Ghosts" = "Necromancy"
    "Funeral Rites" = "Necromancy"
    "Transfer Vitality" = "Necromancy"
    "Gaze of Flesh" = "Necromancy"
    "Transport Through Decay" = "Necromancy"
    "Dance with Death" = "Necromancy"
    "Sever Life" = "Necromancy"
    "Plague Cloud" = "Necromancy"
    
    # Transmutation
    "Transmute Material" = "Transmutation"
    "Harness Water" = "Transmutation"
    "Create Material" = "Transmutation"
    "Greater Create Material" = "Transmutation"
    "Tyrant's Hand" = "Transmutation"
    "Conduction" = "Transmutation"
    "Condense" = "Transmutation"
    "Polymorph" = "Transmutation"
    "Ascendant Element" = "Transmutation"
    "Contamination" = "Transmutation"
    "Crown of Honey" = "Transmutation"
    "Swarm of Insects" = "Transmutation"
    "Warding Wine" = "Transmutation"
    "Greater Transmute Material" = "Transmutation"
    "Razor Talon" = "Transmutation"
    
    # Hydromancy
    "Shape Ice" = "Hydromancy"
    "Ice Wall" = "Hydromancy"
    "Armor of Ice" = "Hydromancy"
    "Blizzard" = "Hydromancy"
    "Chilling Touch" = "Hydromancy"
    "Ice Spikes" = "Hydromancy"
    "Mending Waters" = "Hydromancy"
    "Tomb of Ice" = "Hydromancy"
    "Shards of Ice" = "Hydromancy"
    "Rain" = "Hydromancy"
    "Create Ice Golem" = "Hydromancy"
    "Tsunami" = "Hydromancy"
    "Freeze Liquid" = "Hydromancy"
    "Soothing Fog" = "Hydromancy"
    "Shatter" = "Hydromancy"
    "Water Tentacle" = "Hydromancy"
    "Dueling Waves" = "Hydromancy"
    
    # Pyromancy
    "Heat Object" = "Pyromancy"
    "Whip of Flame" = "Pyromancy"
    "Blinding Flash" = "Pyromancy"
    "Heatwave" = "Pyromancy"
    "Smoke Screen" = "Pyromancy"
    "Firework" = "Pyromancy"
    "Flaming Weapon" = "Pyromancy"
    "Catastrophe" = "Pyromancy"
    "Ignite" = "Pyromancy"
    "Create Magma Golem" = "Pyromancy"
    "Flames of the Phoenix" = "Pyromancy"
    "Hurl Fire" = "Pyromancy"
    "Fireball" = "Pyromancy"
    "Columns of Fire" = "Pyromancy"
    "Finger Flame" = "Pyromancy"
    "Ember's of Reflection" = "Pyromancy"
    "Cauterize Wounds" = "Pyromancy"
    "Flame Shroud" = "Pyromancy"
    "Flame Web" = "Pyromancy"
    "Control Fire" = "Pyromancy"
    
    # Geomancy
    "Sinkhole" = "Geomancy"
    "Dancing Grains" = "Geomancy"
    "Isolated Tectonics" = "Geomancy"
    "Magnetize" = "Geomancy"
    "Crystal Spikes" = "Geomancy"
    "Earthquake" = "Geomancy"
    "Loosen Earth" = "Geomancy"
    "Armor of Stone" = "Geomancy"
    "Create Crystal Golem" = "Geomancy"
    "Reshape Earth" = "Geomancy"
    "Reshape Land" = "Geomancy"
    "Crystalize" = "Geomancy"
    "Oil Field" = "Geomancy"
    "Mold Metal Ore" = "Geomancy"
    "Crush" = "Geomancy"
    "Hurl Earth" = "Geomancy"
    "Incarnate of Shards" = "Geomancy"
    "Mend Metal" = "Geomancy"
    "Siphon Venom" = "Geomancy"
    "Lance of Tar" = "Geomancy"
    "Sentinel's Aegis" = "Geomancy"
    
    # Aeromancy
    "Zap" = "Aeromancy"
    "Shocking Touch" = "Aeromancy"
    "Thunderstorm" = "Aeromancy"
    "Vacuum" = "Aeromancy"
    "Mass Vacuum" = "Aeromancy"
    "Lightning Bolt" = "Aeromancy"
    "Wall of Wind" = "Aeromancy"
    "Electric Pulse" = "Aeromancy"
    "Tornado" = "Aeromancy"
    "Gust" = "Aeromancy"
    "Static Charge" = "Aeromancy"
    "Evasion" = "Aeromancy"
    "Endless Lightning" = "Aeromancy"
    "Air Bubble" = "Aeromancy"
    "Lightning Talon" = "Aeromancy"
}

# Main execution
Write-Host "Analyzing spells..."

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
        
        # Try to find the school using the spell name
        if ($spellSchoolMapping.ContainsKey($info.Name)) {
            $school = $spellSchoolMapping[$info.Name]
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
$output | Out-File "organized_spells_final.txt" -Encoding UTF8

Write-Host "`nOrganized spells saved to 'organized_spells_final.txt'"

# Return the organized spells for further use
return $organizedSpells
