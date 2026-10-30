# Image assets

The website currently uses generated e-commerce UI/UX demo images. Replace these files with your final work, or update the paths in `assets/js/projects.js`.

## Work carousel

Recommended size: **1600 × 1000 px** (8:5 ratio), JPG/PNG/WebP/SVG.

- `images/work/ecommerce-fashion.png` — fashion store UI
- `images/work/ecommerce-electronics.png` — electronics store UI
- `images/work/ecommerce-grocery.png` — grocery delivery UI
- `images/work/ecommerce-beauty.png` — skincare store UI
- `images/work/ecommerce-furniture.png` — furniture store UI

To use different PNG or WebP files, place them in `images/work/` and change only the relevant `image` value in `assets/js/projects.js`.

## Change carousel content and links

Open `assets/js/projects.js`:

- `PORTFOLIO_SETTINGS` changes the section label, title and small description.
- Every item in `PORTFOLIO_PROJECTS` has editable `title`, `category`, `description`, `image` and `link` fields.
- Replace `https://example.com` with the real project link. The link opens from the large preview dialog.
- Reorder the objects to change the slide order, or copy an object to add another project.

## Contact illustration

- `images/contact/contact-illustration.svg` — the character above the contact card

Recommended transparent image size: **700 × 800 px**.
