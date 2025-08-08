# Github Random Repo 🐱‍👤

This project is a simple web application that allows users to discover a random popular GitHub repository by programming language. Users can select a language from a searchable dropdown, and the app fetches a random repository using the GitHub API, displaying its details such as name, description, stars, forks, issues, and a direct link.

## Features

- Select a programming language from a searchable dropdown ([`c-select`](components/Select.js))
- Fetch a random popular repository for the selected language ([`getRandomRepo`](app.js))
- Display repository details: name, description, stars, forks, issues, and language
- Loader animation during data fetch ([`loader`](components/Loader.js))
- Responsive and modern UI ([style.css](style.css))
- Built with vanilla JavaScript and Web Components

## Getting Started

1. Clone this repository.
2. Open `index.html` in your browser.
3. Select a language and click "Refresh" to discover a random repository.

## Training Reference

This project is based on the [roadmap.sh Github Random Repo training project](https://roadmap.sh/projects/github-random-repo).  
You can follow the training guide for step-by-step instructions and best practices.

## File Structure

- [`index.html`](index.html): Main HTML file and UI layout
- [`style.css`](style.css): Styling and theme
- [`app.js`](app.js): Main application logic and API integration
- [`components/Select.js`](components/Select.js): Custom language select dropdown
- [`components/Loader.js`](components/Loader.js): Loader animation component

## License
