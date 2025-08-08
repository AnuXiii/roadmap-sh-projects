import { getStories, setStories } from "../App";
import { hide, show } from "../utils/AnimationUtils";
import { storyUploadedTime } from "../utils/TimeCalculation";

const STORY_DURATION = 5000;

let cachedStories = [];

let currentStoryIndex = 0;
let timeout = null;
let startXMouse = 0;

const storyWrapperOuter = document.querySelector("[data-story-wrapper-outer]");

const storyViewerModal = document.querySelector("[data-story-modal]");
const storyModalCloseBtn = document.querySelector("[data-story-modal-close]");
const storyBarsContianer = document.querySelector("[data-story-bars]");
const storyImage = document.querySelector("[data-story-img]");
const storyUploadedTimeText = document.querySelector("[data-story-time]");
const navLeftBtnModal = document.querySelector("[data-nav-left-modal]");
const navRightBtnModal = document.querySelector("[data-nav-right-modal]");

function openStoriesModal(target) {
	cachedStories = getStories();
	currentStoryIndex = cachedStories.findIndex((story) => story.id === Number(target.dataset.storyId));

	hide(storyWrapperOuter, "fade-in", "fade-out");
	show(storyViewerModal, "fade-in", "fade-out");

	showStory(currentStoryIndex);
	startAutoStoryAdvance();
}

function closeStoriesModal() {
	show(storyWrapperOuter, "fade-in", "fade-out");
	hide(storyViewerModal, "fade-in", "fade-out");

	clearTimeout(timeout);
	storyBarsContianer.innerHTML = "";
}

function updateStory(index) {
	const story = cachedStories[index];

	if (!story) return;

	story.isViewed = true;
	setStories(cachedStories);
}

function updateStoryUI(index) {
	const story = cachedStories[index];

	if (!story) return;

	storyImage.src = story.file;
	storyUploadedTimeText.textContent = storyUploadedTime(story.id);

	renderProgressBars(index, cachedStories.length);
	animateProgressBar(index, STORY_DURATION);
	updateNavButtons(index, cachedStories.length);
}

function showStory(index) {
	updateStory(index);
	updateStoryUI(index);

	const storyHolder = document.querySelector(`[data-story-id="${cachedStories[index].id}"]`);
	if (storyHolder) storyHolder.dataset.isViewed = true;
}

function startAutoStoryAdvance() {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		if (currentStoryIndex < cachedStories.length - 1) {
			currentStoryIndex++;
			showStory(currentStoryIndex);
			startAutoStoryAdvance();
		} else {
			closeStoriesModal();
		}
	}, STORY_DURATION);
}

function handleStorySwipe(direction) {
	const newIndex = currentStoryIndex + direction;

	if (newIndex >= 0 && newIndex < cachedStories.length) {
		currentStoryIndex = newIndex;
		showStory(currentStoryIndex);
		startAutoStoryAdvance();
	}
}

function updateNavButtons(index, total) {
	if (index === 0) {
		hide(navLeftBtnModal, "fade-in", "fade-out");
	} else {
		show(navLeftBtnModal, "fade-in", "fade-out");
	}

	if (index === total - 1) {
		hide(navRightBtnModal, "fade-in", "fade-out");
	} else {
		show(navRightBtnModal, "fade-in", "fade-out");
	}
}

function renderProgressBars(currentIndex, total) {
	storyBarsContianer.innerHTML = "";

	for (let i = 0; i < total; i++) {
		const fillOuter = document.createElement("div");
		fillOuter.className = "bg-gray-100/40 rounded-full overflow-hidden w-full h-0.5";

		const fillInner = document.createElement("div");
		fillInner.className = "bg-light-gray rounded-[inherit] w-0 h-0.5";

		if (i < currentIndex) {
			fillInner.style.width = "100%";
		}

		fillOuter.appendChild(fillInner);
		storyBarsContianer.append(fillOuter);
	}
}

function animateProgressBar(index, duration) {
	const fillInner = storyBarsContianer.children[index]?.firstElementChild;

	if (!fillInner) return;

	fillInner.style.transition = `${duration}ms`;

	requestAnimationFrame(() => {
		fillInner.style.width = "100%";
	});
}

function handlePauseStory(e) {
	startXMouse = e.clientX;

	clearTimeout(timeout);

	hide(storyBarsContianer, "fade-in", "fade-out");
}

function handleMouseSwipeNavigation(e) {
	startAutoStoryAdvance();
	show(storyBarsContianer, "fade-in", "fade-out");

	const endX = e.clientX;
	const diff = endX - startXMouse;

	if (Math.abs(diff) > 50) {
		if (diff > 0) {
			handleStorySwipe(-1);
		} else {
			if (currentStoryIndex === cachedStories.length - 1) {
				closeStoriesModal();
			} else {
				handleStorySwipe(1);
			}
		}
	}
}

// attach events
storyModalCloseBtn.addEventListener("click", closeStoriesModal);
document.addEventListener("keyup", (e) => (e.key.toLowerCase() === "escape" ? closeStoriesModal() : ""));

navLeftBtnModal.addEventListener("click", () => handleStorySwipe(-1));
navRightBtnModal.addEventListener("click", () => handleStorySwipe(1));

storyViewerModal.addEventListener("mousedown", handlePauseStory);
storyViewerModal.addEventListener("mouseup", handleMouseSwipeNavigation);

export { openStoriesModal };
