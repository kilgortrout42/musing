document.addEventListener('DOMContentLoaded', function() {
    const writingSpace = document.querySelector('.writing-space');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const saveTextBtn = document.getElementById('save-text');

    toggleModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            toggleModeBtn.textContent = 'Dark';
        } else {
            toggleModeBtn.textContent = 'Light';
        }
    });

    saveTextBtn.addEventListener('click', function() {
        const textToSave = writingSpace.value;
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});

