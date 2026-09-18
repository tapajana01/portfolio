/* ========================================
   js/main.js
   Initializes scripts and scroll animations
   ======================================== */

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize the mobile menu (from mobile-menu.js)
    if (typeof initMobileMenu === 'function') {
        initMobileMenu();
    }
    
    // 2. Initialize IntersectionObserver for scroll animations
    initScrollAnimations();
});

function initScrollAnimations() {
    // Select all sections that have the initial setup class
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS animation
                entry.target.classList.add('is-visible');
                
                // Stop observing the element once it has faded in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each element
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

/* 
   Note: To make the scroll animation work, ensure you add this to your css/components.css:
   
   .fade-in-section {
       opacity: 0;
       transform: translateY(20px);
       transition: opacity 0.6s ease-out, transform 0.6s ease-out;
       will-change: opacity, visibility;
   }
   
   .fade-in-section.is-visible {
       opacity: 1;
       transform: none;
   }
*/