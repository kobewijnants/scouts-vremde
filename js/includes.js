(function() {
    var path = window.location.pathname;

    // Determine active page from URL
    var activePage = 'index';
    var infoPages = ['scouting', 'subsidies', 'uniform', 'nieuwe-leden', 'rvb', 'verloren-voorwerpen', 'scouting-op-maat'];

    if (path.includes('/pages/')) {
        var filename = path.split('/').pop().replace('.html', '');
        if (['takken', 'janneman', 'contact', 'verhuur'].indexOf(filename) !== -1) {
            activePage = filename;
        } else if (filename.startsWith('tak-')) {
            activePage = 'takken';
        } else if (infoPages.indexOf(filename) !== -1) {
            activePage = 'info';
        }
    }

    function loadInclude(elementId, url) {
        var el = document.getElementById(elementId);
        if (!el) return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                el.innerHTML = xhr.responseText;
                if (elementId === 'nav-placeholder') {
                    highlightActive();
                }
            }
        };
        xhr.send();
    }

    function highlightActive() {
        var links = document.querySelectorAll('.nav-link');
        links.forEach(function(link) {
            if (link.dataset.page === activePage) {
                // Desktop links (inside the md:flex container)
                if (link.closest('.hidden.md\\:flex') || link.closest('[class*="md:flex"]')) {
                    link.className = 'nav-link text-[#3b6934] border-b-2 border-[#3b6934] pb-1';
                }
                // Mobile links
                if (link.closest('#mobile-menu')) {
                    link.className = 'nav-link text-[#3b6934] py-2';
                }
            }
        });
    }

    loadInclude('nav-placeholder', '/includes/nav.html');
    loadInclude('footer-placeholder', '/includes/footer.html');
})();
