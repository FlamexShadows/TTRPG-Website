#!/bin/bash
# Fix hyphenated links in Spells.html

sed -i 's|href="absolute-darkness\.html"|href="absolute darkness.html"|g' Spells.html
sed -i 's|href="adaptive camouflage\.html"|href="Adaptive Camouflage.html"|g' Spells.html
sed -i 's|href="angels-grace\.html"|href="angel'\''s grace.html"|g' Spells.html
sed -i 's|href="armor-of-bones\.html"|href="armor of bones.html"|g' Spells.html
sed -i 's|href="armor-of-ice\.html"|href="armor of ice.html"|g' Spells.html
sed -i 's|href="armor-of-stone\.html"|href="armor of stone.html"|g' Spells.html
sed -i 's|href="banshees-cry\.html"|href="banshee cry.html"|g' Spells.html
sed -i 's|href="beautiful-world\.html"|href="beautiful world.html"|g' Spells.html
sed -i 's|href="beckon-angel\.html"|href="beckon angel.html"|g' Spells.html
sed -i 's|href="blinding-flash\.html"|href="blinding flash.html"|g' Spells.html
sed -i 's|href="carapace of the insect\.html"|href="Carapace of the Insect.html"|g' Spells.html
sed -i 's|href="cauterize-wounds\.html"|href="cauterize wounds.html"|g' Spells.html
sed -i 's|href="celestial-linguistics\.html"|href="celestial linguistics.html"|g' Spells.html
sed -i 's|href="celestial-shroud\.html"|href="celestial shroud.html"|g' Spells.html
sed -i 's|href="celestial-tongue\.html"|href="celestial tongue.html"|g' Spells.html
sed -i 's|href="celestial-understanding\.html"|href="celestial understanding.html"|g' Spells.html
sed -i 's|href="chilling-touch\.html"|href="chilling touch.html"|g' Spells.html
sed -i 's|href="cloud-mind\.html"|href="cloud mind.html"|g' Spells.html
sed -i 's|href="cloud-scribe\.html"|href="cloud scribe.html"|g' Spells.html
sed -i 's|href="columns-of-fire\.html"|href="columns of fire.html"|g' Spells.html
sed -i 's|href="conjure-fiend\.html"|href="Conjure Fiend.html"|g' Spells.html
sed -i 's|href="continuity-error\.html"|href="continuity error.html"|g' Spells.html
sed -i 's|href="control-flame\.html"|href="Control Flame.html"|g' Spells.html
sed -i 's|href="create-crystal-golem\.html"|href="create crystal golem.html"|g' Spells.html
sed -i 's|href="create-ice-golem\.html"|href="create ice golem.html"|g' Spells.html
sed -i 's|href="create-magma-golem\.html"|href="create magma golem.html"|g' Spells.html
sed -i 's|href="create-material\.html"|href="create material.html"|g' Spells.html
sed -i 's|href="crown-of-honey\.html"|href="crown of honey.html"|g' Spells.html
sed -i 's|href="crystal-spikes\.html"|href="crystal spikes.html"|g' Spells.html
sed -i 's|href="dance-with-death\.html"|href="dance with death.html"|g' Spells.html
sed -i 's|href="deja-vu\.html"|href="deja vu.html"|g' Spells.html
sed -i 's|href="devourer-of-hope\.html"|href="devourer of hope.html"|g' Spells.html
sed -i 's|href="dimensional-lock\.html"|href="dimensional lock.html"|g' Spells.html
sed -i 's|href="enhance-body\.html"|href="enhance body.html"|g' Spells.html
sed -i 's|href="enthralling-invitation\.html"|href="enthralling invitation.html"|g' Spells.html
sed -i 's|href="essence-vampirism\.html"|href="essence vampirism.html"|g' Spells.html
sed -i 's|href="eyes of the beast\.html"|href="Eyes of the Beast.html"|g' Spells.html
sed -i 's|href="false-eyes\.html"|href="false eyes.html"|g' Spells.html
sed -i 's|href="false-fortitude\.html"|href="false fortitude.html"|g' Spells.html
sed -i 's|href="false-life\.html"|href="false life.html"|g' Spells.html

echo "Fixed common broken links in Spells.html"
