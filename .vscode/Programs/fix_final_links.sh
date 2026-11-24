#!/bin/bash

sed -i 's|href="control-fire\.html"|href="Control Flame.html"|g' Spells.html
sed -i 's|href="demonic-embodiment\.html"|href="Demonic Embodiment.html"|g' Spells.html
sed -i 's|href="ray-of-the-vile\.html"|href="Vile Ray.html"|g' Spells.html

echo "Fixed final known broken links in Spells.html"
