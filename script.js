// ===== Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Scroll Animations with stagger =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for grid items
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.animationDelay = `${delay}ms`;
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with staggered delays
document.querySelectorAll('.catalog-category').forEach((el, i) => {
    el.dataset.delay = i * 100;
    observer.observe(el);
});

document.querySelectorAll('.feature-item').forEach((el, i) => {
    el.dataset.delay = i * 150;
    observer.observe(el);
});

document.querySelectorAll('.contact-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
    observer.observe(el);
});

document.querySelectorAll('.product-card').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax-like effect on hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.3;
        hero.style.transform = `translateY(${offset}px)`;
        hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.8;
    }
});
