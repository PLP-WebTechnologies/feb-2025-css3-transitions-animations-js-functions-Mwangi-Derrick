document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const animateBtn = document.getElementById('animateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const targetElement = document.getElementById('targetElement');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    
    // Animation types
    const animations = ['rotate', 'bounce', 'slide'];
    let currentAnimationIndex = 0;
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyTheme(preferences.theme);
        
        // Show feedback animation
        this.textContent = 'Saved!';
        this.style.backgroundColor = '#2E7D32';
        
        setTimeout(() => {
            this.textContent = 'Save Preferences';
            this.style.backgroundColor = '#4CAF50';
        }, 1500);
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        targetElement.className = 'animated-box';
        
        // Add the current animation class
        setTimeout(() => {
            targetElement.classList.add(animations[currentAnimationIndex]);
            
            // Cycle to next animation
            currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        }, 10);
    });
    
    // Reset animation
    resetBtn.addEventListener('click', function() {
        targetElement.className = 'animated-box';
    });
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            
            applyTheme(preferences.theme);
        }
    }
    
    // Apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        document.body.classList.add(theme);
    }
    
    // Bonus: Add hover effect with transition
    targetElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
    });
    
    targetElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});
