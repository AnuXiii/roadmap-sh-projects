const navItems = document.querySelector(".nav-items");
const line = navItems.querySelector(".line");
const links = document.querySelectorAll(".link");

links.forEach((link) => {
	link.addEventListener("mouseenter", () => {
		const rect = link.getBoundingClientRect();
		const navRect = navItems.getBoundingClientRect();

		const offsetLeft = rect.left - navRect.left;

		line.style.width = rect.width + "px";
		line.style.left = offsetLeft + "px";
		line.style.opacity = 1;
	});

	link.addEventListener("mouseleave", () => {
		line.style.opacity = 0;
	});
});

const sections = document.querySelectorAll("[data-section]");
function linkScrollChecker() {
	let currentSectionId = "";

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const scrollY = window.scrollY;

		if (scrollY >= sectionTop - sectionHeight / 3) {
			currentSectionId = section.getAttribute("id");
		}
	});

	links.forEach((link) => {
		link.classList.remove("active");

		if (link.getAttribute("href") === `#${currentSectionId}`) {
			link.classList.add("active");
		} else {
			link.classList.remove("active");
		}
	});
}

window.addEventListener("scroll", linkScrollChecker);
window.addEventListener("load", linkScrollChecker);

// control the nav bar with menu button
const navControl = document.querySelector(".nav-control");

navControl.addEventListener("click", () => {
	let navActive = navControl.classList.toggle("bg-rose-600");
	navItems.classList.toggle("active");
	document.body.classList.toggle("overflow-hidden");

	navActive ? (navControl.children[0].name = "close-outline") : (navControl.children[0].name = "grid-outline");
});

window.addEventListener("scroll", () => {
	if (window.scrollY > 10) {
		document.querySelector(".nav-container").classList.add("active");
	} else {
		document.querySelector(".nav-container").classList.remove("active");
	}
});

const gridContainer = document.querySelector(".grid-container");
gridContainer?.addEventListener("mousemove", (e) => {
	gridContainer.style.setProperty("--x", e.x + "px");
	gridContainer.style.setProperty("--y", e.y + "px");
});

const accordionContainer = document.querySelector(".accordion-container");
accordionContainer?.addEventListener("click", (e) => {
	const validTarget = e.target.closest(".accordion-header");
	const activeItem = accordionContainer.querySelector(".active");

	if (!validTarget) return;

	if (activeItem) {
		activeItem.classList.remove("active");
		activeItem.nextElementSibling.style.height = 0;
	}

	validTarget.classList.add("active");
	validTarget.nextElementSibling.style.height = validTarget.nextElementSibling.scrollHeight + "px";
});

const labels = document.querySelectorAll(".label");

labels.forEach((label) => {
	label.innerHTML = label.textContent
		.split("")
		.map((letter, index) => `<span style="transition-delay:${index * 50}ms" class="duration-200">${letter}</span>`)
		.join("");
});

const scrollTop = document.getElementById("scrollTop");
scrollTop
	? (scrollTop.onclick = () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
	  })
	: "";
