# Sparks of Dynasty — Virtual Tabletop (VTT) Architecture & Build Plan

A complete technical and functional plan for building a **Sparks of Dynasty Virtual Tabletop (VTT)** grounded directly in `Sparks Basic Rules.docx` and designed to integrate with the existing web ecosystem (`Webpages/character-sheet-data.js`, `Webpages/character-sheet.js`, `Webpages/shops-data.js`, `Webpages/styles.css`, and the Obsidian/Markdown monster format).

---

## 1. Core Design Goals & Integration

- **System-Native Automation:** Unlike generic VTTs, every token, roll, and map interaction natively understands Sparks of Dynasty's **6 AP economy**, **dual/unified Armor pools**, **alignment-aware damage**, **d100 Critical/Decisive Strike pipeline**, **30 conditions**, and **TR encounter budgets**.
- **Single Source of Truth:** Reuse `window.SPARKS_DATA` (`character-sheet-data.js`) and `window.SPARKS_SHOPS` (`shops-data.js`) so weapons, armor, shields, traits, magic traits, conditions, races, classes, spells, and maneuvers stay in sync with the character sheet.
- **Tome & Grimoire Aesthetic:** Build the VTT UI using the existing `styles.css` palette (antique leather, parchment panels, gold-leaf accents, `Cinzel` & `EB Garamond` typography).
- **Zero-Friction Deployment:** Phase 1–3 can run client-side (static HTML/JS/Canvas/WebGL compatible with the existing Eleventy/GitHub Pages host), with Phase 4 adding lightweight WebSocket/WebRTC state sync for remote tables.

---

## 2. Battlemap, Grid, & Spatial Rules

### 2.1 Grid & Measurements
- **Scale:** `1 square = 1 meter`.
- **Time:** `1 round = 12 seconds` (`5 rounds = 1 minute`). Track elapsed rounds/minutes for durations (`1 round`, `1 minute`, `10 minutes`, `1 hour`, etc.) and `Dying` timers (`5 rounds`, or `5 + level` for Deadspawn).

### 2.2 Token Sizes, Footprints, & Reach
Every token enforces its Size from the rules:

| Size | Grid Footprint | Reach | Strength Bonus | Notes |
|---|---|---|---|---|
| Tiny | 1×1 m | 1 m | +0 | — |
| Small | 1×1 m | 1 m | +0 | Gnomes, Goblins |
| Medium | 1×1 m | 1 m | +0 | Default PC size |
| Large | 2×2 m | 2 m | +4 | Orcs (`+4 STR`) |
| Giant | 4×4 m | 3 m | +8 | — |
| Titanic | 8×8 m | 5 m | +16 | — |
| Kaiju | 16×16 m | 8 m | +32 | — |

- Weapon `Reach I / II / III` adds `+1 / +2 / +3 m` to melee reach from any edge square of the token's footprint.
- **Overpower Size Bonus:** Automatically add `+10` per size category larger than the target on Overpower checks.

### 2.3 Movement Engine & Speed Modes
- **AP-to-Movement:** Spending `1 AP` grants a movement budget equal to `Speed` meters.
- **Split Movement Pool:** Track `moveRemaining` for the current turn so a token can spend `1 AP`, move `3 m`, attack (`3 AP`), and spend the remaining `2 m` of that AP without paying another AP.
- **Speed Types:** Each token tracks separate values for `Walk`, `Fly` (with `Z` elevation in meters), `Swim`, `Climb`, and `Burrow`.
  - **Burrowing Rule:** Block movement through solid rock/metal terrain tiles unless the token has `burrowThroughRock: true` or `Strength score > 40`.
