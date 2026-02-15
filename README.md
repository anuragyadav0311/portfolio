# Anurag Yadav | Portfolio

A modern, responsive personal portfolio showcasing my journey as an aspiring AI/ML developer and Linux enthusiast. Features a dark theme, mobile-first responsive design, and an interactive terminal-based chatbot.

**Live Site:** [anurag-yadav.in](https://anurag-yadav.in)
**Repo:** [github.com/anuragyadav0311/portfolio](https://github.com/anuragyadav0311/portfolio)

## Features

- **Responsive Design** -- Three breakpoints (992px, 768px, 480px) with a hamburger slide-out menu on mobile.
- **Interactive Terminal Chatbot** -- A retro CRT-styled terminal page where visitors can query about skills, education, and projects.
- **Contact Form** -- Integrated with FormSubmit for direct email delivery.
- **Resume Viewer** -- Embedded PDF viewer with download option.
- **Dark Theme** -- Custom CSS properties for a consistent navy/sky-blue color scheme.

## Tech Stack

- **HTML5** -- Multi-page static site (7 pages)
- **CSS3** -- Custom properties, CSS Grid, Flexbox, media queries, backdrop-filter
- **JavaScript** -- Vanilla JS for nav toggle and terminal chatbot logic
- **Fonts** -- Google Fonts (Poppins, Roboto)
- **Icons** -- [Remix Icon](https://remixicon.com/) via CDN
- **Deployment** -- GitHub Pages with custom domain

## Project Structure

```
portfolio/
├── index.html        # Home / landing page with hero section
├── about.html        # About me, education, skills
├── portfolio.html    # Embedded resume PDF viewer
├── project.html      # Projects grid
├── contact.html      # Contact links (Email, LinkedIn, GitHub, etc.)
├── letstalk.html     # Contact form (FormSubmit)
├── terminal.html     # Interactive terminal chatbot
├── style.css         # Main stylesheet (shared across 6 pages)
├── terminal.css      # Terminal page styles (CRT scanlines, flicker)
├── script.js         # Nav active state + hamburger menu toggle
├── terminal.js       # Terminal chatbot command logic
├── profile.jpg       # Profile photo
└── resume.pdf        # Downloadable resume
```

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Hero section with intro, CTA buttons, and profile photo |
| `about.html` | Education, interests, technical skills, and background |
| `portfolio.html` | Embedded resume PDF with download button |
| `project.html` | Grid of project cards linking to GitHub repos |
| `contact.html` | Contact links with Remix Icons (Email, LinkedIn, GitHub, Codeforces, LeetCode) |
| `letstalk.html` | Contact form powered by FormSubmit |
| `terminal.html` | Retro terminal chatbot -- type `help` for available commands |

## Local Development

```bash
# Clone the repository
git clone https://github.com/anuragyadav0311/portfolio.git

# Open in browser (no build step required)
cd portfolio
open index.html
```

No dependencies, no build tools -- just open any `.html` file in a browser.

## License

Copyright 2026 Anurag Yadav
