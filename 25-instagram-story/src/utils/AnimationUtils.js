function show(elm, showClass, hideClass) {
	if (!elm) return;

	elm.classList.remove(hideClass);
	elm.classList.add(showClass);
	elm.hidden = false;

	elm.addEventListener(
		"animationend",
		() => {
			elm.hidden = false;
		},
		{ once: true },
	);
}

function hide(elm, showClass, hideClass) {
	if (!elm) return;

	elm.classList.add(hideClass);
	elm.classList.remove(showClass);

	elm.addEventListener(
		"animationend",
		() => {
			elm.hidden = true;
		},
		{ once: true },
	);
}

export { show, hide };
