// Main JavaScript for Sohag's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initMobileMenu();
    initScrollSpy();
    initThemeToggle();
    initNameTypingEffect();
    initProjectsCarousel();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current section
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .contact-form, .about-text, .skills-list');

    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for each bar to create a staggered effect
                setTimeout(() => {
                    entry.target.style.width = entry.target.style.width || '0%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.submit-button');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                // Send data to backend
                const response = await fetch('http://localhost:3001/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        message: message.trim(),
                        sharepointLink: 'https://northernunivbd-my.sharepoint.com/:x:/g/personal/sohag_41230301656_nub_ac_bd/IQA_tVlLsrCPRZuVSunfOTCmAZWpRiChb4Cbsu3sFuJXUfY?e=CmCTCu'
                    })
                });

                const result = await response.json();

                if (result.success) {
                    showNotification(result.message + ' Your message has been recorded and can be accessed at your SharePoint link.', 'success');
                    contactForm.reset();
                } else {
                    showNotification(result.message || 'Error sending message', 'error');
                }

            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Unable to send message. Please check your internet connection and try again.', 'error');
            } finally {
                // Reset button state
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Animate hamburger menu
            const bars = this.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
}

// Scroll spy for navigation
function initScrollSpy() {
    // This is already handled in initNavigation function
    // Additional scroll spy logic can be added here if needed
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease;
    `;

    // Set colors based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        notification.style.color = 'white';
    } else {
        notification.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        notification.style.color = 'white';
    }

    // Add to page
    document.body.appendChild(notification);

    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS (via JavaScript for dynamic notifications)
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .notification-close:hover {
        opacity: 1;
    }

    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--navbar-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 1rem 0;
            border-bottom: 1px solid var(--border-color);
            animation: slideDown 0.3s ease;
        }

        .nav-menu .nav-link {
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--border-color);
        }

        .nav-menu .nav-link:last-child {
            border-bottom: none;
        }
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

document.head.appendChild(notificationStyles);

// Typing effect for hero name (CSS animation only)
function initNameTypingEffect() {
    // The typing animation is now handled purely by CSS
    // This function ensures the element is ready for animation
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        // Animation will start automatically via CSS
    }
}

// Typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    const typingSpeed = 100;

    if (heroTitle) {
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typing effect (commented out by default, uncomment to enable)
// initTypingEffect();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events for better performance
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functions can be called here
    updateScrollProgress();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Create or update progress bar
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(45deg, #3498db, #2980b9);
            z-index: 1001;
            transform-origin: left;
        `;
        document.body.appendChild(progressBar);
    }

    progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
}

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    const spinner = document.createElement('style');
    spinner.textContent = `
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .preloader-content p {
            color: white;
            margin-top: 1rem;
            font-family: 'Poppins', sans-serif;
            font-size: 1.1rem;
        }
    `;

    document.head.appendChild(spinner);
    document.body.appendChild(preloader);

    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.add('loaded');
        }, 500);
    });
}

// Initialize preloader (commented out by default, uncomment to enable)
// initPreloader();

// Projects carousel functionality
function initProjectsCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        // Previous button
        prevBtn.addEventListener('click', () => {
            const cardWidth = document.querySelector('.project-card').offsetWidth + 32; // 32px gap
            carousel.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        // Next button
        nextBtn.addEventListener('click', () => {
            const cardWidth = document.querySelector('.project-card').offsetWidth + 32; // 32px gap
            carousel.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        // Update button visibility based on scroll position
        function updateButtonVisibility() {
            const isAtStart = carousel.scrollLeft === 0;
            const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1;

            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        // Initial check
        updateButtonVisibility();

        // Update on scroll
        carousel.addEventListener('scroll', updateButtonVisibility);

        // Update on window resize
        window.addEventListener('resize', updateButtonVisibility);
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }

        // Update mobile menu background for dark mode
        updateMobileMenuBackground(theme);
    }

    function updateMobileMenuBackground(theme) {
        const mobileMenuStyles = document.querySelector('style');
        if (mobileMenuStyles && mobileMenuStyles.textContent.includes('.nav-menu.active')) {
            const newBackground = theme === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            mobileMenuStyles.textContent = mobileMenuStyles.textContent.replace(
                /background: rgba\((\d+), \1, \1, 0\.95\);/g,
                `background: ${newBackground};`
            );
        }
    }
}

// Console welcome message
console.log(`
%cWelcome to Sohag's Portfolio! 🚀

%cThis website was built with:
• HTML5
• CSS3 (with modern features like CSS Grid, Flexbox, and animations)
• Vanilla JavaScript (ES6+)
• Responsive design
• Accessibility considerations

%cFeel free to explore and get in touch!

`, 'font-size: 1.5rem; font-weight: bold; color: #3498db;', 'color: #666; line-height: 1.5;', 'color: #27ae60; font-style: italic;');

// Export functions for potential external use (if needed)
window.PortfolioUtils = {
    showNotification,
    initScrollAnimations,
    initSkillBars
};
