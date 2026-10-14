# Gayani Iresha Portfolio

This portfolio is a responsive single-page website built with HTML, CSS, and vanilla JavaScript for professional software developer and internship applications.

## Project structure

- `index.html` – main page structure and portfolio content
- `style.css` – layout, design system, and responsive styling
- `projects.js` – project data and category filters
- `script.js` – navigation, validation, and EmailJS contact form logic
- `assets/` – profile photo, CV PDF, and project artwork
- `assets/Gayani Iresha Weerasooriya Cv1.pdf` – downloadable CV

## Add or update a project

1. Open `projects.js`.
2. Add a new object to the `projectData` array.
3. Use the following fields:
   - `title`
   - `category`
   - `description`
   - `technologies`
   - `image`
   - `githubUrl` (optional)
   - `liveUrl` (optional)
   - `status`
4. Place project images in `assets/projects/` and reference the relative path in `image`.
5. Reload the page to see the new card appear automatically.

## Supported project categories

The filter buttons are controlled by `projectCategories` in `projects.js`. Current verified categories are:

- All
- Full Stack
- Web Development
- AI

## EmailJS contact form setup

The contact form is already wired for EmailJS and keeps the real recipient email in the email template payload. You still need to configure your own EmailJS account.

1. Sign up at https://www.emailjs.com/
2. Create an Email Service and connect it to your Gmail or another supported provider.
3. Create an Email Template.
4. Include these variables in the template:
   - `from_name`
   - `from_email`
   - `subject`
   - `message`
   - `recipient_email`
5. Copy your service ID, template ID, and public key.
6. Edit `script.js` and replace the placeholders:
   - `YOUR_EMAILJS_SERVICE_ID`
   - `YOUR_EMAILJS_TEMPLATE_ID`
   - `YOUR_EMAILJS_PUBLIC_KEY`
7. Save the file and test the form.

The default configuration is intentionally left as placeholders so no private credentials are exposed in the public repository.

## Test the site locally

Open the project folder in a browser, or run a local static server:

```bash
npx serve .
```

Then test:

- navigation links
- project filter buttons
- CV download
- contact form validation
- EmailJS submission after real credentials are added

## Notes

- The portfolio uses verified information from the current CV and project documentation only.
- LinkedIn is intentionally left as a placeholder until the real profile URL is provided.
- If no live demo is available for a project, the button remains hidden automatically.
