/*
 * NOWANEST - Modern Theme Toggle & Enhancements
 * Dark Mode, Scroll to Top, Loading Animation, Mobile Menu
 */

(function() {
    'use strict';

    // ===================================
    // LOADING SPINNER FALLBACK
    // ===================================
    
    // Ensure spinner is hidden after maximum 1 second
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            const spinner = document.getElementById('loadingSpinner');
            if (spinner) {
                spinner.classList.add('hidden');
                // Remove from DOM after transition
                setTimeout(function() {
                    spinner.remove();
                }, 500);
            }
        }, 1000);
    });

    // Also hide on window load
    window.addEventListener('load', function() {
        const loader = document.getElementById('loadingSpinner');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        }
    });

    // ===================================
    // MOBILE MENU TOGGLE (TAILWIND NAV)
    // ===================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between hamburger and X
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
        });
    }

    // ===================================
    // DARK MODE FUNCTIONALITY
    // ===================================
    
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add animation class
            this.classList.add('theme-switching');
            setTimeout(() => {
                this.classList.remove('theme-switching');
            }, 400);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill';
        }
    }

    // ===================================
    // SCROLL TO TOP FUNCTIONALITY
    // ===================================
    
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Scroll to top on click
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // ENHANCED ANIMATIONS ON SCROLL
    // ===================================
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all custom blocks
    document.querySelectorAll('.custom-block').forEach(block => {
        observer.observe(block);
    });

    // ===================================
    // ENHANCED NAVBAR ON SCROLL
    // ===================================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===================================
    // ANIMATED COUNTER FOR BADGES
    // ===================================
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Animate badge numbers when they come into view
    const badgeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const badge = entry.target;
                const endValue = parseInt(badge.textContent);
                badge.classList.add('counted');
                animateValue(badge, 0, endValue, 1000);
                badgeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.badge').forEach(badge => {
        badgeObserver.observe(badge);
    });

    // ===================================
    // RIPPLE EFFECT ON BUTTONS
    // ===================================
    
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        const rect = button.getBoundingClientRect();
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple-effect');
        
        const existingRipple = button.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    document.querySelectorAll('.custom-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ===================================
    // SMOOTH REVEAL FOR TIMELINE
    // ===================================
    
    const timelineItems = document.querySelectorAll('.vertical-scrollable-timeline li');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // ===================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ===================================
    
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        }
    });

    // ===================================
    // IMPROVED FORM VALIDATION
    // ===================================
    
    const forms = document.querySelectorAll('.custom-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
    });

    // ===================================
    // CONSOLE BRANDING
    // ===================================
    
    console.log(
        '%c🏗️ NOWANEST Bouwbedrijf ',
        'background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px; font-weight: bold;'
    );
    console.log(
        '%cModern Theme Active | https://nowanest.nl',
        'color: #1e40af; font-size: 12px;'
    );

})();
