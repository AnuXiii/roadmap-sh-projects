const calculateButton = document.getElementById("calculate-age");
const date = document.getElementById("date");
const resultContainer = document.querySelector(".result-container");

calculateButton.addEventListener("click", calculateAge);

function calculateAge() {
	if (!date.value) return;

	const [inputYear, inputMonth, inputDay] = date.value.split("-").map(Number);

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();

	function ageCalculator() {
		let ageYears = currentYear - inputYear;
		let ageMonths = currentMonth - inputMonth;
		let ageDays = currentDay - inputDay;

		if (ageDays < 0) {
			const previusMonth = new Date(currentYear, currentMonth - 1, 0);
			const daysInPreviusMonth = previusMonth.getDate();

			ageDays += daysInPreviusMonth;
			ageMonths--;
		}

		if (ageMonths < 0) {
			ageYears--;
			ageMonths += 12;
		}

		resultContainer.querySelector("#years").textContent = ageYears;
		resultContainer.querySelector("#months").textContent = ageMonths;
		resultContainer.querySelector("#days").textContent = ageDays;
		resultContainer.classList.remove("hidden");
	}

	ageCalculator();
}
