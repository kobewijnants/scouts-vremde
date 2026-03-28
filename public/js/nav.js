// Mobile menu toggle
var menuBtn = document.getElementById('mobile-menu-btn');
var mobileMenu = document.getElementById('mobile-menu');
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        var isOpen = mobileMenu.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        menuBtn.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
    });
}

// Mobile info submenu toggle
var infoBtn = document.getElementById('mobile-info-btn');
var mobileInfoMenu = document.getElementById('mobile-info-menu');
if (infoBtn) {
    infoBtn.addEventListener('click', function() {
        var isOpen = mobileInfoMenu.classList.toggle('submenu-open');
        infoBtn.setAttribute('aria-expanded', isOpen);
    });
}

// Escape key closes mobile menu and desktop dropdown
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (mobileMenu && mobileMenu.classList.contains('menu-open')) {
            mobileMenu.classList.remove('menu-open');
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
        if (['takken','janneman','galerij','contact','verhuur'].indexOf(page) !== -1) activePage = page;
        else if (page.startsWith('tak-')) activePage = 'takken';
        else if (infoPages.indexOf(page) !== -1) activePage = 'info';
    }
    document.querySelectorAll('.nav-link').forEach(function(link) {
        if (link.dataset.page === activePage) {
            link.classList.add('nav-link-active');
            if (link.closest('#mobile-menu'))
                link.className = 'nav-link nav-link-active py-2';
        }
    });
})();