- **Terrain & Modifiers:**
  - Difficult terrain costs `2 m` per `1 m` moved (halved for **Elf** *Nature's Embrace*; ignored by **Half Elf** *Best of Both* in natural areas).
  - Dual wielding applies `-1 Speed`.
  - `Heavy` weapons/armor apply `-2 Speed` (or armor penalty where applicable).
  - `Slowed` halves movement; `Hastened` doubles movement; `Pinned` / `Crippled` blocks AP-based movement.

---

## 3. Vision, Lighting, & Stealth System

### 3.1 Lighting Zones & Vision Types
Map layers support polygons/auras for **Bright Light**, **Dim Light / Darkness**, and **True Darkness**, plus magical illusion/barrier walls. Each token evaluates visibility against target tokens using its vision flags:

- **Normal Vision:** Cannot see in Darkness (`-10` on sight-based `Sense Environment`); `Blind` in True Darkness.
- **Dark Sight (range m):** Treats Darkness as Bright Light within range; takes `-10` on sight-based `Sense Environment` in True Darkness.
- **Blind Sight (range m):** Perceives creatures/obstacles without sight (sound/scent); unaffected by `Blind` or darkness, cannot perceive color.
- **Witch Sight:** Sees through illusions and magical walls; allows centering spells on the far side of magical barriers (projectiles still collide).
- **Supernatural Vision:** Sees through True Darkness, identifies shapechangers as twisted/unnatural, and sees into the Border World.
- **True Vision:** Sees through illusions, True Darkness, and reveals a shapechanger's true form.

### 3.2 Stealth (`Sneak` vs `Sense Environment`)
- Clicking **Hide / Sneak** rolls `1d20 + FIN mod + Sneak ranks` once and stores `sneakResult`, `sneakDistanceMoved = 0`, and `sneakExpiresAtRound = currentRound + 5` (1 minute).
- Automatically expires if the token reveals itself, moves `20 m` total, or `5 rounds` pass, OR if an observer has unobstructed line of sight.
- Observers without line of sight roll `Sense Environment` against `sneakResult`; failure automatically applies **`Unaware`** of that token.

---

## 4. Turn Order, AP Economy, & Reactions

### 4.1 Initiative & Multi-Turn Solos
- **Initiative Roll:** `d20 + Wits mod` (plus Vigilant armor `+5` or feature bonuses).
- **Solo Monsters (`Max Turns: 2`):** Tracker automatically inserts/grants a second turn slot per round for `solo` tier tokens, refreshing AP appropriately.

### 4.2 Action Point (AP) State Machine
- **Start of Turn:** Reset `ap = 6` (capped at `maxAp`, modified by `Hastened` `+1`, `Slowed` `-1`, or `Paralyzed`/`Stunned`/`Unconscious`/`Dying` `= 0`), refresh `reaction = 1`, and decrement/tick start-of-turn conditions.
- **Unspent AP:** Lost at end of turn, **except** when using **AP Carryover**:
  - Player declares an action costing more AP than remains (e.g., `4 AP` action with `2 AP` left), spends remaining AP (`2 AP`), and stores `pendingAction: { name, remainingAp: 2 }`.
  - Next turn auto-deducts `remainingAp` before other actions can run.
  - Actions longer than `1 round` lock `6 AP` each turn until complete.
- **Standard Action Buttons:**
  - `Attack` (`3 AP`, or `2 AP` with `Tempo`)
  - `Off-Hand Attack` (`1 AP` after regular attack, Light weapon, half rolled damage)
  - `Move` (`1 AP` per `Speed` m)
  - `Help` (`2 AP`, grants `+5` to target's next roll; requires `1+` rank for skill help)
  - `Activate Equipment` (`3 AP`)
  - `Object Interaction` (`4 AP`, or `2 AP` quick)
  - `Stand Up` (`1 AP` if `Knocked Down` and not `Pinned`/`Crippled`)
  - `Reload` (`1 AP`, or `2 AP` for `Firearm`; requires free hand)

### 4.3 Opportunity Attack (OA) Detector
Before resolving an action or movement step, the VTT checks if an enemy in melee reach can see the actor and has `reaction >= 1`, prompting the GM/defender with an **OA Prompt** when any trigger occurs:
1. Moving out of a visible enemy's melee reach.
2. Making a ranged attack or reloading while in melee.
3. Casting a spell or using a maneuver in melee (unless touch or melee attack).
4. Using `Activate Equipment` (provokes for both user and target if used on/owned by another).
5. Performing a distracting check (lockpicking, stabilizing, picking up/moving heavy objects).
6. Having `maxAp` reduced to `0` (stays open to OAs).

---

## 5. Combat, Dice, & Damage Resolution Pipeline

### 5.1 Roll Modifiers & Flanking
- **Advantage / Disadvantage:** Track active ADV/DIS sources per roll (e.g., `Blind`, `Invisible`, `Knocked Down`, `Unaware`, `Fearful`, `Motivated`). If both are present, cancel to normal `1d20`; otherwise roll `2d20` keeping highest/lowest.
- **Flanking:** Geometric check on the grid—if two hostile tokens are in melee reach of a target on opposite/different sides, automatically apply `+2` to attack rolls.
- **Ranged in Melee:** Automatically apply `-5` to ranged weapon attacks if any hostile creature is in melee reach.

### 5.2 Critical & Decisive Strike Pipeline
1. Roll `1d20 + attackMod` vs target `AC` (ignoring cover/concealment/FIN mod for `Homing`, ignoring FOR/armor/shield AC for `Phasing`, or checking `50+` miss for `Blind` / `75+` miss for `Invisible`).
2. If eligible for Critical Strikes (physical melee/ranged, or spell attacks with *Deadly Magic* feat):
   - **On Hit (non-nat-20):** Auto-roll `1d100`. If `<= Critical Chance` (`Wits score` + bonuses like Half-Orc *Bloodlust* `+10`), upgrade to **Critical Strike** (`×2` weapon/spell dice; extra magic trait dice are **not** multiplied).
   - **On Natural 20 (or `Unaware`/`Unconscious` hit):** Automatic **Critical Strike**; auto-roll `1d100` (or check weapon `Deadly` range `20 - deadlyLevel` to `20`). On Decisive Strike, upgrade to **Decisive Strike** (`×3` dice, or `×4` with *Chosen Weapon Decisive Dice = 4*) and apply **`Crippled`**.

### 5.3 Exact Damage Application Order
Every damage packet runs through this strict 4-stage pipeline:
1. **Vulnerability:** If target is vulnerable to `damageType`, multiply raw damage by `2`.
2. **Resistance:** Subtract `max(0, targetResist[damageType] - ignoredRes)` (where `Enchanted N` ignores `5 × N`, `Vorpal`/`Piercing` ignores all Piercing/Slashing/Bludgeoning/Necrotic resistance & immunity).
3. **Armor Absorption:**
   - **Physical (`Piercing`, `Slashing`, `Bludgeoning`, `Necrotic`):** Reduces **Physical Armor** (or Monster **Armor Value**).
   - **Magical (`Psychic`, `Fire`, `Cold`, `Earth`, `Poison`, `Air`):** Reduces **Magical Armor** (or Monster **Armor Value**).
   - **Alignment (`Holy`, `Unholy`, `Magic`):** Reads target's Good/Neutral/Evil alignment (`Holy` → Evil, `Unholy` → Good, `Magic` → Neutral). On a matching alignment, **bypasses Physical/Magical Armor** and hits **True Armor** then **Health** directly; otherwise reduces **Magical Armor** (or Monster **Armor Value**).
   - **True Damage:** Bypasses Physical/Magical Armor (keeps its source type for resistance!) and hits **True Armor** then **Health**.
   - **Cursed Override:** If target has `Cursed`, treat armor as `0` for secondary effect triggers even while armor remains.
4. **Health & Dying:** Remaining damage reduces `Health`. If `Health <= 0`, automatically apply **`Dying`** (or mark 1 failed death save if already `Dying`).

---

## 6. Condition Engine (All 30 Conditions)

Store active conditions on each token with `{ name, sourceId, expiresAtRound, stacks }`:

- **Cancellation Pairs (auto-resolve on apply):**
  - `Burning` ↔ `Freezing` (cancel both)
  - `Hastened` ↔ `Slowed` (cancel both)
  - `Fearful` / `Hopeless` ↔ `Motivated` / `Inspired` (cancel both)
- **Escalation Chains:**
  - `Tired` + `Tired` → `Exhausted`
  - `Fearful` + `Fearful` → `Hopeless`
  - `Motivated` + `Motivated` → `Inspired`
- **Turn-Start / Turn-End Ticks:**
  - `Bleeding`: `-1 HP` at start of turn.
  - `Burning`: `-20` Fire resist, `+20` Cold resist, Fire vulnerability (unless immune/resistant), `2d6` Fire at start of turn.
  - `Corroding`: Lose `floor(Physical Armor / 2)` at start of turn.
  - `Draining`: Lose `floor(Magical Armor / 2)` at start of turn.
  - `Shocked`: `-10` Air resist, Air vulnerability (unless immune/resistant), roll `d100` at start of turn (`<= 50` wastes turn).
  - `Dying`: `0 AP`, `Unconscious`; at end of turn roll `d100 <= FOR mod + level`; track `deathFails` (die at `3`), `dyingRounds` (die after `5`, or `5 + level` for Deadspawn), or die immediately if `-HP > Fortitude score`.
- **Stat & Action Locks:**
  - `Exhausted`: applies `Tired` + `-2` cumulative physical stats per stack; prompts `DC 30+` Body save if penalty exceeds `-10`.
  - `Freezing`: `-20` Cold resist, `+20` Fire resist, Cold vulnerability, `maxAp = 2`.
  - `Paralyzed` / `Petrified` / `Stunned` / `Unconscious`: `maxAp = 0`; `Petrified` adds `+10` Piercing/Slashing/Bludgeoning resist + `Unaware`; `Nauseated` wastes AP and blocks reactions; `Silenced` blocks Words of Power spells; `Severed` disables magic items, Mana, and Stamina.
  - `Shoved`: Moves token `1 m` per point failed (`min 1 m`), deals `5` damage per blocked meter on obstacle collision, prompts Balance check (`< 2 m`) or applies `Knocked Down` (`>= 3 m`).

---

## 7. Spells, Maneuvers, Magic Items, & Resting

- **Spell & Maneuver Casting:**
  - Deduct Mana (`Minor` / `Adept` / `Major` / `Grand`) or Stamina; enforce `Severed` and `Silenced` (`Words of Power`) checks.
  - **Upcasting UI:** Stepper (`+1` to `+3` tiers up to character's unlocked tier) offering the 4 choices per step: *Double dice*, *Double range*, *Add casting mod*, or *Duration +1 step*.
  - **AoE Templates:** Cone (`3 m`, `5 m`, `10 m`), Circle/Radius, and Line templates snapped to the 1 m grid, auto-targeting tokens inside and rolling group saves (halving damage on success).
- **Magic Item & Attunement Enforcement:**
  - Track 10 worn slots + `2` Rings + `3+` Miscellaneous/Attunement slots; only apply item effects (`ITEM-EFFECTS.md` parser from `character-sheet.js`) while attuned.
  - Trigger on-hit/on-crit weapon traits (`Flaming`, `Freezing`, `Vampiric`, `Life Draining`, `Shattering`, `Vortex` pull, `Repelling` push, `Forceful`, `Timewarp`, etc.) and armor reactions (`Thorned`, `Reflective`, `Guardian`, `Aegis`, `Displacement`).
- **Resting Controls (GM Toolbar):**
  - **Partial Rest (8 hours):** Restore `Mana += level`, `Stamina += level`, `Physical Armor += FOR score`, `Magical Armor += INT score`, remove `Tired`.
  - **Full Rest (24 hours):** Restore `Health`, `Mana`, `Stamina`, `Physical/Magical Armor` to max, clear `Exhausted`, refresh `per full rest` abilities, and trigger level-up check against XP table.

---

## 8. Monster Importer & Encounter Builder

- **Direct Importer:** Parse monster markdown notes from `MONSTERS-200.md` and `C:\New Vault\Monsters\*.md` (YAML frontmatter + stat table + Actions/Abilities/Spellcasting/Maneuvers).
- **Encounter Budget Calculator:**
  - Party Budget = sum of PC levels.
  - Monster Cost = `0.5 × TR` (Minion), `1 × TR` (Elite), `2 × TR` (Solo).
  - Live indicator showing **Trivial / Fair / Hard / Deadly** against party total levels.
- **Monster Sheet Automation:** Unified `Armor Value` absorbs both Physical and Magical damage; `Unbreakable Will` (1/round turn failed save into success), `Shake It Off` (start-of-turn condition clear), and `Second Phase` (half-HP trigger) buttons on Solo tokens.

---

## 9. Phased Implementation Roadmap

### Phase 1: Core Tabletop & Token Board (MVP)
- `1 m` square grid canvas with pan/zoom, map image upload, walls/obstacles, and Size-scaled tokens (`Tiny` to `Kaiju`).
- Initiative tracker (`d20 + Wits mod`), 6 AP counter, Reaction toggle, and Solo 2-turn support.
- Dice roller (`1d20`, `2d20` ADV/DIS, `1d100`, damage dice) + Combat Log.
- Import PCs from `character-sheet.js` (`localStorage` / JSON) and Monsters from Markdown.

### Phase 2: Rules & Combat Automation
- Full 4-stage Damage Pipeline (Vulnerability → Resistance → Physical/Magical/Alignment/True Armor → Health) with one-click Attack → Crit/Decisive d100 → Damage resolution.
- Complete 30-condition state machine (auto-cancellations, escalations, start/end-of-turn ticks, `Dying` tracker).
- AoE templates (Cone, Circle, Line) with batch saving throws and Upcasting UI.
- Resting buttons (8h Partial / 24h Full) and Encounter Budget builder.

### Phase 3: Vision, Lighting, & Tactical Checks
- Dynamic line-of-sight & lighting layers (`Bright`, `Darkness`, `True Darkness`) with all 7 Vision Types (`Dark Sight`, `Blind Sight`, `Witch Sight`, `Supernatural Vision`, `True Vision`).
- Automated `Sneak` vs `Sense Environment` stealth tracking (`20 m` / `1 min` / `Unaware`).
- Opportunity Attack prompt system & AP Carryover state machine.

### Phase 4: Real-Time Multiplayer & Campaign Persistence
- Lightweight WebSocket or WebRTC peer-to-peer room server (GM hosts authoritative state; players join via room code and control their own tokens/sheets).
- Fog-of-war sync per player vision type, GM-only hidden notes/monsters, and persistent campaign save/export JSON.
