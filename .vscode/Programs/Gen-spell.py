import os

# Define the spell information
spell_info = """
Name: Sunder
AP Cost: 3
Spell Rank: Minor
Class: Pneumamancy
Subtype: Severance
Range: 10 Meters
Requirements: Sigils, Words of Power
Duration: Instant
Concentration: No
The caster targets one creature within range of themselves sending a translucent wave of magical force to the target creature. The creature must succeed on a Resistance (Mind) check or take 3d6 magic damage.
"""

# Split the spell information into individual spells
spells = spell_info.strip().split("Name:")

# Remove the empty first element
spells = spells[1:]

# Create a directory to store the HTML files
if not os.path.exists("spells"):
    os.makedirs("spells")

# Generate HTML pages for each spell
for spell in spells:
    # Parse the spell details
    spell_lines = spell.strip().split("\n")
    spell_name = spell_lines[0].strip()
    spell_details = "\n".join(spell_lines[1:])

    # Generate the HTML content
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{spell_name}</title>
    </head>
    <body>
        <div class="main-content">
            <div style="margin-top: 100px; background-color: rgba(0,0,0,0.5); border-radius: 10px; padding: 20px; color: white;">
                {spell_details}
            </div>
        </div>
    </body>
    </html>
    """

    # Save the HTML content to a file
    file_name = f"spells/{spell_name}.html"
    with open(file_name, "w") as file:
        file.write(html_content)

    print(f"Generated HTML file: {file_name}")
