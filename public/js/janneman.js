document.getElementById('toggle-pdf-btn').addEventListener('click', togglePdfViewer);

function togglePdfViewer() {
    var viewer = document.getElementById('pdf-viewer');
    var iframe = document.getElementById('janneman-iframe');
    var btn = document.getElementById('toggle-pdf-btn');
    var link = document.getElementById('janneman-download');
    var pdfUrl = link.getAttribute('href');
    if (viewer.classList.contains('hidden')) {
        iframe.src = pdfUrl;
        viewer.classList.remove('hidden');
        btn.innerHTML = '<span class="material-symbols-outlined">visibility_off</span> Verberg';
        viewer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        viewer.classList.add('hidden');
        iframe.src = '';
        btn.innerHTML = '<span class="material-symbols-outlined">visibility</span> Bekijk hier';
    }
}
