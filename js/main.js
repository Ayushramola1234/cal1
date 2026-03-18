/**
 * Main Global JavaScript for Calcify
 * Handles dark mode toggling and mobile navbar functionality.
 */

// Initialize immediately to prevent theme flashing
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Select all theme toggle buttons (in case there are multiple, e.g., mobile + desktop)
    const themeToggles = document.querySelectorAll('.theme-toggle');

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'dark';

            if (currentTheme === 'dark') {
                newTheme = 'light';
            }

            // Set the new attribute
            document.documentElement.setAttribute('data-theme', newTheme);

            // Save to localStorage
            localStorage.setItem('theme', newTheme);

            // Dispatch event for charts to re-render
            document.dispatchEvent(new Event('themeChanged'));
        });
    });

    // Mobile Navbar Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    // Close mobile menu if window is resized above 768px
    // Checking if debounce exists from utils.js
    const debounceFn = typeof debounce === 'function' ? debounce : (fn, d) => {
        let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), d); };
    };

    window.addEventListener('resize', debounceFn(() => {
        if (window.innerWidth > 768 && document.body.classList.contains('nav-open')) {
            document.body.classList.remove('nav-open');
        }
    }, 200));
});
