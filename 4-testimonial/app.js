const slider = document.querySelector(".slider");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");
const personName = document.querySelector(".person-name");

let firstSlideWidth = slider.firstElementChild.getBoundingClientRect().width + 25;
let activeSlide = slider.querySelector(".active");
let currentIndex = 0;

backBtn.addEventListener("click", prevSlide);
forwardBtn.addEventListener("click", nextSlide);

function nextSlide() {
	if (!activeSlide.nextElementSibling) return;
	currentIndex++;
	slider.style.transform = `translateX(${-currentIndex * firstSlideWidth}px)`;
	activeSlide.classList.remove("active");
	activeSlide = activeSlide.nextElementSibling;
	activeSlide.classList.add("active");
	updatePersonName(activeSlide);
}

function prevSlide() {
	if (!activeSlide.previousElementSibling) return;
	currentIndex--;
	slider.style.transform = `translateX(${-currentIndex * firstSlideWidth}px)`;
	activeSlide.classList.remove("active");
	activeSlide = activeSlide.previousElementSibling;
	activeSlide.classList.add("active");
	updatePersonName(activeSlide);
}

function updatePersonName(activeSlide) {
	let currentPerson = activeSlide.querySelector("img").alt;
	personName.textContent = currentPerson;
}
