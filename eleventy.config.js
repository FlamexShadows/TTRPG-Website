// Eleventy builds the Sparks of Dynasty website into _site/.
//
//   src/spells/*.md        one file per spell: stats in the front matter, description below
//   src/_includes/layouts  the page templates every built page shares
//   src/spells-complete.njk  the spell list, generated from the spell files
//   Webpages/              every page not converted yet, copied to the site exactly as it is
//
// Run "npm start" for a live preview at http://localhost:8080, or "npm run build" to build once.
import fs from "node:fs";
import path from "node:path";

const PAGES = "Webpages";
const SPELLS = "src/spells";
const RANKS = ["Minor", "Adept", "Major", "Grand", "Divine"];

export default function (eleventyConfig) {
  // 1. Copy Webpages/ into the site, skipping the pages Eleventy now builds from src/.
  //    A converted spell keeps its old file name, so every link to it still works.
  const built = new Set(
    fs.readdirSync(SPELLS).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ".html"))
  );
  built.add("spells-complete.html");
  for (const entry of fs.readdirSync(PAGES, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue; // .vscode, _archive
    if (entry.isFile() && built.has(entry.name)) continue;
    eleventyConfig.addPassthroughCopy({ [`${PAGES}/${entry.name}`]: entry.name });
  }
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addWatchTarget(`${PAGES}/`);

  // 2. The shared header. Built pages include Webpages/a-header.html directly instead of
  //    loading it with jQuery after the page opens, so it appears instantly.
  eleventyConfig.addShortcode("siteHeader", () =>
    fs.readFileSync(path.join(PAGES, "a-header.html"), "utf8")
  );

  // 3. All spells, A to Z. Spells marked "unlisted: true" still get a page.
  eleventyConfig.addCollection("spells", (api) =>
    api
      .getFilteredByGlob(`${SPELLS}/*.md`)
      .sort((a, b) => a.data.name.localeCompare(b.data.name))
  );

  // 4. Group spells by school, then by rank, for the spell list.
  eleventyConfig.addFilter("bySchool", (spells) => {
    const schools = new Map();
    for (const spell of spells) {
      if (spell.data.unlisted) continue;
      const { school, rank } = spell.data;
      if (!schools.has(school)) schools.set(school, new Map());
      const ranks = schools.get(school);
      if (!ranks.has(rank)) ranks.set(rank, []);
      ranks.get(rank).push(spell);
    }
    const rankOrder = (r) => (RANKS.includes(r) ? RANKS.indexOf(r) : RANKS.length);
    return [...schools.keys()].sort().map((school) => ({
      school,
      ranks: [...schools.get(school).keys()]
        .sort((a, b) => rankOrder(a) - rankOrder(b))
        .map((rank) => ({ rank, spells: schools.get(school).get(rank) })),
    }));
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    markdownTemplateEngine: false, // spell text is plain Markdown, never a template
    htmlTemplateEngine: "njk",
  };
}
