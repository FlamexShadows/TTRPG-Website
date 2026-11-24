import os
import re
from bs4 import BeautifulSoup
from collections import defaultdict

def extract_spell_info(file_path):
    """Extract spell information from an HTML file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        
        # Extract spell name from title or h2
        title = soup.find('title')
        spell_name = None
        if title:
            spell_name = title.text.replace('Sparks| ', '').strip()
        
        # Also check for h2 tag
        h2 = soup.find('h2')
        if h2 and not spell_name:
            spell_name = h2.text.strip()
        
        # Extract spell rank/level
        spell_rank = None
        ap_cost = None
        
        # Look for spell rank in the content
        content_div = soup.find('div', style=lambda x: x and 'margin-top: 100px' in x)
        if content_div:
            text = content_div.get_text()
            
            # Look for Spell Rank
            rank_match = re.search(r'Spell Rank:\s*(\w+)', text)
            if rank_match:
                spell_rank = rank_match.group(1)
            
            # Look for AP Cost to infer level if no rank given
            ap_match = re.search(r'AP Cost:\s*(\d+)', text)
            if ap_match:
                ap_cost = int(ap_match.group(1))
        
        # Infer level from AP cost if no explicit rank
        if not spell_rank and ap_cost:
            if ap_cost <= 2:
                spell_rank = "Minor"
            elif ap_cost <= 5:
                spell_rank = "Adept"
            elif ap_cost <= 10:
                spell_rank = "Major"
            else:
                spell_rank = "Grand"
        
        # Default to Minor if no information found
        if not spell_rank:
            spell_rank = "Minor"
        
        return {
            'name': spell_name,
            'rank': spell_rank,
            'ap_cost': ap_cost
        }
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

def get_spell_school(spell_name, spells_html_content):
    """Determine spell school from the Spells.html file."""
    # Parse the spells.html to get school information
    soup = BeautifulSoup(spells_html_content, 'html.parser')
    
    # Find all links in the table
    links = soup.find_all('a')
    
    for link in links:
        href = link.get('href', '')
        link_text = link.text.strip()
        
        # Check if this link matches our spell name
        if spell_name.lower() in href.lower() or spell_name.lower() in link_text.lower():
            # Find the parent td and then the parent tr to get the header
            td = link.find_parent('td')
            if td:
                tr = td.find_parent('tr')
                if tr:
                    # Get the previous tr which should contain the header
                    prev_tr = tr.find_previous_sibling('tr')
                    if prev_tr:
                        th = prev_tr.find('th')
                        if th:
                            return th.text.strip()
    
    return "Unknown"

def main():
    # Read the spells.html file to get school information
    with open('Webpages/Spells.html', 'r', encoding='utf-8') as f:
        spells_html_content = f.read()
    
    # Get all spell files
    spell_files = []
    
    # Check spells directory
    if os.path.exists('spells'):
        for file in os.listdir('spells'):
            if file.endswith('.html'):
                spell_files.append(os.path.join('spells', file))
    
    # Check Webpages directory for spell files
    if os.path.exists('Webpages'):
        for file in os.listdir('Webpages'):
            if file.endswith('.html') and not file.startswith('A-') and file != 'Spells.html':
                spell_files.append(os.path.join('Webpages', file))
    
    # Extract information from all spells
    spells_info = []
    for file_path in spell_files:
        info = extract_spell_info(file_path)
        if info and info['name']:
            # Get the school
            school = get_spell_school(info['name'], spells_html_content)
            info['school'] = school
            spells_info.append(info)
    
    # Organize spells by school and level
    organized_spells = defaultdict(lambda: defaultdict(list))
    
    for spell in spells_info:
        school = spell['school']
        rank = spell['rank']
        organized_spells[school][rank].append(spell['name'])
    
    # Sort spells within each level
    for school in organized_spells:
        for rank in organized_spells[school]:
            organized_spells[school][rank].sort()
    
    # Print organized spells
    print("Organized Spells by School and Level:")
    print("=" * 50)
    
    for school in sorted(organized_spells.keys()):
        print(f"\n{school}:")
        print("-" * len(school))
        
        for rank in ['Minor', 'Adept', 'Major', 'Grand']:
            if rank in organized_spells[school]:
                print(f"\n  {rank}:")
                for spell in organized_spells[school][rank]:
                    print(f"    - {spell}")
    
    # Save to a file for reference
    with open('organized_spells.txt', 'w', encoding='utf-8') as f:
        f.write("Organized Spells by School and Level:\n")
        f.write("=" * 50 + "\n")
        
        for school in sorted(organized_spells.keys()):
            f.write(f"\n{school}:\n")
            f.write("-" * len(school) + "\n")
            
            for rank in ['Minor', 'Adept', 'Major', 'Grand']:
                if rank in organized_spells[school]:
                    f.write(f"\n  {rank}:\n")
                    for spell in organized_spells[school][rank]:
                        f.write(f"    - {spell}\n")
    
    print(f"\nOrganized spells saved to 'organized_spells.txt'")
    
    return organized_spells

if __name__ == "__main__":
    main()
