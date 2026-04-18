// ============================================================================
// Dark Mode Toggle
// ============================================================================

const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
});

function updateThemeIcons(isDark) {
    if (isDark) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// ============================================================================
// Mobile Menu Toggle
// ============================================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================================================
// Typing Effect
// ============================================================================

const typingEffect = document.getElementById('typingEffect');
const phrases = [
    'Aspiring Full Stack Developer',
    'JavaScript Enthusiast',
    'AI & Web Enthusiast',
    'Problem Solver',
    'Creative Coder'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseDuration = 2000;

function type() {
    const phrase = phrases[currentPhrase];

    if (!isDeleting) {
        typingEffect.textContent = phrase.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === phrase.length) {
            isDeleting = true;
            typingSpeed = pauseDuration;
        } else {
            typingSpeed = 100;
        }
    } else {
        typingEffect.textContent = phrase.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 500;
        } else {
            typingSpeed = deletingSpeed;
        }
    }

    setTimeout(type, typingSpeed);
}

type();

// ============================================================================
// Smooth Scrolling
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================================
// Intersection Observer for Animations
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and service cards
document.querySelectorAll('.project-card, .service-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================================================
// Contact Form Handler
// ============================================================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================================================
// Resume Download Handler
// ============================================================================

const resumeBtn = document.getElementById('resumeBtn');

resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = 'Nafeescv.jpg';
    link.download = 'Nafeescv.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Resume downloading...', 'success');
});

// ============================================================================
// Navbar Scroll Effect
// ============================================================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.boxShadow = '0 0 0 transparent';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
});

// ============================================================================
// Progress Bar Animation
// ============================================================================

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fillProgress 1s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => observer.observe(fill));
}

animateProgressBars();

// ============================================================================
// Skill Tags Animation
// ============================================================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.animation = `slideInUp 0.5s ease ${index * 0.05}s forwards`;
});

// ============================================================================
// Project Card Hover Effect
// ============================================================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================================================
// Active Navigation Link
// ============================================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================================================
// Page Load Animation
// ============================================================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================================================
// Keyboard Navigation
// ============================================================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Tab through navigation links
    if (e.key === 'Tab') {
        navLinks = document.querySelectorAll('.nav-link, .social-link, .btn');
    }
});

// ============================================================================
// Performance: Lazy Loading for Images
// ============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================================================
// Back to Top Button (Optional Enhancement)
// ============================================================================

const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--accent) 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
    `;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    document.body.appendChild(button);
};

createBackToTopButton();

// ============================================================================
// Initialize AOS-like Scroll Animations
// ============================================================================

function observeElements() {
    const elementsToObserve = document.querySelectorAll('.project-card, .service-card, .skill-category, .about-text, .contact-form');

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ============================================================================
// Console Message
// ============================================================================

console.log('%c Welcome to Nafees Ahmad\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c Made with ❤️ using HTML, CSS, and JavaScript', 'color: #764ba2; font-size: 14px; font-style: italic;');
console.log('%c Feel free to reach out at contact@example.com', 'color: #667eea; font-size: 12px;');

// ============================================================================
// Add CSS Variables for Consistent Styling
// ============================================================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--accent);
        border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #764ba2;
    }

    /* Selection Styling */
    ::selection {
        background: var(--accent);
        color: white;
    }

    ::-moz-selection {
        background: var(--accent);
        color: white;
    }
`;

document.head.appendChild(styleSheet);

// ============================================================================
// Focus Visible for Accessibility
// ============================================================================

document.addEventListener('keydown', () => {
    document.body.classList.add('keyboard-focus');
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-focus');
});

// ============================================================================
// Service Worker Registration (Optional - for PWA)
// ============================================================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('Service Worker registered'))
    //     .catch(error => console.log('Service Worker registration failed:', error));
}

console.log('Portfolio website loaded successfully!');
