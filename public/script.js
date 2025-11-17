// Enhanced Website Functionality with Smooth Animations
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const fontToggle = document.getElementById('font-toggle');
    
    // Theme Toggle with smooth transitions
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Enhanced theme toggle with smooth transitions
            function toggleTheme() {
                const body = document.body;
                const isDark = body.classList.contains('dark-mode');
                
                // Add transition class for smooth theme change
                body.classList.add('theme-transitioning');
                
                if (isDark) {
                    body.classList.remove('dark-mode');
                    body.classList.add('light-mode');
                    localStorage.setItem('theme', 'light');
                } else {
                    body.classList.remove('light-mode');
                    body.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                }
                
                // Remove transition class after animation
                setTimeout(() => {
                    body.classList.remove('theme-transitioning');
                }, 500);
            }
            
            toggleTheme();
            
            // Update button text with animation
            setTimeout(() => {
                if (document.body.classList.contains('light-mode')) {
                    themeToggle.textContent = 'Toggle Light/Dark Mode';
                } else {
                    themeToggle.textContent = 'Toggle Dark/Light Mode';
                }
            }, 200);
            setTimeout(() => {
                document.body.classList.remove('font-changed');
            }, 500);
        });
    }
    
    // Font Toggle with smooth transitions
    if (fontToggle) {
        fontToggle.addEventListener('click', function() {
            const currentFont = getComputedStyle(document.body).fontFamily;
            
            // Add smooth transition class
            document.body.classList.add('font-changed');
            
            if (currentFont.includes('Arial')) {
                document.body.style.fontFamily = 'Courier New, monospace';
                fontToggle.textContent = 'Switch to Arial';
            } else {
                document.body.style.fontFamily = 'Arial, sans-serif';
                fontToggle.textContent = 'Switch to Courier';
            }
            
            // Remove transition class after animation
            setTimeout(() => {
                document.body.classList.remove('font-changed');
            }, 300);
        });
    }
    
    // Intersection Observer for Section Animations and Active Navigation
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with slight delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 100);
                
                // Update active navigation
                updateActiveNav(entry.target.id);
            }
        });
    }, observerOptions);
    
    // Function to update active navigation
    function updateActiveNav(activeSectionId) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Add initial hidden state
        section.classList.add('animate-hidden');
        
        // Add different animation classes for variety
        if (index % 4 === 0) {
            section.classList.add('animate-slide-left');
        } else if (index % 4 === 1) {
            section.classList.add('animate-slide-right');
        } else if (index % 4 === 2) {
            section.classList.add('animate-scale');
        } else {
            // Default slide up animation
        }
        
        observer.observe(section);
    });
    
    // Enhanced Button Interactions
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
    
    // Enhanced Navigation Interactions
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll Progress Indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    // Update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Throttled scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateScrollProgress, 10);
    });
    
    // Navigation scroll effect
    let lastScrollY = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add loading animation for page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
        
        // Make sure first section is visible immediately
        const firstSection = sections[0];
        if (firstSection) {
            firstSection.classList.add('animate-in');
            firstSection.classList.remove('animate-hidden');
        }
        
        // Initialize scroll progress
        updateScrollProgress();
    });
    
    // Performance optimization: Remove will-change after animations complete
    sections.forEach(section => {
        section.addEventListener('animationend', function() {
            this.classList.add('animation-complete');
        });
    });
});
