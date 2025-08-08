# Instagram Stories Clone (Training Project)

This project is a client-side clone of the "Stories" feature found in popular social media platforms like Instagram and WhatsApp. It allows users to upload, view, and swipe through ephemeral stories that disappear after 24 hours.

> **Note:** This project is for training purposes only, based on the [roadmap.sh Stories Feature training project](https://roadmap.sh/projects/stories-feature).

---

## Features

- Add new stories by uploading images (plus button at the top)
- Images are resized to a maximum of **1080x1920px** before saving
- Stories are stored in the browser's **localStorage** and expire after 24 hours
- View stories in a modal with auto-advance and swipe navigation
- Mark stories as viewed after opening
- Responsive design for desktop and mobile
- Smooth animations and progress bars for each story

---

## How It Works

1. **Add a Story:**

   - Click the plus button to upload an image.
   - The image is resized (if needed) and converted to base64.
   - The story is saved in localStorage with a timestamp.

2. **View Stories:**

   - All active stories are shown in a horizontal scrollable row.
   - Click a story to open it in a modal.
   - Stories auto-advance every 5 seconds, or you can swipe/click to navigate.
   - Viewed stories are visually marked.

3. **Story Expiry:**
   - When the app loads, expired stories (older than 24 hours) are automatically removed from localStorage.

---

## Project Structure

- `src/` - Main source code
  - `components/` - UI components (StoryRenderer, StoryViewer, etc.)
  - `utils/` - Utility functions (image conversion, time calculation)
  - `css/` - Animations and styles
  - `App.js` - Main logic for stories and localStorage
  - `Main.js` - Entry point
- `public/` - Static assets
- `index.html` - Main HTML file

---

## Credits & License

This project is a **training project** from [roadmap.sh](https://roadmap.sh/projects/stories-feature). See the original training link: [https://roadmap.sh/projects/stories-feature](https://roadmap.sh/projects/stories-feature)

Feel free to use, modify, and learn from this code!
