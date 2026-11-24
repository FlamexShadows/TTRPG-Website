#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <sstream>

int main() {
    std::ifstream inputFile("organized_spells_cleaned.txt");
    std::ofstream outputFile("Webpages/Spells_Organized.html");
    
    if (!inputFile.is_open()) {
        std::cerr << "Error: Could not open organized_spells_cleaned.txt" << std::endl;
        return 1;
    }
    
    if (!outputFile.is_open()) {
        std::cerr << "Error: Could not create Spells_Organized.html" << std::endl;
        return 1;
    }
    
    // Write HTML header
    outputFile << R"(<!DOCTYPE html>
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
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      margin: 0;
      padding: 0;
    }
    header {
      width: 100%;
    }
    .main-content {
      text-align: left;
      position: absolute;
      left: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
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
    .spell-description-box strong {
        color: #B0E0E6;
        font-weight: bold;
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
        transition: all 0.3s ease;
    }
    .spell-item:hover {
        background-color: rgba(255,255,255,0.2);
        transform: translateX(5px);
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
  $(function(){
    $("header").load("A-Header.html", function(response, status, xhr) {
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
)";
    
    std::string line;
    std::string currentSchool = "";
    std::string currentRank = "";
    bool inSpellList = false;
    bool hasSpells = false;
    
    while (std::getline(inputFile, line)) {
        // Skip empty lines and headers
        if (line.empty() || line.find("Organized Spells") != std::string::npos || 
            line.find("=") != std::string::npos || line.find("---") != std::string::npos) {
            continue;
        }
        
        // Check if this is a school header
        if (line.find(":") != std::string::npos && line.find(":") == line.length() - 1 &&
            line.find("Minor") == std::string::npos && line.find("Adept") == std::string::npos &&
            line.find("Major") == std::string::npos && line.find("Grand") == std::string::npos) {
            
            // Close previous school section if exists
            if (!currentSchool.empty()) {
                if (inSpellList) {
                    outputFile << "            </div>\n";
                }
                outputFile << "        </div>\n";
                outputFile << "    </div>\n";
            }
            
            currentSchool = line.substr(0, line.length() - 1); // Remove the colon
            outputFile << "    <div class=\"school-section\">\n";
            outputFile << "        <div class=\"school-title\">" << currentSchool << "</div>\n";
            inSpellList = false;
            hasSpells = false;
        }
        
        // Check if this is a rank header
        if (line.find("  ") == 0 && line.find(":") != std::string::npos && 
            (line.find("Minor") != std::string::npos || line.find("Adept") != std::string::npos ||
             line.find("Major") != std::string::npos || line.find("Grand") != std::string::npos)) {
            
            if (inSpellList) {
                outputFile << "            </div>\n";
            }
            
            currentRank = line.substr(line.find_first_not_of(" "), line.find(":") - line.find_first_not_of(" "));
            outputFile << "        <div class=\"rank-section\">\n";
            outputFile << "            <div class=\"rank-title\">" << currentRank << "</div>\n";
            inSpellList = false;
            hasSpells = false;
        }
        
        // Check if this is a spell entry
        if (line.find("    - ") == 0) {
            if (!inSpellList) {
                outputFile << "            <div class=\"spell-list\">\n";
                inSpellList = true;
            }
            
            std::string spellName = line.substr(6); // Remove "    - "
            
            // Create the link - try to find the correct file
            std::string spellFileName = spellName;
            // Replace spaces with hyphens, remove apostrophes, colons, and periods
            size_t pos = 0;
            while ((pos = spellFileName.find(" ", pos)) != std::string::npos) {
                spellFileName.replace(pos, 1, "-");
                pos += 1;
            }
            pos = 0;
            while ((pos = spellFileName.find("'", pos)) != std::string::npos) {
                spellFileName.erase(pos, 1);
            }
            pos = 0;
            while ((pos = spellFileName.find(":", pos)) != std::string::npos) {
                spellFileName.erase(pos, 1);
            }
            pos = 0;
            while ((pos = spellFileName.find(".", pos)) != std::string::npos) {
                spellFileName.erase(pos, 1);
            }
            
            // Convert to lowercase
            for (char& c : spellFileName) {
                c = std::tolower(c);
            }
            
            std::string linkPath = "spells/" + spellFileName + ".html";
            outputFile << "                <div class=\"spell-item\"><a href=\"" << linkPath << "\">" << spellName << "</a></div>\n";
            hasSpells = true;
        }
    }
    
    // Close any open sections
    if (inSpellList) {
        outputFile << "            </div>\n";
    }
    if (!currentSchool.empty()) {
        outputFile << "        </div>\n";
        outputFile << "    </div>\n";
    }
    
    // Close the HTML
    outputFile << R"(
  </div>
</body>
</html>
)";
    
    inputFile.close();
    outputFile.close();
    
    std::cout << "New organized Spells.html file created as 'Webpages/Spells_Organized.html'" << std::endl;
    std::cout << "The file contains all spells organized by school and level as requested." << std::endl;
    
    return 0;
}

