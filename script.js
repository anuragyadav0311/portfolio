
const navLinks = document.querySelectorAll('nav a');
const currentUrl = window.location.href;

navLinks.forEach(link => {
    if (link.href === currentUrl) {
        link.classList.add('active');
    }
});

// Hamburger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
const navOverlay = document.querySelector('.nav-overlay');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navUl.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navUl) navUl.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when overlay is clicked
if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navUl.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
}
