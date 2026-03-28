// ==========================================================================
// Scouts Vremde — Animations
// Scroll reveal (IntersectionObserver) + page transitions
// ==========================================================================

(function() {
    // ── Page Fade-In ──────────────────────────────────────────────────────
    // Use pageshow instead of DOMContentLoaded so it also fires on
    // back/forward navigation (bfcache restore)
    window.addEventListener('pageshow', function() {
        document.body.classList.add('page-loaded');
        initScrollReveal();
    });

    // ── Scroll Reveal ─────────────────────────────────────────────────────
    function initScrollReveal() {
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
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });

            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
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
