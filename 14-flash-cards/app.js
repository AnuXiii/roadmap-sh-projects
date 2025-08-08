const progressBar = document.querySelector(".progress-inner");
const progressPercent = document.querySelector(".progress-percent");
const currentIndexValue = document.getElementById("q-current-index");
const allIndexValue = document.getElementById("q-all-counts");
const allFlashCards = document.querySelectorAll(".flash-card");
const answerActionBtn = document.getElementById("card-answer-action");
const next = document.getElementById("next");
const previous = document.getElementById("previous");

allIndexValue.textContent = allFlashCards.length;

let activeFlashCard = document.querySelector(".active");
let currentIndex = 1;

function progressDedicator() {
	let progressValue = parseInt((currentIndex * 100) / allFlashCards.length) + "%";
	progressPercent.textContent = progressValue;
	progressBar.style.width = progressValue;

	currentIndexValue.textContent = currentIndex;
}

function updateButtonsState() {
	currentIndex === allFlashCards.length ? next.classList.add("disabled") : next.classList.remove("disabled");
	currentIndex === 1 ? previous.classList.add("disabled") : previous.classList.remove("disabled");
}

window.addEventListener("DOMContentLoaded", () => {
	progressDedicator();
	updateButtonsState();
});

next.addEventListener("click", nextSlide);
function nextSlide() {
	if (!activeFlashCard.nextElementSibling) return;
	currentIndex++;
	progressDedicator();
	activeFlashCard.classList.remove("active", "slide-in");
	activeFlashCard = activeFlashCard.nextElementSibling;
	activeFlashCard.classList.add("active", "slide-in");
	resetAnswerVisibility();
	updateButtonsState();
}

previous.addEventListener("click", prevSlide);
function prevSlide() {
	if (!activeFlashCard.previousElementSibling) return;
	currentIndex--;
	progressDedicator();
	activeFlashCard.classList.remove("active", "slide-out");
	activeFlashCard = activeFlashCard.previousElementSibling;
	activeFlashCard.classList.add("active", "slide-out");
	resetAnswerVisibility();
	updateButtonsState();
}

answerActionBtn.addEventListener("click", AnswerVisibility);
function AnswerVisibility() {
	activeFlashCard.querySelector(".question").classList.toggle("hidden");
	let answerHidden = activeFlashCard.querySelector(".answer").classList.toggle("hidden");

	answerActionBtn.textContent = answerHidden ? "Show Answer" : "Hide Answer";
}

function resetAnswerVisibility() {
	answerActionBtn.textContent = "Show Answer";
	activeFlashCard.querySelector(".question").classList.remove("hidden");
	activeFlashCard.querySelector(".answer").classList.add("hidden");
}
