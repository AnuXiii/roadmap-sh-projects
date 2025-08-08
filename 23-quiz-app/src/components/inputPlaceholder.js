const label = document.getElementById("label");
const topicInput = document.getElementById("topic-input");

// split current text and re-calibration on span innerHTML
label.innerHTML = label.textContent
	.split("")
	.map(
		(item, index) => `
        <span class="duration-100 ease-custom" style="transition-delay:${index * 5}ms">${item}</span>
    `,
	)
	.join("");

topicInput.addEventListener("focus", animateLabel);
topicInput.addEventListener("blur", animateLabel);
topicInput.addEventListener("input", animateLabel);

function animateLabel(e) {
	label.querySelectorAll("span").forEach((item) => {
		if (e.type === "focus" || e.type === "input" || e.target.value !== "") {
			item.classList.add("text-transparent", "opacity-0", "-translate-y-1/2");
		} else {
			item.classList.remove("text-transparent", "opacity-0", "-translate-y-1/2");
		}
	});
}

export default topicInput;
