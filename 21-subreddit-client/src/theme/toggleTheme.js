import { hideWithAnimation, showWithAnimation } from "../utils/animationUtils";

// Dropdown control for theme options
const openDropdownBtn = document.getElementById("open-dropdown");
const themeOptionsDropdown = document.querySelector(".theme-options");

let isOpen = false;

openDropdownBtn.addEventListener("click", toggleDropdown);

function toggleDropdown() {
	if (!isOpen) {
		showWithAnimation(themeOptionsDropdown, "fade-in", "fade-out");
		openDropdownBtn.classList.add("active");
		trackerHandler();
		isOpen = true;
	} else {
		hideWithAnimation(themeOptionsDropdown, "fade-in", "fade-out");
		openDropdownBtn.classList.remove("active");
		isOpen = false;
	}
}

document.addEventListener("click", (e) => {
	if (isOpen && !e.target.closest("#open-dropdown") && !e.target.closest(".theme-options")) {
		toggleDropdown();
	}
});

// control tracker on dropdown theme options
const tracker = themeOptionsDropdown.querySelector(".tracker");
const themeOptionChild = themeOptionsDropdown.querySelector(".theme-opt");

function trackerHandler() {
	const dropdownRect = themeOptionsDropdown.getBoundingClientRect();
	const targetRect = themeOptionChild.getBoundingClientRect();

	themeOptionsDropdown.addEventListener("mousemove", (e) => {
		const offcetY = e.clientY - dropdownRect.top - 40;

		tracker.style.top = `${offcetY}px`;
	});

	themeOptionsDropdown.addEventListener("mouseenter", () => {
		tracker.style.height = `${targetRect.height}px`;
		tracker.classList.add("on");
	});

	themeOptionsDropdown.addEventListener("mouseleave", () => {
		tracker.style.height = 0;
		tracker.classList.remove("on");
	});
}

// theme initialization and event listeners
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
themeOptionsDropdown.addEventListener("click", getTheme);

function loadTheme() {
	const theme = localStorage.getItem("theme");

	if (theme === "dark") {
		applyTheme("moon");
	} else if (theme === "light") {
		applyTheme("sunny");
	} else {
		applyTheme("tv");
	}
}

function getTheme(e) {
	const validTarget = e.target.closest("button");
	if (!validTarget) return;

	const themeValue = validTarget.dataset.theme;
	toggleDropdown();
	applyTheme(themeValue);
}

function applyTheme(theme) {
	document.documentElement.classList.remove("light", "dark");
	openDropdownBtn.querySelector(".active")?.classList.remove("active");

	let iconName = null;

	switch (theme) {
		case "moon":
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			iconName = "moon-outline";
			break;
		case "sunny":
			document.documentElement.classList.add("light");
			localStorage.setItem("theme", "light");
			iconName = "sunny-outline";
			break;
		case "tv":
			document.documentElement.classList.add(`${isDark}`);
			localStorage.setItem("theme", "system");
			iconName = "tv-outline";
			break;
	}

	openDropdownBtn.querySelector(`[name="${iconName}"]`)?.classList.add("active");
}

export default loadTheme;
