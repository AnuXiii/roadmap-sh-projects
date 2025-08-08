const Loader = (parent, isLoading = false) => {
	const existingLoader = parent.querySelector(".loader");

	if (!isLoading && existingLoader) {
		existingLoader.remove();
		parent.style.removeProperty("overflow");
		parent.style.removeProperty("pointer-events");
		return;
	}

	if (existingLoader) return;

	const loader = document.createElement("div");
	loader.className = "loader bg-black/80 backdrop-blur-xs absolute inset-0 flex justify-center items-center";
	loader.innerHTML = `<div class="spin w-7 h-7 animate-spin rounded-full border-3 border-solid border-primary border-l-transparent"></div>`;

	if (getComputedStyle(parent).position === "static") {
		parent.style.position = "relative";
	}
	parent.style.overflow = "hidden";
	parent.style.pointerEvents = "none";

	parent.append(loader);
};

export default Loader;
