import Loader from "../components/loader";
import { createNewSub } from "../utils/subredditRenderer";

const getSubreddits = () => {
	const subreddits = localStorage.getItem("subreddits");
	return subreddits ? JSON.parse(subreddits) : [];
};

const setSubreddits = (subreddits) => {
	localStorage.setItem("subreddits", JSON.stringify(subreddits));
};

const saveSubreddit = (input) => {
	const subreddits = getSubreddits();

	const newSub = {
		title: input,
	};

	subreddits.push(newSub);
	setSubreddits(subreddits);
};

async function loadSubreddits() {
	const mainContainer = document.querySelector(".main");
	Loader(mainContainer, true);

	try {
		const subreddits = await getSubreddits();
		if (subreddits.length) {
			subreddits.forEach((item) => createNewSub(item.title, false));
		}
	} catch (error) {
		console.error(error);
		mainContainer.innerHTML = errMsg();
	} finally {
		Loader(mainContainer, false);
	}
}

const errMsg = () => {
	return `<h1 class="text-2xl text-rose-500 font-bold">Failed to load your subreddits please reload the page</h1>`;
};

export { getSubreddits, setSubreddits, saveSubreddit, loadSubreddits };
