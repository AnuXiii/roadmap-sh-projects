import { getStories, setStories } from "../App";
import { storyUploadedTime } from "../utils/TimeCalculation";
import { loader } from "./Loader";
import { isScrollable } from "./StoryScroll";
import { openStoriesModal } from "./StoryViewer";

const storiesRow = document.querySelector("[data-stories-row]");

function storyRenderer() {
	storiesRow.innerHTML = "";

	const stories = getStories();

	const html = stories
		.map((story, index) => {
			return /*html*/ `
                		<li
								class="animate-fade-right animate-duration-200 flex flex-col justify-center items-center gap-2 text-center"
                                style="animation-delay:${index * 20}ms;">
								<button
                                    data-story-id="${story.id}"
									data-is-viewed="${story.isViewed ? true : false}"
                                    aria-label="view the story"
									class="cursor-pointer flex justify-center items-center size-16 rounded-full bg-linear-to-r p-0.5 outline-2 outline-solid outline-transparent focus-visible:outline-secondary">
									<img
										src="${story.file}"
										loading="lazy"
										class="rounded-full object-cover" />
								</button>
								<span class="text-white/80 text-xs">${storyUploadedTime(story.id)}</span>
						</li>
            `;
		})
		.join("");

	storiesRow.innerHTML = html;
	storiesRow.querySelectorAll("img").forEach((img) => loader(img));

	// check if the story wrapper is scrollable when adding new story
	isScrollable();
}

function showStory(e) {
	const validTarget = e.target.closest("button");

	if (!validTarget) return;

	markStoryAsViewed(validTarget);
	openStoriesModal(validTarget);
}

function markStoryAsViewed(target) {
	target.dataset.isViewed = true;

	const storyId = target.dataset.storyId;

	const stories = getStories();

	const updatedStories = stories.map((story) => {
		story.id === Number(storyId) ? (story.isViewed = true) : false;
		return story;
	});

	setStories(updatedStories);
}

storiesRow.addEventListener("click", showStory);

export { storyRenderer };
