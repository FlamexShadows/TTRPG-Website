// Settings shared by every spell file in this folder.

// Front matter key -> label on the page, in the order the page shows them.
const STATS = [
  ["range", "Range"],
  ["ap", "AP Cost"],
  ["casting_time", "Casting Time"],
  ["action_cost", "Action Cost"],
  ["rank", "Spell Rank"],
  ["school", "Class"],
  ["subtype", "Subtype"],
  ["requirements", "Requirements"],
  ["duration", "Duration"],
  ["concentration", "Concentration"],
];

export default {
  layout: "layouts/spell.njk",
  eleventyComputed: {
    // fireball.md becomes fireball.html at the top of the site, the same address as before.
    permalink: (data) => `${data.page.fileSlug}.html`,
    title: (data) => data.name,
    // Only the stats a spell lists. A spell with no Concentration line shows none.
    stats: (data) =>
      STATS.filter(([key]) => typeof data[key] === "string").map(([key, label]) => ({ label, value: data[key] })),
  },
};
