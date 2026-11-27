# Sparks of Dynasty Virtual Tabletop (VTT): Architecture and Build Plan

A plan for a Sparks of Dynasty VTT built on the Basic Rules (`Sparks Basic Rules.docx`) and the existing site: `Webpages/character-sheet-data.js`, `Webpages/character-sheet.js`, `Webpages/shops-data.js`, `Webpages/styles.css`, and the monster notes in `C:\New Vault\Monsters`.

Revised November 26, 2026. The changes from the first draft are listed in section 12.

---

## 1. Goals

- **Rules-aware.** Tokens, rolls and the map know the 6 AP economy, the armor pools, alignment damage, the d100 Critical and Decisive Strike rolls, all 37 conditions and the TR encounter budget.
- **Suggest, then confirm.** The VTT works out every result and shows it. The GM confirms or edits it before it applies. Every automated step has a manual override and an undo. Edge cases never block play.
- **One source of truth.** Rules logic and game data come from the same files as the character sheet. Nothing is written twice.
- **Static first.** Phases 1 and 2 run as static pages on the current Eleventy and GitHub Pages host. Multiplayer adds one small hosted service in Phase 3.
- **Tome look.** The UI uses the `styles.css` palette and the Cinzel and EB Garamond fonts.

---

## 2. Architecture

### 2.1 Shared rules engine (the most important change)

`character-sheet.js` already computes stats, saves, AC, armor pools, weapon math, item effects and attunement. The VTT needs the same math. Copying it would leave two copies to keep in step.

1. Move the pure rules functions out of `character-sheet.js` into `Webpages/sparks-rules.js`: `compute`, `weaponCalc`, `parseFx` and `collectFx`, `magicOf`, the damage pipeline, and condition effects.
2. The character sheet and the VTT both load `sparks-rules.js`.
3. Functions take plain data and return plain data. They never touch the page. This makes them testable.
4. Add a test page (`Webpages/tests/rules-tests.html`) with known answers. Examples: the Bog Goblin Spearman and Ashen Knight from the Monster Making Guide, plus the example character on the sheet.

### 2.2 Data pipeline

The site cannot read the Obsidian vault at runtime, so monster data needs a build step, the same way `update_rules.py` turns the docx into pages.

- **`tools/build_monsters.py`** reads `C:\New Vault\Monsters\*.md` and writes `Webpages/monsters-data.js` (`window.SPARKS_MONSTERS`). Fields: name, tier, TR, size, type, alignment, stats, AV, AC, Health, saves, skills, speeds, senses, resistances, immunities, attacks with traits and magic, actions with DCs, abilities, spell and maneuver lists, and lore.
- **Token art comes free.** The script copies `Monsters\Pixel Art\<Name> 8x.png` to `Webpages/Images/tokens/`. All 249 monsters already have a sprite.
- **Validation.** The script runs the monster audit while it builds: stat totals, AC, Health, saves and Max Turns against the template rules. Problems go into `monsters-report.txt`. It does not stop the build.
- **Conditions and vision types** come from the Basic Rules data, which `update_rules.py` already reads. The condition engine (section 7) holds a rules table built from that data, not hand-typed text.
- `MONSTERS-200.md` is not imported. Every monster in it is already a note in the vault.

### 2.3 Game state and the action log

One plain JSON object holds the whole game: map, tokens, initiative, round, conditions and log. Every change is an **action** (`{type: "damage", target, amount, damageType, ...}`) passed through one reducer.

- **Undo and redo** step back through the log.
- **The combat log** is the action list, shown in plain language.
- **Saving** writes state plus log to IndexedDB. Map images are stored as blobs there too, because localStorage holds about 5 MB. Export and import use a single `.json` file.
- **Multiplayer** (Phase 3) sends actions, not whole states. The GM's browser applies them and sends back the result.

### 2.4 Rendering

- **Canvas 2D** draws the grid, map and tokens in layers. It handles a 100 × 100 meter map with 60 tokens easily, and pixel-art tokens stay crisp with `imageSmoothingEnabled = false`.
- **Fog and lighting** (Phase 4) use an offscreen canvas mask. PixiJS or WebGL is needed only if testing shows Canvas 2D is too slow.
- **Panels** (sheet, initiative, log, dice) are plain HTML beside the canvas, built the same way as the character sheet.

### 2.5 Map import

- Images: PNG, JPG and WebP. The GM sets the grid size and offset by dragging over 1 square.
- **Universal VTT files** (`.dd2vtt`, `.uvtt`, from Dungeondraft and similar tools) bring in the image, grid size, walls, doors and light sources in one step. The Arnnwick battlemap is already in this format. Map walls by hand in Phase 1, import them from these files in Phase 2, and use their light sources in Phase 4.

---

## 3. Map, grid and movement

