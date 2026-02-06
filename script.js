// Add active class to the current page's link in the navigation
const navLinks = document.querySelectorAll('nav a');
const currentUrl = window.location.href;

navLinks.forEach(link => {
    if (link.href === currentUrl) {
        link.classList.add('active');
    }
});
