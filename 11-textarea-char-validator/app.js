const textarea = document.getElementById("textarea");
const counter = document.querySelector(".counter");
const lengthCount = document.querySelector(".length-count");
const maxCount = document.querySelector(".max-count");

const maxLength = 250;

textarea.addEventListener("input", () => {
	if (textarea.value.length > maxLength) {
		textarea.classList.add("error");
		counter.classList.add("error");
		textarea.value = textarea.value.substring(0, maxLength);
	} else {
		textarea.classList.remove("error");
		counter.classList.remove("error");
	}

	lengthCount.textContent = textarea.value.length;
});
