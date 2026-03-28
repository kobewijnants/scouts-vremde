// Mobile menu toggle
var menuBtn = document.getElementById('mobile-menu-btn');
var mobileMenu = document.getElementById('mobile-menu');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        var isHidden = mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', !isHidden);
        menuBtn.setAttribute('aria-label', isHidden ? 'Menu openen' : 'Menu sluiten');
    });
}

// Mobile info submenu toggle
var infoBtn = document.getElementById('mobile-info-btn');
var mobileInfoMenu = document.getElementById('mobile-info-menu');
if (infoBtn) {
    infoBtn.addEventListener('click', function() {
        var isHidden = mobileInfoMenu.classList.toggle('hidden');
        infoBtn.setAttribute('aria-expanded', !isHidden);
    });
}

// Escape key closes mobile menu and desktop dropdown
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Menu openen');
            menuBtn.focus();
        }
        // Blur desktop info dropdown if focused within
        var desktopInfoBtn = document.getElementById('desktop-info-btn');
        if (desktopInfoBtn && desktopInfoBtn.closest('.group').contains(document.activeElement)) {
            desktopInfoBtn.focus();
            desktopInfoBtn.blur();
        }
    }
});

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
