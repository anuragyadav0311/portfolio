const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Set default theme to dark
body.classList.add('dark-mode');
toggle.textContent = "🌞";

toggle.addEventListener("click", () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        toggle.textContent = "🌙";
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        toggle.textContent = "🌞";
    }
});
