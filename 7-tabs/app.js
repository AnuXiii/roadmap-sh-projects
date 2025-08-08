const tabsHeader = document.querySelector(".tabs-header");
const tabContents = document.querySelectorAll(".tab-content");
let tabIndex = 0;

tabsHeader.addEventListener("click", (e) => {
	const validTarget = e.target.dataset.tab;

	if (validTarget) {
		tabsHeader.querySelector(".active").classList.remove("active");
		e.target.classList.add("active");
		tabIndex = validTarget;
		activeArticle();
	}
});

function activeArticle() {
	tabContents.forEach((item) => {
		const contentIndex = item.dataset.tab;

		if (tabIndex == contentIndex) {
			item.classList.add("active");
		} else {
			item.classList.remove("active");
		}
	});
}
