#!/usr/bin/env python3
"""
Spell Organization Script
Organizes all spell HTML files by school and rank (Minor, Adept, Major, Grand)
"""

import os
import re
from pathlib import Path

# Spell school definitions
SPELL_SCHOOLS = {
    'Aeromancy': [
        'air bubble', 'electric pulse', 'endless lightning', 'evasion', 'gust',
        'lightning ball', 'lightning spear', 'lightning talon', 'mass vacuum',
        'shocking touch', 'static charge', 'thunderstorm', 'tornado', 'vacuum',
        'wall of wind', 'zap'
    ],
    'Arcanomancy': [
        'arcane shield', 'arcane ward', 'armor of magic', 'banish', 'bind creature',
        'finger of doom', 'gwenivenes gambit', 'identify', 'magic dome', 'magic sense',
        'sleep', 'spectral weapon', 'stillness of the mind', 'summoners circle',
        'symbol of power', 'telepathy', 'upon a star'
    ],
    'Biomancy': [
        'adaptive camouflage', 'blindness', 'carapace of the insect', 'echolocation',
        'eyes of the beast', 'final evolution', 'gift of the hydra', 'mutate',
        'perfect regeneration', 'serpents fangs', 'steal genetic sequence', 'venomous sludge'
    ],
    'Chronomancy': [
        'alter gravity', 'continuity error', 'deja vu', 'demiplane', 'dimensional lock',
        'foresight', 'greater planar rift', 'infinity', 'omnipresence', 'planar rift',
        'reciprocating dimensions', 'rewind creature', 'scrying', 'slow', 'speed',
        'teleport', 'time loop', 'void swap', 'watch history'
    ],
    'Demonology': [
        'beautiful world', 'cackling end', 'conjure fiend', 'curse', 'demonic embodiment',
        'demonic tether', 'enthralling invitation', 'false miracle', 'fiendish beguile',
        'gut of lead', 'liars lash', 'ray of the vile', 'repurpose vitality',
        'sphere of agony', 'unholy burst', 'visions of the mire'
    ],
    'Enchantment': [
        'bravery', 'calm', 'charm', 'cloud mind', 'confession', 'cowardice',
        'devourer of hope', 'enhance body', 'enslave', 'euphoria', 'heighten mind',
        'hypnosis', 'ignore', 'mental acrobatics', 'reframe perspective'
    ],
    'Geomancy': [
        'armor of stone', 'create crystal golem', 'crush', 'crystal spikes', 'crystalize',
        'dancing grains', 'earthquake', 'hurl earth', 'incarnate of shards',
        'isolated tectonics', 'lance of tar', 'loosen earth', 'magnetize', 'mend metal',
        'mold metal ore', 'oil field', 'reshape earth', 'reshape land', 'sinkhole',
        'siphon venom'
    ],
    'Heavenly': [
        'angels grace', 'beckon angel', 'blood to ichor', 'celestial linguistics',
        'celestial shroud', 'celestial tongue', 'celestial understanding', 'grace',
        'halos eminence', 'pillars of ruin', 'purge', 'rejuvenating light',
        'resurrection', 'shield of light'
    ],
    'Hydromancy': [
        'armor of ice', 'blizzard', 'chilling touch', 'create ice golem', 'dueling waves',
        'freeze liquid', 'ice spikes', 'ice wall', 'mending waters', 'rain',
        'shape ice', 'shards of ice', 'shatter', 'soothing fog', 'tomb of ice',
        'tsunami', 'water tentacle'
    ],
    'Nature': [
        'cloud scribe', 'envelop', 'find animals', 'plant growth', 'poison cloud',
        'poison splash', 'rebirth', 'the hunt'
    ],
    'Necromancy': [
        'armor of bones', 'banshees cry', 'dance with death', 'false life',
        'funeral rites', 'gaze of flesh', 'grasp of the grave', 'leech positive energy',
        'mimic life', 'plague cloud', 'shroud of ghosts', 'transfer vitality',
        'transport through decay'
    ],
    'Otherworldly': [
        'anagisa', 'duplicate', 'false eyes', 'false fortitude', 'false mana',
        'gates of the abyss', 'key of the mind', 'leeching grasp', 'mirage',
        'rend reality', 'void calling', 'whispering madness'
    ],
    'Pneumamancy': [
        'disparate', 'essence vampirism', 'genesis', 'imprison essence', 'projection',
        'rejuvenation', 'ruination', 'spectral graveyard', 'sunder'
    ],
    'Pyromancy': [
        'blinding flash', 'catastrophe', 'cauterize wounds', 'columns of fire',
        'control fire', 'create magma golem', 'finger flame', 'fireball', 'firework',
        'flame shroud', 'flame web', 'flames of the phoenix', 'flaming weapon',
        'heat object', 'heatwave', 'hurl fire', 'ignite', 'smoke screen', 'whip of flame'
    ],
    'Tenemancy': [
        'absolute darkness', 'banishment', 'dimming', 'kumulipo', 'paralysis',
        'shadow champion', 'shadow leap', 'silencing darkness', 'umbral grasp',
        'umbral servant', 'umbral tether'
    ],
    'Transmutation': [
        'ascendant element', 'condense', 'conduction', 'contamination', 'create material',
        'crown of honey', 'greater create material', 'greater transmute material',
        'harness water', 'polymorph', 'swarm of insects', 'transmute material',
        'tyrants hand', 'warding wine'
    ]
}

