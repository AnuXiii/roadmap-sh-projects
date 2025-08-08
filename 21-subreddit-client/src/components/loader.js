function Loader(parent, isLoading = false) {
	// Check if loader already exists
	const existingLoader = parent.querySelector(".loader");

	if (!isLoading) {
		// Remove loader if not loading
		existingLoader ? existingLoader.remove() : "";
		return;
	}

	if (existingLoader) return;

	const loader = document.createElement("div");
	loader.className = "loader";
	loader.innerHTML = `<div class="spin"></div>`;

	// Ensure parent is positioned for loader overlay
	const computedStyle = window.getComputedStyle(parent).position;
	if (computedStyle !== "relative" && computedStyle !== "absolute") {
		parent.style.position = "relative";
	}

	parent.appendChild(loader);
}

export default Loader;