### 3.1 Scale and time
- 1 square = 1 meter. 1 round = 12 seconds, so 5 rounds = 1 minute.
- The tracker counts rounds and converts durations: 1 round, 1 minute, 10 minutes, 1 hour.

### 3.2 Sizes

| Size | Footprint | Reach | Strength bonus |
|---|---|---|---|
| Tiny | 1 × 1 m | 1 m | none |
| Small | 1 × 1 m | 1 m | none |
| Medium | 1 × 1 m | 1 m | none |
| Large | 2 × 2 m | 2 m | +4 |
| Giant | 4 × 4 m | 3 m | +8 |
| Titanic | 8 × 8 m | 5 m | +16 |
| Kaiju | 16 × 16 m | 8 m | +32 |

- Reach I, II and III add 1, 2 and 3 meters, measured from the edge of the footprint.
- Overpower checks add +10 for each size category larger than the target.

### 3.3 Movement
- Each AP spent on movement adds Speed meters to the token's move pool for the turn. Unused meters stay in the pool until the turn ends, so a token spends 1 AP, moves 3 m, attacks, then moves the last 2 m.
- Separate Walk, Fly (with elevation), Swim, Climb and Burrow speeds. Burrowers cannot pass through rock or metal unless their entry says so or their Strength is over 40.
- Modifiers: difficult terrain costs 2 m per 1 m. Dual wielding is −1 Speed. Heavy is −2 movement. Knocked Down is half speed. Slowed halves movement and Hastened doubles it. Pinned and Crippled cannot spend AP on movement.
- Race features such as Half Elf's Best of Both come from the rules engine's race data, not code written for each race.

---

## 4. Turns, AP and reactions

### 4.1 Initiative
- d20 + Wits modifier, plus bonuses from the rules engine (Vigilant armor, features).
- Solos get a second turn slot each round. The GM sets where the second slot falls. The default is half the initiative order later.

### 4.2 AP
- Start of turn: AP = max AP (6, then +1 Hastened, −1 Slowed, 2 for Freezing, 0 for Paralyzed, Petrified, Stunned, Unconscious or Dying). The reaction refreshes. Start-of-turn conditions tick.
- Unspent AP is lost at the end of the turn.
- **AP carryover:** an action costing more than the AP left spends the remainder and stores what is still owed. The next turn pays the rest first. Actions longer than 1 round take 6 AP each turn.
- **Action buttons:** Attack 3 (2 with Tempo), off-hand attack 1 (after an attack, light weapon, half the rolled damage), Move, Help 2, Activate Equipment 3, Object Interaction 4 (2 for quick tasks), Stand Up 1, Reload 1 (+1 for Firearm).

### 4.3 Opportunity attacks
Before a move or action resolves, the VTT checks for enemies who see the actor, have it in reach, and still have their reaction. If any do, it prompts the defender. Triggers, from the Basic Rules:
1. Moving away from a creature in melee range who sees you.
2. A ranged attack or a reload while in melee.
3. A spell or maneuver in melee, unless it is a touch or melee attack.
4. Activate Equipment. Both creatures provoke when the item belongs to or targets another creature.
5. A distracting check: picking a lock, stabilizing, picking up an object, moving a heavy object.
6. Having max AP reduced to 0. The creature stays open until it rises.

---

## 5. Attacks and damage

### 5.1 Attack roll
1. Roll 1d20 + attack modifier against AC. Advantage and disadvantage from all sources cancel into a normal roll if both are present.
2. Flanking: two allies in melee with the target on different sides gain +2.
3. Ranged attacks with a hostile creature in melee reach take −5.
4. Miss chances: Blind attacker rolls d100 and misses on 50 or higher. Attacks against an unseen invisible creature miss on 75 or higher.
5. Trait adjustments: Homing ignores cover, concealment and the Finesse bonus to AC. Phasing ignores Fortitude, armor and shield bonuses.

### 5.2 Critical and Decisive Strikes
Only physical melee and ranged attacks roll for these, plus spell attacks with the Deadly Magic feat.
1. **A hit outside the decisive range:** roll d100. At or under Critical Chance (Wits score plus bonuses), it is a Critical Strike: rolled weapon dice are doubled.
2. **A roll in the decisive range** (a natural 20, widened by 1 per level of Deadly): automatic Critical Strike. Roll d100. At or under Critical Chance, it becomes a Decisive Strike: dice are tripled (or ×4 with the Chosen Weapon Decisive Dice effect) and the target becomes Crippled.
3. **The first attack by a creature the target is Unaware of** is a Critical Strike. **A hit on an Unconscious creature** is an automatic Critical Strike and can become a Decisive Strike.
4. Dice added by magic traits are never multiplied.

