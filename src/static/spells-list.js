// Spell list: light up the school you are reading in the sidebar.
// Clicking a school scrolls smoothly on its own (scroll-behavior: smooth in styles.css).
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".school-nav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  var ticking = false;
  function mark() {
    ticking = false;
    var y = window.scrollY + 150;
    var current = null;
    // Schools sit two to a row, so take the first school of the lowest row above the line.
    sections.forEach(function (s) { if (s.offsetTop <= y && (!current || s.offsetTop > current.offsetTop)) current = s; });
    links.forEach(function (a) {
      a.classList.toggle("active", !!current && a.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(mark); }
  }, { passive: true });
  mark();
})();
