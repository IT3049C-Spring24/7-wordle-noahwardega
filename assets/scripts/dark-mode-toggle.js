const modeToggleSpan = document.getElementById('mode-toggle');

modeToggleSpan.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
});