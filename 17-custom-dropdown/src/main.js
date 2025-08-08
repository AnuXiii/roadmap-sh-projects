const selectBoxButton = document.querySelectorAll(".select-box-button");
const selectBoxItems = document.querySelectorAll(".select-box-items");
const submitButton = document.querySelector("[type='submit']");

selectBoxButton.forEach((btn) => {
	btn.addEventListener("click", () => {
		const isActive = btn.classList.contains("active");

		selectBoxButton.forEach((item) => {
			item.classList.remove("active");
			item.nextElementSibling.style.maxHeight = 0;
		});

		if (!isActive) {
			btn.classList.add("active");
			btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + "px";
		}
	});
});

document.addEventListener("click", (e) => {
	if (!e.target.closest(".navbar")) {
		selectBoxButton.forEach((btn) => {
			btn.classList.remove("active");
			btn.nextElementSibling.style.maxHeight = 0;
		});
	}
});

selectBoxItems.forEach((selectBox) => {
	selectBox.addEventListener("click", (e) => {
		const validTarget = e.target.closest("button");
		selectBox.querySelectorAll("svg").forEach((svg) => {
			svg.classList.add("opacity-0");
		});

		if (validTarget) {
			validTarget.querySelector("svg").classList.toggle("opacity-0");
			selectBox.style.maxHeight = 0;
			selectBox.querySelector("input").value = validTarget.dataset.value;
			selectBox.previousElementSibling.querySelector("span").textContent = validTarget.dataset.value;
			selectBox.previousElementSibling.classList.remove("active");
		}
	});
});

submitButton.addEventListener("click", (e) => {
	let isFormValid = true;

	selectBoxItems.forEach((item) => {
		const inputElement = item.querySelector("input");

		if (inputElement.value === "") {
			isFormValid = false;
		}
	});

	if (!isFormValid) {
		e.preventDefault();
		Toastify({
			text: "form is required",
			duration: 3000,
			gravity: "top",
			position: "left",
			style: {
				borderRadius: "8px",
				background: "crimson",
				boxShadow: "none",
			},
		}).showToast();
	}
});
