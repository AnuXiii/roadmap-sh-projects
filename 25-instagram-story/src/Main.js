import { deleteExpiredStories } from "./App";
import { isScrollable } from "./components/StoryScroll";

window.addEventListener("load", () => {
	deleteExpiredStories();

	// check if the story wrapper is scrollable
	isScrollable();
});
