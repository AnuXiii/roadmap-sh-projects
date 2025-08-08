const accordionsContainer = document.querySelector(".accordions-container");

accordionsContainer.addEventListener("click", (e) => {
	const button = e.target.closest(".accordion-button");
	const activeAccordion = accordionsContainer.querySelector('[aria-expanded="true"]');

	if (!button) return;

	if (activeAccordion) {
		accordionsContainer.querySelector('[aria-expanded="true"]').ariaExpanded = "false";
		accordionsContainer.querySelector(".active").classList.remove("active");
	}

	button.classList.add("active");
	button.nextElementSibling.ariaExpanded = "true";
});
