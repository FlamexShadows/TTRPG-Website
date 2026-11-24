#include <iostream>
#include <fstream>
#include <string>
#include <vector>

int main() {
    std::ifstream inputFile("organized_spells_final.txt");
    std::ofstream outputFile("organized_spells_cleaned.txt");
    
    if (!inputFile.is_open()) {
        std::cerr << "Error: Could not open organized_spells_final.txt" << std::endl;
        return 1;
    }
    
    if (!outputFile.is_open()) {
        std::cerr << "Error: Could not create organized_spells_cleaned.txt" << std::endl;
        return 1;
    }
    
    std::string line;
    bool inUnknownSection = false;
    
    while (std::getline(inputFile, line)) {
        // Check if we're entering the Unknown section
        if (line.find("Unknown:") == 0) {
            inUnknownSection = true;
            continue;
        }
        
        // If we're in the Unknown section, skip until we find the next school
        if (inUnknownSection) {
            // Check if we've reached the end of the Unknown section (next school)
            if (line.length() > 0 && line[0] >= 'A' && line[0] <= 'Z' && 
                line.find(":") != std::string::npos && line.find("Unknown:") == std::string::npos) {
                inUnknownSection = false;
                outputFile << line << std::endl;
            }
            // If we're still in Unknown section, skip this line
            continue;
        }
        
        // Add the line if we're not in Unknown section
        outputFile << line << std::endl;
    }
    
    inputFile.close();
    outputFile.close();
    
    std::cout << "Cleaned organized spells file created as 'organized_spells_cleaned.txt'" << std::endl;
    std::cout << "Removed the Unknown category containing martial maneuvers and other non-spell content." << std::endl;
    
    return 0;
}
