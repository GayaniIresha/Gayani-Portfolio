# Gayani Iresha Portfolio

This portfolio is a responsive single-page website built with HTML, CSS, and vanilla JavaScript for professional software developer and internship applications.

## Project structure

- `index.html` – main page structure and portfolio content
- `style.css` – layout, design system, and responsive styling
- `projects.js` – project data and category filters
- `script.js` – navigation, validation, and EmailJS contact form logic
- `assets/` – profile photo and CV PDF; optional project screenshots can be added under `assets/projects/`
- `assets/Gayani Iresha Weerasooriya Cv1.pdf` – downloadable CV

The page is organized into six sections: Home, About Me, Skills, Projects, Education & Certifications, and Contact.

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
      - `designNote` (optional, for verified design work related to a project)
   4. Place project images in `assets/projects/` and reference the relative path in `image`.
   5. Reload the page to see the new card appear automatically.

## Supported project categories

The filter buttons are controlled by `projectCategories` in `projects.js`. Current verified categories are:

- All
- Full Stack
- Web Development
- AI

Design tools and related UI/UX details should be added to the relevant project card where that work was part of the project. The current Mushroom Mate entry includes its verified Figma and draw.io interface modeling.

## EmailJS contact form setup

The contact form is wired for EmailJS and includes input validation, a honeypot, a 30-second client-side rate limit, and Google reCAPTCHA. The form sends to the email address in its configured payload. You still need to ensure the EmailJS service/template and reCAPTCHA domain configuration are enabled for the deployed website.

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
6. Verify the service ID, template ID, public key, template variables, and recipient address in `script.js` and the EmailJS dashboard.
7. Add the reCAPTCHA site key in `index.html` and configure its allowed domains in the Google reCAPTCHA console.
8. Submit a test message and confirm it arrives in the recipient inbox.

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
- EmailJS submission and inbox delivery

## Notes

- The portfolio uses verified information from the current CV and project documentation only.
- The portfolio uses the actual GitHub and LinkedIn URLs provided for this profile.
- If no live demo is available for a project, the button remains hidden automatically.
- DSMS is not currently listed because no verified DSMS description, repository URL, screenshot, or source project details were present in the portfolio files.
