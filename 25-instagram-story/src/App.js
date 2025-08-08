import { storyRenderer } from "./components/StoryRenderer";
import { imgResizer } from "./utils/ConvertToBase64";

const MAX_IMG_WIDTH = 1080; // valid image width
const MAX_IMG_HEIGHT = 1920; // valid image height
const STORY_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

const addStoryInput = document.querySelector("[data-add-story-input]");

/* Local storage helper functions 
for adding - setting and getting stories */

function getStories() {
	const stories = localStorage.getItem("stories");
	return stories ? JSON.parse(stories) : [];
}

function setStories(stories) {
	localStorage.setItem("stories", JSON.stringify(stories));
}

function addNewStory(image) {
	const stories = getStories();

	const newStory = {
		id: Date.now(),
		file: image,
		isViewed: false,
	};

	stories.unshift(newStory);
	setStories(stories);
}

// Delete expired stories from local storage when the page is loaded
function deleteExpiredStories() {
	const stories = getStories();
	const now = Date.now();

	// Delete stories that are more than 24 hours Passed
	const validStories = stories.filter((story) => now - story.id < STORY_EXPIRE_TIME);
	setStories(validStories);
	storyRenderer();
}

async function handleAddNewStory(e) {
	const file = e.target.files[0];

	if (!file) return;

	/* resize the image to the valid 
	width and height and add to local storage */
	const resizedImg = await imgResizer(file, MAX_IMG_WIDTH, MAX_IMG_HEIGHT);

	addNewStory(resizedImg);
	storyRenderer();

	e.target.value = "";
}

addStoryInput.addEventListener("change", handleAddNewStory);

export { getStories, setStories, deleteExpiredStories };
