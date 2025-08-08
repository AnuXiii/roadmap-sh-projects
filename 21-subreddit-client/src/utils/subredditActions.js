import { fetchSubReddit } from "./ApiService";
import { getSubreddits, setSubreddits } from "../localStorage/localStorage";
import { toast } from "../components/toast";
import { renderArticle } from "./subredditManager";
import Loader from "../components/loader";
import emptyBoxHandler from "../components/emptyBox";

// Handles action button clicks for refresh or delete
function getActionButton(e) {
	const btn = e.target.closest("button[data-action]");
	if (!btn) return;
	const action = btn.getAttribute("data-action");
	const value = btn.getAttribute("data-value");

	action === "refresh" ? refreshSubreddit(value) : deleteSubreddit(value);
}

// Refreshes subreddit content and updates UI
async function refreshSubreddit(value) {
	const section = document.getElementById(`sub-${value}`);

	if (!section) return;

	Loader(section, true);

	section.querySelectorAll("article").forEach((article) => article.remove());
	section.style.overflow = "hidden";

	try {
		const newData = await fetchSubReddit(value);

		newData.forEach((item, index) => {
			const article = renderArticle(item, index);
			section.append(article);
		});

		toast(`Subreddit "${value.toUpperCase()}" has refreshed`, "bg-green-600");
	} catch (error) {
		toast("Failed to refresh subreddit", "bg-rose-500");
		console.error(error);
	} finally {
		Loader(section, false);
		section.style.overflow = "auto";
	}
}

const scrollNav = document.querySelector(".scroll-nav");

// Deletes subreddit from storage and UI
function deleteSubreddit(value) {
	const subreddits = getSubreddits();

	const newSubreddits = subreddits.filter((sub) => sub.title !== value);
	setSubreddits(newSubreddits);

	const targetElm = document.getElementById(`sub-${value}`);
	targetElm.remove();

	if (!newSubreddits.length) {
		emptyBoxHandler(true);
		scrollNav.hidden = true;
	}

	toast(`"${value.toUpperCase()}" sub has been removed`, "bg-green-600");
}

export { getActionButton };