### 5.3 Damage order
1. **Vulnerability** doubles the damage.
2. **Resistance** subtracts its value, minus what the attack ignores (Enchanted ignores 5 per level; Vorpal and Piercing ignore physical resistance and immunity).
3. **Armor absorbs** what is left:
   - Piercing, Slashing, Bludgeoning and Necrotic hit Physical Armor.
   - Psychic, Fire, Cold, Earth, Poison and Air hit Magical Armor.
   - Holy, Unholy and Magic read alignment. Against Evil, Good and Neutral targets respectively, they skip armor and go to True Armor, then Health. Against anyone else they hit Magical Armor.
   - True damage skips Physical and Magical Armor and goes to True Armor, then Health. It keeps its source type for resistance.
   - Monsters have one Armor Value that takes the place of both pools.
4. **Health** takes the rest. At 0 or below, the creature gains Dying. Damage taken while Dying marks one failed death save.

Cursed: the creature counts as having 0 armor for effects that depend on armor, even while its armor holds.

---

## 6. Vision, light and stealth

### 6.1 Light and vision
Map layers hold bright light, darkness and true darkness, plus magical barriers and illusions. The vision types come from the Basic Rules:

| Vision | Effect |
|---|---|
| Normal | Cannot see in darkness (−10 on sight-based Sense Environment). Blind in true darkness. |
| Dark Sight | Sees in darkness as bright light. In true darkness, −10 on sight-based Sense Environment. |
| Blind Sight | Perceives without sight. Unaffected by darkness and Blind. No color. |
| Witch Sight | Sees through illusions and magical barriers, and centers spells on their far side. Projectiles still hit the barrier. |
| Supernatural Vision | Sees through true darkness and into the Border World. Shapechangers look twisted. |
| True Vision | Sees through illusions, true darkness and shapechangers' disguises. |

### 6.2 Stealth
- Sneak rolls once and stores the result. Each creature hidden from rolls Sense Environment against it. A failure gives that creature Unaware of the hider. A creature with clear line of sight sees the hider with no roll.
- The result ends when the hider reveals itself, moves 20 meters, or after 1 minute (5 rounds).
- Unaware ends when the turn ends after the creature becomes aware.

---

## 7. Conditions

The engine stores each condition as `{name, source, expiresAtRound}` and reads its effects from a table of all 37 Basic Rules conditions. Each row gives the condition's AP, movement, AC, resistance and roll modifiers, its start-of-turn tick, and the conditions it cancels or turns into.

- **Cancel pairs:** Burning and Freezing. Hastened and Slowed. Fearful or Hopeless against Motivated or Inspired.
- **Escalations:** Tired twice becomes Exhausted. Fearful twice becomes Hopeless. Motivated twice becomes Inspired.
- **Start-of-turn ticks:** Bleeding (−1 Health), Burning (2d6 fire), Corroding (half current Physical Armor), Draining (half current Magical Armor), Shocked (d100, wastes the turn on 50 or lower).
- **Dying:** 0 AP and Unconscious. End-of-turn death save: d100 at or under Fortitude modifier + level. Track failed saves, rounds spent Dying, and how far Health is below 0. The creature dies at 3 failed saves, after 5 rounds of Dying, or when its negative Health passes its Fortitude score. Stabilizing is a Knowledge (Medical) check against a DC equal to the negative Health.
- **Exhausted:** Tired plus a cumulative −2 to physical stats. Past −10, each new stack calls for a DC 30 Resistance (Body) save, rising 10 each time.
- **Shown, not automated:** conditions that need GM judgment, such as Fearful's source, Possessed and Dominated, show their rules text and a reminder chip. The GM resolves them.

---

## 8. Spells, maneuvers, items and rest

- **Casting** spends Mana by rank (Minor 5, Adept 10, Major 20, Grand 40) or Stamina by tier. It blocks spells needing Words of Power while Silenced, and blocks Mana, Stamina and magic items while Severed.
- **Upcasting:** a stepper up to the caster's highest unlocked rank. Each step picks one of the four Basic Rules choices.
- **Area templates:** cone, circle and line, snapped to the grid. They select the tokens inside and roll their saves in one batch, with half damage on a success where the effect says so.
- **Items:** 9 worn slots, 2 rings and 3 or more attunement slots, taken straight from the character sheet. The item-effect lines from `ITEM-EFFECTS.md` apply through the shared engine. Magic trait riders (Flaming, Vampiric, Vortex and the rest) show as one-click follow-ups after a hit.
- **Rest (GM toolbar):** Partial rest restores Mana and Stamina equal to level, Physical Armor equal to Fortitude score and Magical Armor equal to Intelligence score, and removes Tired. Full rest restores everything to maximum, clears Exhausted, refreshes per-full-rest abilities and checks for level-up.

---

## 9. Monsters and encounters

