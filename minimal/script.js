/* ========================================
   ANURAG YADAV - PORTFOLIO
   Interactive features & theme management
   ======================================== */

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
    }
}

// Load saved theme or default to light (matches reference)
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ===== LIVE TIME =====
function updateTime() {
    const el = document.getElementById('liveTime');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el.textContent = `${h}:${m}`;
}
updateTime();
setInterval(updateTime, 10000);

// ===== COMMAND PALETTE =====
const cmdPalette = document.getElementById('cmdPalette');
const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
const cmdInput = document.getElementById('cmdInput');
const cmdItems = document.querySelectorAll('.cmd-item');

function openPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => cmdInput && cmdInput.focus(), 100);
}

function closePalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.remove('active');
    document.body.style.overflow = '';
    if (cmdInput) cmdInput.value = '';
    cmdItems.forEach(item => item.classList.remove('hidden'));
}

if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', openPalette);
}

if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
        if (e.target === cmdPalette) closePalette();
    });
}

// Ctrl+K shortcut
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (cmdPalette && cmdPalette.classList.contains('active')) {
            closePalette();
        } else {
            openPalette();
        }
    }
    if (e.key === 'Escape') {
        closePalette();
    }
});

// Search filter
if (cmdInput) {
    cmdInput.addEventListener('input', () => {
        const q = cmdInput.value.toLowerCase().trim();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const keywords = (item.dataset.keywords || '').toLowerCase();
            const match = text.includes(q) || keywords.includes(q);
            item.classList.toggle('hidden', !match);
        });
    });
}

// Close palette on item click
cmdItems.forEach(item => {
    item.addEventListener('click', () => closePalette());
});

// ===== TIMELINE ACCORDION =====
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ===== SHOW MORE PROJECTS =====
const showMoreBtn = document.getElementById('showMoreBtn');
const showMoreText = document.getElementById('showMoreText');
const hiddenProjects = document.querySelectorAll('.hidden-project');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        const isExpanded = showMoreBtn.classList.contains('expanded');
        showMoreBtn.classList.toggle('expanded');
        hiddenProjects.forEach(card => {
            card.classList.toggle('visible');
        });
        showMoreText.textContent = isExpanded ? 'Show More' : 'Show Less';
    });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== FADE-IN ANIMATIONS ON SCROLL =====
function initFadeIn() {
    const elements = document.querySelectorAll(
        '.section-title, .about-list li, .timeline-item, .skill-category, .project-card:not(.hidden-project), .interest-card, .contact-card, .contact-form-wrapper'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

// ===== STAGGERED ANIMATION DELAYS =====
function applyStaggeredDelays() {
    const groups = [
        '.about-list li',
        '.skill-category',
        '.project-card:not(.hidden-project)',
        '.interest-card',
        '.contact-card'
    ];
    groups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.06}s`;
        });
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initFadeIn();
    applyStaggeredDelays();

    // Open first timeline item by default
    const firstTimeline = document.querySelector('.timeline-item');
    if (firstTimeline) firstTimeline.classList.add('open');
});
