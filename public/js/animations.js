// ==========================================================================
// Scouts Vremde — Animations
// Scroll reveal (IntersectionObserver) + page transitions
// ==========================================================================

(function() {
    // ── Init on page load (pageshow also fires on bfcache restore) ──────
    window.addEventListener('pageshow', function() {
        initScrollReveal();
    });

    // ── Scroll Reveal ─────────────────────────────────────────────────────
    function initScrollReveal() {
        // SurrealCMS's editor runs this script but doesn't scroll its panel
        // the way a real visitor would, so the observer below would never
        // fire and content would stay stuck at opacity:0. Skip the reveal
        // animation entirely in that context — .reveal elements are visible
        // by default until JS opts them into the hidden pending state.
        if (window.isCMS) {
            return;
        }

        if ('IntersectionObserver' in window) {
            // Set stagger delays on children of stagger groups
            document.querySelectorAll('[data-stagger-group]').forEach(function(group) {
                var children = group.querySelectorAll('.reveal, .reveal-left, .reveal-right');
                children.forEach(function(child, i) {
                    child.style.transitionDelay = (i * 80) + 'ms';
                });
            });

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('reveal-pending');
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
                if (!el.classList.contains('revealed')) {
                    el.classList.add('reveal-pending');
                }
                observer.observe(el);
            });
        } else {
            // Fallback: show everything immediately
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
                el.classList.add('revealed');
            });
        }
    }
})();
