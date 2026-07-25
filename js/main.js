// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const typingText = document.getElementById('typing-text');
const skillFills = document.querySelectorAll('.skill-fill');
const statNumbers = document.querySelectorAll('.stat-number');
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards = document.querySelectorAll('.pub-card');

// ===== Typing Effect =====
const titles = [
    'Computational Systems Biology',
    'Machine Learning & AI',
    'Graph Neural Networks',
    'Foundation Models & LLMs',
    'Precision Medicine',
    'Drug Discovery',
    'Computational Neuroscience'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== Mobile Navigation =====
function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

// ===== Active Navigation Link =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Back to Top Button =====
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// ===== Skill Bars Animation =====
function animateSkillBars() {
    skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        const rect = fill.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !fill.classList.contains('animated')) {
            fill.style.width = width + '%';
            fill.classList.add('animated');
        }
    });
}

// ===== Stats Counter Animation =====
function animateCounters() {
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !stat.classList.contains('counted')) {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
            stat.classList.add('counted');
        }
    });
}

// ===== Publication Filter =====
function filterPublications(category) {
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    pubCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== Scroll Animations =====
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
}

// ===== Smooth Scroll =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Add Fade-in Class to Elements =====
function initFadeInElements() {
    const animElements = document.querySelectorAll(
        '.about-card, .stat-item, .timeline-item, .position-card, ' +
        '.skill-category, .repo-card, .pub-card, .contact-card, .contact-social-card'
    );
    
    animElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    typeEffect();
    
    // Initialize fade-in elements
    initFadeInElements();
    
    // Initial checks
    handleNavbarScroll();
    handleBackToTop();
    animateSkillBars();
    animateCounters();
    handleScrollAnimations();
    
    // Navbar toggle
    navToggle.addEventListener('click', toggleMobileNav);
    
    // Nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            closeMobileNav();
            smoothScroll(target);
        });
    });
    
    // Back to top
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll('#home');
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterPublications(filter);
        });
    });
    
    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveLink();
        handleBackToTop();
        animateSkillBars();
        animateCounters();
        handleScrollAnimations();
    }, { passive: true });
    
    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileNav();
            }
        }, 250);
    });
});

// ===== Parallax Effect for Hero Shapes =====
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});