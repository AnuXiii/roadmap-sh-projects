const progressBar = document.querySelector(".progress-inner");
const steps = document.querySelectorAll(".step");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let activeStep = document.querySelector(".active");

let currentStep = 1;

next.addEventListener("click", nextStep);
prev.addEventListener("click", prevStep);

function nextStep() {
	if (!activeStep.nextElementSibling) return;
	currentStep++;
	progressBar.style.width = ((currentStep - 1) / (steps.length - 1)) * 100 + "%";
	activeStep = activeStep.nextElementSibling;
	activeStep.classList.add("active");
	updateButton(currentStep);
}

function prevStep() {
	if (!activeStep.previousElementSibling) return;
	currentStep--;
	progressBar.style.width = ((currentStep - 1) / (steps.length - 1)) * 100 + "%";
	activeStep.classList.remove("active");
	activeStep = activeStep.previousElementSibling;
	activeStep.classList.add("active");
	updateButton(currentStep);
}

function updateButton(currentStep) {
	prev.disabled = currentStep <= 1;
	next.disabled = currentStep === steps.length;
}
