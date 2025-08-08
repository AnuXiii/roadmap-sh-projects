import loadTheme from "./theme/toggleTheme";
import { loadSubreddits } from "./localStorage/localStorage";

// Initialize theme and subreddits on page load
window.addEventListener("load", () => {
	loadTheme();
	loadSubreddits();
});
