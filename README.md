# Anurag Yadav Portfolio

A polished personal portfolio for Anurag Yadav, built as a lightweight static website with HTML, CSS, and vanilla JavaScript. It presents profile information, projects, skills, experience, education, interests, contact links, and an embedded resume preview.

The site is designed for fast hosting on GitHub Pages and is currently configured for the custom domain `anurag-yadav.in`.

## Highlights

- Responsive portfolio layout with light and dark themes
- Command palette navigation with `Ctrl + K`
- Live local time, scroll progress, active section indicator, and back-to-top control
- Interactive hero card, pointer spotlight, and scroll reveal animations
- Project cards with expandable hidden projects
- Timeline-style experience and education sections
- Separate resume preview page with Google Drive open and download actions
- No build step, framework, or package installation required

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: Inter and JetBrains Mono
- Remix Icon
- GitHub Pages

## Project Structure

```text
.
|-- index.html          # Main portfolio page
|-- resume.html         # Resume preview and download page
|-- style.css           # Theme, layout, responsive styles, animations
|-- script.js           # Interactions, theme state, command palette, animations
|-- profile.jpg         # Profile image used in the hero section
|-- welcome.mp3         # Pronunciation/audio clip used by the hero speaker button
|-- resume-details.txt  # Source notes for resume/profile content
|-- CNAME               # GitHub Pages custom domain
`-- README.md
```

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser.

For a local server, run one of these commands from the project root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Pages

- `index.html` is the main portfolio experience.
- `resume.html` embeds the resume from Google Drive and includes open/download buttons.

## Customization

Update profile content in `index.html`, including name, summary, project cards, social links, experience, education, and contact information.

Update visual styling in `style.css`. Theme colors are controlled through CSS variables under `[data-theme="light"]` and `[data-theme="dark"]`.

Update interactive behavior in `script.js`, including:

- Theme toggle and saved theme preference
- Command palette search items
- Rotating hero focus messages
- Timeline accordion behavior
- Show more/show less projects
- Scroll progress and section indicator
- Hero motion, spotlight, and fade-in animations

To change the resume, replace the Google Drive file ID in `resume.html` in all three places:

- Open link
- Download link
- Preview iframe

## Deployment

This repository can be deployed directly with GitHub Pages.

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Select the branch and root folder.
5. Keep the `CNAME` file if deploying to `anurag-yadav.in`.

If using a different domain, update the `CNAME` file with the new domain.

## Notes

- The site depends on external CDNs for Google Fonts and Remix Icon.
- The resume preview depends on the Google Drive file being publicly viewable.
- `resume-details.txt` is useful as a content source, but it is not loaded by the website.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
