import "./utils/apiService";
import topicInput from "./components/inputPlaceholder";
import { hide, show } from "./utils/animateUtils";
import Toast from "./components/Toast";

//
const MAX_TIME = 60;
const MAX_QUESTIONS = 5;
const MIN_DELAY = 1500;
const MAX_DELAY = 2000;

// RADIUS FOR SVG ELEMENTS
const RADIUS = 90;

// GLOBAL STATE
const state = {
	score: 0,
	timer: null,
	timeLeft: MAX_TIME,
	currentQuestion: 0,
	totalQuestions: 0,
	correctAnswers: [],
};

// HERO ELEMENT
const heroSection = document.getElementById("hero-section");

// STAGE ELEMENTS
const stage = document.getElementById("stage");
const timerText = document.getElementById("timer");
const timerProgressCircle = document.getElementById("timer-progress");
const scoreElm = document.getElementById("score");
const questionProgressBar = document.getElementById("progress-bar");
const questionsProgressText = document.getElementById("questions-progress");

// QUESTION ELEMENTS
const questionsContainer = document.getElementById("questions-container");

// SCORE ELEMENTS
const resultSection = document.getElementById("result");
const resultScoreText = document.getElementById("result-score");
const totalQuestionsText = document.getElementById("total-questions");
const scoreProgress = document.getElementById("score-progress");
const resetBtn = document.getElementById("reset");

// UPDATE PROGRESS BAR BASED START INDEX AND TOTAL LENGTH(MAX QUESTIONS)
function updateProgressBar(qIndex, qLength = MAX_QUESTIONS) {
	questionProgressBar.style.width = (qIndex / qLength) * 100 + "%";
	questionsProgressText.textContent = (qIndex / qLength) * 100 + "%";
}

function questionGenerator(questions) {
	// TOTAL QUESTIONS VALUED
	state.totalQuestions = questions.length;

	const fragment = document.createDocumentFragment();
	questions.forEach((item, index) => {
		// PUSH CORRECT ANSWERS TO A ARRAY
		state.correctAnswers.push(item.correctAnswer);
		//
		const div = document.createElement("div");
		div.setAttribute("data-index", index);
		div.hidden = true;
		div.className = "question-wrapper grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2";
		div.innerHTML = /*html*/ `
						<aside
							class="question-aside relative flex flex-col justify-between gap-4 bg-neutral-900 rounded-lg border border-solid border-white/20 p-6 z-1">
							<h3 class="question leading-10 text-pretty text-white/80 font-medium text-xl">
								${item.question}
							</h3>
							<figure class="hidden md:block size-70 mx-auto">
								<img
									src="/quiz-show.svg"
									alt="quiz show"
									class="w-full h-full object-cover" />
							</figure>
							<div class="questions-lengths text-white/70 flex items-center justify-end text-right gap-2 text-sm">
								<span>Question</span>
								<span class="current-question text-white font-bold text-xl">${index + 1}</span>
								<span>of</span>
								<span class="total-questions text-white font-bold text-xl">${state.totalQuestions}</span>
							</div>
							<div class="absolute inset-0 z-[-1] bg-[url('/black-dots.svg')] rounded-[inherit]"></div>
							<div
								class="absolute inset-0 z-[-1] bg-linear-to-b from-neutral-950 to-transparent rounded-[inherit]"></div>
						</aside>
						<ul
							role="doc-qna"
							class="question-options flex flex-1 flex-col gap-8 w-full">
							${item.options
								.map(
									(opt, index) => /*html*/ `
								<li
									role="doc-index">
									<button
										data-value="${opt}"
										aria-label="submit answer"
										title="submit answer"
										role="button"
										class="option flex justify-between items-center bg-linear-to-r from-zinc-800 to-neutral-800 bg-clip-border w-full p-4 rounded-lg border border-solid border-white/20 shadow-lg shadow-black duration-200 ease-custom hover:border-white hover:opacity-95 active:scale-95 active:border-white">
										<i
											class="option-letter w-14 h-8 bg-linear-to-r from-zinc-800 to-neutral-800 border-2 border-solid border-white/50 flex justify-center items-center text-white/70">
											<span class="bg-linear-to-r from-zinc-800 to-neutral-800 font-semibold block py-2 px-3 bg-black">${index + 1}</span>
											</i
										>
										<span class="option-text flex justify-center w-full text-center text-white/90 text-lg"
											>${opt}</span
										>
									</button>
								</li>
								`,
								)
								.join("")}
						</ul>
        `;
		// ADD SUBMIT ANSWER EVENT TO EACH QUESTIONS CONTAINER
		div.addEventListener("click", (e) => submitAnswer(e, div));
		fragment.appendChild(div);
	});

	questionsContainer.append(fragment);

	// HIDE HERO SECTION AND START THE GAME
	hide(heroSection, "fade-in", "fade-out");
	show(stage, "fade-in", "fade-out");
	startGame();

	// SHOW FIRST QUESTION
	showQuestion(state.currentQuestion, 500, 0);
}

