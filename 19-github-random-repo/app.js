import loader from "./components/Loader.js";
import "./components/Select.js";

// Utility function to update action button state
const updateActionButton = (button, { text, hasError = false }) => {
	button.setAttribute("aria-label", text);
	button.setAttribute("title", text);
	button.textContent = text;
	button.classList.toggle("error", hasError);
	button.classList.remove("hidden");
};

let cachedData = null;

// Function to get random repository from GitHub
const getRandomRepo = async (language) => {
	const result = document.querySelector(".result");
	const actionButton = document.getElementById("action-btn");

	try {
		loader(result, true);
		loader(actionButton, true);

		const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;
		const response = await fetch(url);
		cachedData = await response.json();

		if (!cachedData.items || cachedData.items.length === 0) {
			throw new Error("No repositories found for this language.");
		}

		const randomIndex = Math.floor(Math.random() * cachedData.items.length);
		const repo = cachedData.items[randomIndex];

		const html = /*html*/ `
			<div class="repo flex flex-col gap-1" role="region" aria-live="polite">
				<header class="flex items-center justify-between gap-1">
				<h3 class="repo-title" title="${repo.name}">${repo.name}</h3>
				<a 
					class="repo-link flex justify-center items-center" 
					href="${repo.html_url}" 
					target="_blank" 
					title="Visit ${repo.name} repository" 
					aria-label="Visit ${repo.name} repository"
				>
					<ion-icon name="paper-plane-outline"></ion-icon>
				</a>
				</header>
				<p class="repo-desc">${repo.description}</p>
				<ul class="repo-info flex justify-between items-center gap-1">
				<li title="Language" class="lang flex items-center gap-0.5">
					<i class="lang-color"></i>
					<span>${repo.language || language}</span>
				</li>
				<li title="Stars" class="stars flex items-center gap-0.5">
					<ion-icon name="star"></ion-icon>
					<span>Stars: ${repo.stargazers_count}</span>
				</li>
				<li title="Forks" class="forks flex items-center gap-0.5">
					<ion-icon name="git-branch"></ion-icon>
					<span>Forks: ${repo.forks_count}</span>
				</li>
				<li title="Issues" class="issues flex items-center gap-0.5">
					<ion-icon name="alert-circle"></ion-icon>
					<span>Issues: ${repo.open_issues_count}</span>
				</li>
				</ul>
			</div>
    `;

		document.startViewTransition(() => {
			result.innerHTML = html;
			updateActionButton(actionButton, { text: "Refresh" });
		});
	} catch (error) {
		const errorMessage = error.message.includes("rate limit")
			? error.message
			: "Failed to fetch repository. Please try again.";
		result.innerHTML = `<h2 class="alt" role="alert">${errorMessage}</h2>`;
		updateActionButton(actionButton, { text: "Retry", hasError: true });
	} finally {
		loader(result, false);
		loader(actionButton, false);
	}
};

// Initialize event listener for action button
const actionButton = document.getElementById("action-btn");
actionButton.addEventListener("click", () => {
	const input = document.querySelector("#value");
	getRandomRepo(input.value);
});

export { getRandomRepo };
