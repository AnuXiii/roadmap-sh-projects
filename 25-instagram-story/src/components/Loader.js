function loader(img) {
	if (!img) return;

	const loader = document.createElement("div");
	loader.className = "flex justify-center items-center absolute inset-0 bg-black/80";
	loader.innerHTML = `<div class="size-10 rounded-full animate-spin animate-infinite animate-duration-500 animate-accumulate border-3 border-solid border-primary border-l-transparent"></div>`;

	if (!img.parentElement) return;

	const imgParentStyles = getComputedStyle(img.parentElement);

	if (imgParentStyles.position !== "absolute" && imgParentStyles.position !== "static") {
		img.parentElement.style.position = "relative";
		img.parentElement.style.overflow = "hidden";
	}

	img.parentElement.append(loader);

	img.onload = () => {
		loader.remove();
		img.parentElement.style.position = "";
		img.parentElement.style.overflow = "";
	};

	img.onerror = () => {
		loader.innerHTML = "⚠";
	};
}

export { loader };
