// ===== Typewriter Effect pour Yahya =====
const typewriterTexts = [
    "Data Engineer",
    "DevOps Architecture",
    "Data Scientist",
    "Data Analyst",
    "Full-Stack Software Solutions"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
    const currentText = typewriterTexts[textIndex];
    if (isDeleting) {
        charIndex--;
        typewriterEl.textContent = currentText.substring(0, charIndex);
    } else {
        charIndex++;
        typewriterEl.textContent = currentText.substring(0, charIndex);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        speed = 500;
    }
    setTimeout(typewrite, speed);
}
typewrite();

// ===== Moteur de navigation et scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// ===== Animations au défilement =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add('visible'); }, index * 100);
        }
    });
}, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== Animation des compteurs =====
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const step = target / 125;
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(update);
            } else counter.textContent = target;
        };
        update();
    });
}
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); statsObserver.unobserve(entries[0].target); }
}, { threshold: 0.5 });
const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== Animation des barres de progression =====
const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        entry.target.querySelectorAll('.skill-progress').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, i * 150);
        });
    }
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(el => skillObserver.observe(el));

// ===== Lueur de la souris =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

// ===== Arrière-plan de particules interactif =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3; this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`; ctx.fill();
    }
}
const particles = [];
for (let i = 0; i < 60; i++) particles.push(new Particle());
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Effet d'inclinaison de la carte code
const codeWindow = document.querySelector('.code-window');
const heroVisual = document.querySelector('.hero-visual');
if (codeWindow && heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        codeWindow.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
}
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelectorAll('.hero .animate-on-scroll').forEach((el, i) => {
        setTimeout(() => { el.classList.add('visible'); }, 200 + i * 150);
    });
});