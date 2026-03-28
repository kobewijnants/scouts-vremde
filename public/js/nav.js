// Mobile menu toggle
var menuBtn = document.getElementById('mobile-menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
}

// Mobile info submenu toggle
var infoBtn = document.getElementById('mobile-info-btn');
if (infoBtn) {
    infoBtn.addEventListener('click', function() {
        document.getElementById('mobile-info-menu').classList.toggle('hidden');
    });
}

// Fill in current year
document.querySelectorAll('.current-year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
});

// Active page highlighting
(function() {
    var path = window.location.pathname;
    var activePage = 'index';
    var infoPages = ['scouting','subsidies','uniform','nieuwe-leden','rvb','verloren-voorwerpen','scouting-op-maat'];
    var segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
        var page = segments[segments.length - 1].replace('.html', '');
        if (['takken','janneman','contact','verhuur'].indexOf(page) !== -1) activePage = page;
        else if (page.startsWith('tak-')) activePage = 'takken';
        else if (infoPages.indexOf(page) !== -1) activePage = 'info';
    }
    document.querySelectorAll('.nav-link').forEach(function(link) {
        if (link.dataset.page === activePage) {
            if (link.closest('.hidden.md\\:flex') || link.closest('[class*="md:flex"]'))
                link.className = 'nav-link text-[#3b6934] border-b-2 border-[#3b6934] pb-1';
            if (link.closest('#mobile-menu'))
                link.className = 'nav-link text-[#3b6934] py-2';
        }
    });
})();
