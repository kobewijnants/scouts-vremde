(function () {
    var CONSENT_KEY = 'cookie-consent';
    var GA_ID = 'G-77KE3D3QLP';

    function loadAnalytics() {
        if (window.gaLoaded) return;
        window.gaLoaded = true;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', GA_ID, { anonymize_ip: true });
    }

    // Firefox for Android has a bug where the banner's buttons don't
    // respond to taps (works fine on Chrome mobile / desktop Firefox).
    // Skip showing it there until Firefox fixes it — see TODO.md.
    var isFirefoxAndroid = /Android/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent);
    if (isFirefoxAndroid) return;

    var consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
        loadAnalytics();
        return;
    }
    if (consent === 'declined') {
        return;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var banner = document.getElementById('cookie-consent');
        if (!banner) return;

        requestAnimationFrame(function () {
            banner.classList.add('consent-visible');
        });

        document.getElementById('cookie-accept').addEventListener('click', function () {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            banner.classList.remove('consent-visible');
            loadAnalytics();
        });

        document.getElementById('cookie-decline').addEventListener('click', function () {
            localStorage.setItem(CONSENT_KEY, 'declined');
            banner.classList.remove('consent-visible');
        });
    });
})();
