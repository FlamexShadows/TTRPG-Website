/* Sparks of Dynasty: the closed tome on the home page.
   Maps the scroll position inside #tome to four values the CSS reads:
   --clasp  0 to 1  the clasp unbuckles and the strap slides off
   --open   0 to 1  the cover swings open on its spine
   --lift   0 to 1  peaks mid-swing, for the shadow on the page
   --reveal 0 to 1  the contents page inks in
   Tapping the cover, or tabbing to a link on the page, scrolls to the open book. */
(function () {
    var tome = document.getElementById('tome');
    if (!tome) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce && reduce.matches) { tome.classList.add('is-static'); return; }
    tome.classList.add('is-live');

    var cover = tome.querySelector('.tome-cover');
    var ticking = false;
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function update() {
        ticking = false;
        var total = tome.offsetHeight - window.innerHeight;
        var p = total > 0 ? clamp(-tome.getBoundingClientRect().top / total) : 1;
        var clasp = clamp(p / 0.14);
        var open = ease(clamp((p - 0.1) / 0.55));
        var lift = Math.sin(Math.PI * open);
        var reveal = clamp((p - 0.38) / 0.3);
        var s = tome.style;
        s.setProperty('--clasp', clasp.toFixed(4));
        s.setProperty('--open', open.toFixed(4));
        s.setProperty('--lift', lift.toFixed(4));
        s.setProperty('--reveal', reveal.toFixed(4));
        tome.classList.toggle('is-open', open > 0.97);
        if (cover) cover.setAttribute('aria-hidden', open > 0.97 ? 'true' : 'false');
    }
    function request() {
        if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }
    function openBook() {
        var target = tome.offsetTop + (tome.offsetHeight - window.innerHeight) * 0.8;
        window.scrollTo({ top: target, behavior: 'smooth' });
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    if (cover) {
        cover.addEventListener('click', openBook);
        cover.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(); }
        });
    }
    tome.addEventListener('focusin', function (e) {
        if (e.target.closest && e.target.closest('.tome-page') && !tome.classList.contains('is-open')) openBook();
    });
    update();
})();
