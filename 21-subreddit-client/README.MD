# Subreddit Client

A simple web client for browsing multiple subreddits, built with Vite, Tailwind CSS, and vanilla JavaScript.

> **Note:**  
> This project was created as a practice project based on the [Intermediate Projects](https://roadmap.sh/projects/reddit-client) from [roadmap.sh](https://roadmap.sh/).

## Features

- Add and manage multiple subreddits
- Fetch and display subreddit posts
- Refresh or delete individual subreddits
- Persistent subreddit list using localStorage
- Light, dark, and system theme support
- Responsive and modern UI with smooth animations
- Toast notifications and loading indicators

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/AnuXiii/subreddit-client.git
   cd subreddit-client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Development

Start the development server:

```sh
npm run dev
```

The app will open in your browser at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

### Build

To build for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```

## Project Structure

- `src/` - Main source code
  - `components/` - UI components (modal, toast, loader, etc.)
  - `css/` - Custom CSS and animations
  - `localStorage/` - Local storage utilities
  - `theme/` - Theme toggling logic
  - `utils/` - Core logic for subreddit fetching and rendering
- `public/` - Static assets (images, icons)
- `index.html` - Main HTML file
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Credits

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Toastify JS](https://apvarun.github.io/toastify-js/)
- [Ionicons](https://ionic.io/ionicons)

## License

This project is licensed under the
