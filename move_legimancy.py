import os

SC = r"c:\Users\kylep\OneDrive\Desktop\TTRPG Website\Webpages\spells-complete.html"

with open(SC, "r", encoding="utf-8") as f:
    html = f.read()

# The Legimancy block that's currently floating outside the grid
floating_block = """
            <!-- Legimancy -->
            <div class="school-section" id="legimancy">
                <div class="school-title">Legimancy</div>

                <div class="rank-section">
                    <div class="rank-title">Minor</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="gag-order.html">Gag Order</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Adept</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="oath.html">Oath</a></div>
                        <div class="spell-item"><a href="confiscation.html">Confiscation</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Major</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="death-sentence.html">Death Sentence</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Grand</div>
                    <div class="spell-list">
                        <div class="no-spells">No spells yet</div>
                    </div>
                </div>
            </div>
    </div> <!-- /.page-layout -->"""

# Remove it from the end
closing_chain = "    </div></div></div></div></div></div>\n" + floating_block

if closing_chain not in html:
    print("ERROR: Could not find the floating Legimancy block. Checking alternate format...")
    print(repr(html[html.find("id=\"legimancy\"") - 20 : html.find("id=\"legimancy\"") + 50]))
else:
    # Replace with: Legimancy section first (inside the grid), then the closing chain
    legimancy_clean = """
            <!-- Legimancy -->
            <div class="school-section" id="legimancy">
                <div class="school-title">Legimancy</div>

                <div class="rank-section">
                    <div class="rank-title">Minor</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="gag-order.html">Gag Order</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Adept</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="oath.html">Oath</a></div>
                        <div class="spell-item"><a href="confiscation.html">Confiscation</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Major</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="death-sentence.html">Death Sentence</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Grand</div>
                    <div class="spell-list">
                        <div class="no-spells">No spells yet</div>
                    </div>
                </div>
            </div>
    </div></div></div></div></div></div>
    </div> <!-- /.page-layout -->"""

    html = html.replace(closing_chain, legimancy_clean)
    with open(SC, "w", encoding="utf-8") as f:
        f.write(html)
    print("Legimancy moved inside the schools-grid. Done.")
