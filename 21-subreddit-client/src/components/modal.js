import { hideWithAnimation, showWithAnimation } from "../utils/animationUtils";

const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const modal = document.querySelector(".modal");

let isOpen = false;

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

function openModal() {
	showWithAnimation(modal, "fade-in", "fade-out");
	document.body.classList.add("overflow-hidden");
	document.getElementById("subreddit-input").focus();
	isOpen = true;
}

document.addEventListener("keydown", (e) => {
	if (isOpen && e.key === "Escape") {
		closeModal(e);
	}
});

function closeModal(e) {
	// Only close if clicking modal background, close button, or pressing Escape
	if (e.target === modal || e.target.closest("#close-modal") || e.key === "Escape") {
		hideWithAnimation(modal, "fade-in", "fade-out");
		document.body.classList.remove("overflow-hidden");
		isOpen = false;
	}
}

export { openModalBtn, closeModalBtn };
