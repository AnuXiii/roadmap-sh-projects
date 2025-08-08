import { hide, show } from "../utils/AnimationUtils";

const storyWrapperInner = document.querySelector("[data-story-wrapper-inner]");
const navRightBtn = document.querySelector("[data-nav-right]");
const navLeftBtn = document.querySelector("[data-nav-left]");

function isScrollable() {
	const hasHorizontalOverflow = storyWrapperInner.scrollWidth > storyWrapperInner.clientWidth;

	if (hasHorizontalOverflow) {
		show(navRightBtn, "fade-in", "fade-out");
	} else {
		hide(navRightBtn, "fade-in", "fade-out");
		hide(navLeftBtn, "fade-in", "fade-out");
	}
}

function storiesToScrollRight() {
	storyWrapperInner.scrollLeft += storyWrapperInner.clientWidth + 20;
	show(navLeftBtn, "fade-in", "fade-out");
}

function storiesToScrollLeft() {
	storyWrapperInner.scrollLeft -= storyWrapperInner.clientWidth + 20;
}

function storiesScrollNavsController() {
	const threshold = 5;

	const isAtStart = storyWrapperInner.scrollLeft <= threshold;
	const isAtEnd =
		storyWrapperInner.scrollLeft + storyWrapperInner.clientWidth >= storyWrapperInner.scrollWidth - threshold;

	isAtStart ? hide(navLeftBtn, "fade-in", "fade-out") : show(navLeftBtn, "fade-in", "fade-out");
	isAtEnd ? hide(navRightBtn, "fade-in", "fade-out") : show(navRightBtn, "fade-in", "fade-out");
}

// attach events
navRightBtn.addEventListener("click", storiesToScrollRight);
navLeftBtn.addEventListener("click", storiesToScrollLeft);
storyWrapperInner.addEventListener("scroll", storiesScrollNavsController);

window.addEventListener("resize", storiesScrollNavsController);

export { isScrollable };
