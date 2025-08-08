function show(element, showClass, hideClass) {
	if (element) {
		element.classList.remove(hideClass);
		element.classList.add(showClass);
		element.hidden = false;

		element.addEventListener(
			"animationend",
			() => {
				element.hidden = false;
			},
			{ once: true },
		);
	}
}

function hide(element, showClass, hideClass) {
	if (element) {
		element.classList.remove(showClass);
		element.classList.add(hideClass);

		element.addEventListener(
			"animationend",
			() => {
				element.hidden = true;
			},
			{ once: true },
		);
	}
}

export { show, hide };
