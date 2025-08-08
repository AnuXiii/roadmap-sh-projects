function loader(parent, isLoading = true) {
	const isExist = parent.querySelector(".loader");
	if (isExist) {
		isExist.remove();
	}

	if (!isLoading) {
		parent.style.zIndex = 1;
		return;
	}

	const loader = document.createElement("div");
	loader.className = "loader flex justify-center items-center";
	loader.innerHTML = `<div class="spin"></div>`;

	if (parent.style.position !== "relative") {
		parent.style.position = "relative";
	}

	parent.appendChild(loader);
	parent.style.zIndex = -1;
}

export default loader;
