document.addEventListener('DOMContentLoaded', function() {
    const writingSpace = document.getElementById('writing-space');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const saveTextBtn = document.getElementById('save-text');

    // Focus the writing space to ensure keyboard pops up on mobile
    writingSpace.focus();

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

        // Generate timestamp in the format MMDDYYHHMMSS
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = String(now.getFullYear()).slice(2);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timestamp = `${month}${day}${year}${hours}${minutes}${seconds}`;

        const a = document.createElement('a');
        a.href = url;
        a.download = `musing_${timestamp}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