def get_spell_school(spell_name):
    """Determine which school a spell belongs to"""
    spell_name_lower = spell_name.lower()
    
    for school, spells in SPELL_SCHOOLS.items():
        if spell_name_lower in [s.lower() for s in spells]:
            return school
    
    # If not found in predefined lists, try to guess based on name
    if any(word in spell_name_lower for word in ['fire', 'flame', 'heat', 'burn']):
        return 'Pyromancy'
    elif any(word in spell_name_lower for word in ['ice', 'water', 'cold', 'freeze']):
        return 'Hydromancy'
    elif any(word in spell_name_lower for word in ['earth', 'stone', 'crystal', 'metal']):
        return 'Geomancy'
    elif any(word in spell_name_lower for word in ['wind', 'air', 'lightning', 'thunder']):
        return 'Aeromancy'
    elif any(word in spell_name_lower for word in ['bone', 'death', 'grave', 'ghost']):
        return 'Necromancy'
    elif any(word in spell_name_lower for word in ['angel', 'celestial', 'heaven', 'light']):
        return 'Heavenly'
    elif any(word in spell_name_lower for word in ['demon', 'fiend', 'curse', 'unholy']):
        return 'Demonology'
    elif any(word in spell_name_lower for word in ['mind', 'charm', 'calm', 'bravery']):
        return 'Enchantment'
    elif any(word in spell_name_lower for word in ['time', 'dimension', 'teleport', 'gravity']):
        return 'Chronomancy'
    elif any(word in spell_name_lower for word in ['plant', 'nature', 'animal', 'poison']):
        return 'Nature'
    elif any(word in spell_name_lower for word in ['void', 'reality', 'duplicate', 'false']):
        return 'Otherworldly'
    elif any(word in spell_name_lower for word in ['essence', 'spirit', 'spectral', 'soul']):
        return 'Pneumamancy'
    elif any(word in spell_name_lower for word in ['shadow', 'darkness', 'umbral']):
        return 'Tenemancy'
    elif any(word in spell_name_lower for word in ['transmute', 'create', 'polymorph', 'material']):
        return 'Transmutation'
    elif any(word in spell_name_lower for word in ['body', 'evolution', 'genetic', 'mutation']):
        return 'Biomancy'
    elif any(word in spell_name_lower for word in ['arcane', 'magic', 'bind', 'banish']):
        return 'Arcanomancy'
    else:
        return 'Uncategorized'