- **Monster picker** from `monsters-data.js`: search by name, filter by type, TR and tier, and drop a token on the map with its sprite.
- **Encounter budget:** party budget = total character levels. Costs: minion ½ × TR, elite 1 × TR, solo 2 × TR. The meter shows under, on and over budget. Hard and Deadly bands are left for a later pass, once there is playtest data to set them.
- **Solo controls:** buttons for Unbreakable Will (once per round), Shake It Off (start of turn) and Second Phase (prompts at half Health), shown only on monsters that have those abilities.
- **Monster sheets** list attacks, actions and DCs as roll buttons. Area actions open the matching template.

---

## 10. Phased roadmap

Each phase ends with a usable tool and a test session.

### Phase 0: Groundwork (about 1 to 2 weeks)
- Move the rules functions into `sparks-rules.js`. Confirm the character sheet still gives the same numbers on every tab.
- Write `tools/build_monsters.py` and generate `monsters-data.js` and the token images.
- Rules test page with known answers.
- **Done when:** the sheet works unchanged, and all 249 monsters load with sprites.

### Phase 1: Local tabletop (about 3 to 4 weeks)
- Canvas map: image upload, grid alignment, pan and zoom, size-scaled tokens, hand-drawn walls.
- Initiative with solo second turns, AP counter, reaction toggle, move pool and measured movement.
- Dice roller with advantage and disadvantage, d100, and damage dice. Plain-language log.
- Bring in characters from the sheet (same site, so they are already in storage) and monsters from `monsters-data.js`.
- Save to IndexedDB, export and import, undo and redo.
- **Done when:** a full combat runs on one screen at the table.

### Phase 2: Combat automation (about 4 to 6 weeks)
- One click from attack to Critical or Decisive check to damage through the full damage order, with GM confirmation.
- Condition engine from the rules table, with ticks, cancels, escalations and Dying.
- Opportunity attack prompts and AP carryover.
- Area templates with batch saves. Upcasting.
- Rest buttons and the encounter budget meter. Universal VTT wall import.
- **Done when:** a level 5 party fights a solo with minions with no manual math, and every result can be undone.

### Phase 3: Online play (about 3 to 4 weeks)
- Rooms with a join code. The GM's browser holds the true state. Players send actions and control only their own tokens and sheets.
- **Hosting:** GitHub Pages cannot run a server. Use one small service for connections: a Cloudflare Worker with a Durable Object (one room per object), or PeerJS for direct WebRTC connections. Both have free tiers that cover a weekly game.
- GM-only tokens, notes and hidden rolls.
- **Done when:** four players on four devices finish a session, and a player who reconnects gets back the current state.

### Phase 4: Vision, fog and stealth (about 4 to 6 weeks)
- Line of sight from walls, light layers, and the six vision types, with fog of war drawn for each player's own tokens.
- Light sources from Universal VTT files.
- Stealth tracking: Sneak results, Sense Environment rolls, Unaware.
- **Done when:** a dungeon crawl in darkness shows each player only what their character sees.

---

## 11. Risks

| Risk | What to do |
|---|---|
| The two copies of the rules drift apart | The shared `sparks-rules.js` and the test page (Phase 0). |
| Rules edge cases stall the build | Suggest then confirm, plus manual overrides. Automate the common case and show text for the rest. |
| Maps fill browser storage | IndexedDB for images. Warn the GM above 50 MB per campaign. |
| Monster notes in mixed formats | The build script reports notes it cannot read, and they load as manual sheets. |
| Multiplayer cost and upkeep | A free-tier service with no accounts. Rooms expire after 24 idle hours. |

---

## 12. Changes from the first draft

1. **Added a shared rules engine** (2.1) so the VTT and the character sheet never disagree.
2. **Added a monster build step** (2.2). A web page cannot read the vault directly. It also brings in the 249 pixel-art sprites as tokens.
3. **Added an action log** (2.3) for undo, saving and multiplayer in one design.
4. **Reordered the phases:** online play moves before vision and fog. Per-player fog only matters once players have their own screens. Opportunity attacks and AP carryover move into combat automation, where they belong.
5. **Added Phase 0, time estimates and a "done when" test** for every phase.
6. **Added Universal VTT map import** for walls, doors and lights.
7. **Added a hosting plan** for multiplayer, since GitHub Pages cannot host a WebSocket server.
8. **Rules corrections:**
   - There are 37 conditions, not 30.
   - There are 5 special vision types plus normal vision, not 7.
   - There are 9 worn item slots, not 10.
   - Hastened and Slowed also change AC by 2.
   - The Critical and Decisive Strike steps are rewritten to match the rules: a roll in the decisive range is the automatic critical. Unaware makes only the first attack a Critical Strike. Hits on Unconscious creatures are automatic criticals.
   - Dying now lists all three ways to die and the stabilizing check.
   - Removed the Trivial, Fair, Hard and Deadly bands. The rules set only the budget itself.
9. **Conditions become a data table** read from the rules, not hand-written logic for each one, with the judgment-heavy ones left to the GM.