function showQuestion(index, inDelay = 500, outDelay = 0) {
	let activeIndex = questionsContainer.querySelector(`[data-index="${index}"]`);
	setTimeout(() => show(activeIndex, "move-left", "move-right"), inDelay);

	questionsContainer.querySelectorAll(`[data-index]:not([data-index="${index}"])`).forEach((item) => {
		setTimeout(() => hide(item, "move-left", "move-right"), outDelay);
	});
}

function submitAnswer(e, parent) {
	const btn = e.target.closest(".option");

	if (!btn) return;

	const answerText = btn.dataset.value;
	const currentQuestionIndex = state.currentQuestion;
	const correctAnswer = state.correctAnswers[currentQuestionIndex];

	if (answerText.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
		updateScore();
	}

	goNextQuestion(parent);
}

// SVG CIRCLE FOR QUESTION TIMER
function updateCircle() {
	const circumference = 2 * Math.PI * RADIUS;
	const percent = 1 - (MAX_TIME - state.timeLeft) / MAX_TIME;
	const offsect = circumference * (1 - percent);
	timerProgressCircle.style.strokeDashoffset = offsect;
}

function startGame() {
	state.timer = setInterval(() => {
		if (state.timeLeft <= 0) {
			clearInterval(state.timer);

			const parent = questionsContainer.querySelector(`[data-index="${state.currentQuestion}"]`);

			goNextQuestion(parent);

			return;
		}

		state.timeLeft--;
		timerText.textContent = state.timeLeft;
		updateCircle();
	}, 1000);
}

function goNextQuestion(parent) {
	state.currentQuestion++;

	showQuestion(state.currentQuestion, MAX_DELAY, MIN_DELAY);
	updateProgressBar(state.currentQuestion);

	clearInterval(state.timer);

	setTimeout(() => {
		state.timeLeft = MAX_TIME;
		startGame();
	}, MIN_DELAY);

	parent.classList.add("pointer-events-none");

	parent.querySelectorAll(".option").forEach((opt) => {
		if (state.correctAnswers.includes(opt.dataset.value)) {
			opt.classList.add("correct");
		} else {
			opt.classList.add("incorrect");
		}
	});

	if (state.currentQuestion === state.totalQuestions) {
		setTimeout(() => gameOver(), MIN_DELAY);
	}
}

function updateScore() {
	state.score++;
	scoreElm.textContent = state.score;
	Toast("Score passed", "bg-green-600");
}

function gameOver() {
	hide(stage, "fade-in", "fade-out");
	show(resultSection, "fade-in", "fade-out");

	clearInterval(state.timer);
	state.timer = null;
	state.timeLeft = MAX_TIME;
	state.currentQuestion = 0;
	state.correctAnswers = [];
	updateProgressBar(state.currentQuestion);

	showScore();
}

function showScore() {
	resultScoreText.textContent = state.score;
	totalQuestionsText.textContent = MAX_QUESTIONS;

	const circumference = 2 * Math.PI * RADIUS;
	const step = circumference / MAX_QUESTIONS;
	const offset = state.score * step;

	setTimeout(() => (scoreProgress.style.strokeDashoffset = offset), 1000);
}

resetBtn.addEventListener("click", startNewGame);

function startNewGame() {
	state.score = 0;
	scoreElm.textContent = state.score;
	state.totalQuestions = MAX_QUESTIONS;

	show(heroSection, "fade-in", "fade-out");
	hide(resultSection, "fade-in", "fade-out");

	topicInput.focus();
	topicInput.blur();
	questionsContainer.innerHTML = "";
	scoreProgress.style.strokeDashoffset = 0;
}

export { questionGenerator, MAX_QUESTIONS };