def get_spell_rank(ap_cost):
    """Convert AP cost to spell rank"""
    if ap_cost == 1:
        return 'Minor'
    elif ap_cost == 2:
        return 'Adept'
    elif ap_cost == 3:
        return 'Major'
    elif ap_cost >= 4:
        return 'Grand'
    else:
        return 'Unknown'

def analyze_spell_file(file_path):
    """Analyze a single spell HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract spell name from filename
        spell_name = file_path.stem
        
        # Extract AP cost from content
        ap_match = re.search(r'<b>AP Cost:</b>\s*(\d+)', content)
        if ap_match:
            ap_cost = int(ap_match.group(1))
            rank = get_spell_rank(ap_cost)
        else:
            ap_cost = 0
            rank = 'Unknown'
        
        # Determine school
        school = get_spell_school(spell_name)
        
        return {
            'name': spell_name,
            'school': school,
            'rank': rank,
            'ap_cost': ap_cost,
            'file_path': str(file_path)
        }
    except Exception as e:
        print(f"Error analyzing {file_path}: {e}")
        return None

def main():
    """Main function to organize all spells"""
    spells_dir = Path('spells')
    
    if not spells_dir.exists():
        print("Spells directory not found!")
        return
    
    # Analyze all spell files
    spell_files = list(spells_dir.glob('*.html'))
    spells_data = []
    
    print(f"Analyzing {len(spell_files)} spell files...")
    
    for spell_file in spell_files:
        spell_data = analyze_spell_file(spell_file)
        if spell_data:
            spells_data.append(spell_data)
    
    # Organize by school and rank
    organized_spells = {}
    
    for spell in spells_data:
        school = spell['school']
        rank = spell['rank']
        
        if school not in organized_spells:
            organized_spells[school] = {}
        
        if rank not in organized_spells[school]:
            organized_spells[school][rank] = []
        
        organized_spells[school][rank].append(spell)
    
    # Print organized results
    print("\n" + "="*80)
    print("SPELLS ORGANIZED BY SCHOOL AND RANK")
    print("="*80)
    
    for school in sorted(organized_spells.keys()):
        print(f"\n{school.upper()}")
        print("-" * len(school))
        
        for rank in ['Minor', 'Adept', 'Major', 'Grand']:
            if rank in organized_spells[school] and organized_spells[school][rank]:
                spells = organized_spells[school][rank]
                print(f"\n  {rank} ({len(spells)} spells):")
                for spell in sorted(spells, key=lambda x: x['name']):
                    print(f"    - {spell['name']} (AP: {spell['ap_cost']})")
    
    # Print summary statistics
    print("\n" + "="*80)
    print("SUMMARY STATISTICS")
    print("="*80)
    
    total_spells = len(spells_data)
    print(f"Total spells analyzed: {total_spells}")
    
    for school in sorted(organized_spells.keys()):
        school_total = sum(len(spells) for spells in organized_spells[school].values())
        print(f"{school}: {school_total} spells")
    
    # Save organized data to file
    output_file = 'organized_spells_report.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("SPELLS ORGANIZED BY SCHOOL AND RANK\n")
        f.write("="*80 + "\n\n")
        
        for school in sorted(organized_spells.keys()):
            f.write(f"{school.upper()}\n")
            f.write("-" * len(school) + "\n")
            
            for rank in ['Minor', 'Adept', 'Major', 'Grand']:
                if rank in organized_spells[school] and organized_spells[school][rank]:
                    spells = organized_spells[school][rank]
                    f.write(f"\n  {rank} ({len(spells)} spells):\n")
                    for spell in sorted(spells, key=lambda x: x['name']):
                        f.write(f"    - {spell['name']} (AP: {spell['ap_cost']})\n")
    
    print(f"\nDetailed report saved to: {output_file}")

if __name__ == "__main__":
    main()
