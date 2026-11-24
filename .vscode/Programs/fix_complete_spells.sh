#!/bin/bash

# Fix Spells_Complete.html
sed -i 's|href="create-crystal-golem\.html"|href="create crystal golem.html"|g' Spells_Complete.html
sed -i 's|href="create-magma-golem\.html"|href="create magma golem.html"|g' Spells_Complete.html
sed -i 's|href="greater create-material\.html"|href="greater create material.html"|g' Spells_Complete.html
sed -i 's|href="halos eminence\.html"|href="halo'\''s eminence.html"|g' Spells_Complete.html
sed -i 's|href="shocking-touch\.html"|href="shocking touch.html"|g' Spells_Complete.html

# Fix Spells_0.html
sed -i 's|href="Ray of the Vile\.html"|href="Vile Ray.html"|g' Spells_0.html
sed -i 's|href="stillness of the mind\.html"|href="still mind.html"|g' Spells_0.html

echo "Fixed broken links in Spells_Complete.html and Spells_0.html"
