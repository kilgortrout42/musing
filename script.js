document.addEventListener('DOMContentLoaded', function() {
    const writingSpace = document.getElementById('writing-space');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const saveTextBtn = document.getElementById('save-text');

    // Function to focus the writing space to ensure keyboard pops up on mobile
    const focusWritingSpace = () => {
        setTimeout(() => {
            writingSpace.focus();
        }, 500); // Adjust timeout as necessary
    };

    // Attempt to focus on page load
    focusWritingSpace();

    // Additional focus attempt on first user interaction
    document.body.addEventListener('touchstart', focusWritingSpace, { once: true });

    // Toggle between light and dark mode
    toggleModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            toggleModeBtn.textContent = 'Dark';
        } else {
            toggleModeBtn.textContent = 'Light';
        }
    });

    // Save the text content to a file
    saveTextBtn.addEventListener('click', function() {
        const textToSave = writingSpace.value;
        if (!textToSave) {
            alert('The text area is empty. Please write something before saving.');
            return;
        }
        
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

    // Detect when the keyboard is visible
    window.addEventListener('resize', function() {
        const screenHeight = window.innerHeight;
        const isKeyboardVisible = screenHeight < window.screen.height * 0.6;
        const writingSpace = document.getElementById('writing-space');
        
        if (isKeyboardVisible) {
            document.body.classList.add('keyboard-visible');
            writingSpace.style.height = 'calc(70% - 50px)'; // Adjust this value as needed for the buffer
        } else {
            document.body.classList.remove('keyboard-visible');
            writingSpace.style.height = 'calc(100% - 30px)'; // Restore to full height
        }
    });

    // Ensure text never drops below 60% of the writing space
    writingSpace.addEventListener('input', function() {
        const scrollHeight = writingSpace.scrollHeight;
        const clientHeight = writingSpace.clientHeight;
        const scrollTop = writingSpace.scrollTop;
        const maxScrollTop = scrollHeight - clientHeight;
        const desiredScrollTop = maxScrollTop * 0.4; // Adjust the 0.4 factor to control the buffer

        if (scrollTop > desiredScrollTop) {
            writingSpace.scrollTop = desiredScrollTop;
        }
    });
});
