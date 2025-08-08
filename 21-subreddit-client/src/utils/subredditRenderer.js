import { fetchSubReddit } from "./ApiService";
import { getSubreddits, saveSubreddit } from "../localStorage/localStorage";
import { closeModalBtn, openModalBtn } from "../components/modal";
import { toast } from "../components/toast";
import { renderHeader } from "../utils/subredditManager";
import Loader from "../components/loader";
import emptyBoxHandler from "../components/emptyBox";

const addNewSubredditBtn = document.getElementById("addnew-subreddit");
const subredditInput = document.getElementById("subreddit-input");
const scrollNav = document.querySelector(".scroll-nav");

// Add event listeners for adding new subreddit
addNewSubredditBtn.addEventListener("click", validator);
subredditInput.addEventListener("keydown", (e) => (e.key === "Enter" ? validator() : ""));

// Validate subreddit input and handle existence check
function validator() {
	if (subredditInput.value.trim() === "") {
		toast("Please fill out the form", "bg-rose-500");
		return;
	}

	const subreddits = getSubreddits();
	const isSubredditExist = subreddits.some((sub) => sub.title === subredditInput.value.toLowerCase());

	if (isSubredditExist) {
		subHasExist(subredditInput.value);
	} else {
		createNewSub(subredditInput.value, true);
		closeModalBtn.click();
	}
}

// Show toast if subreddit already exists
function subHasExist(value) {
	return toast(`"${value.toUpperCase()}" sub has already exist`, "bg-rose-500");
}

// Toggle add button disabled state based on input
subredditInput.addEventListener("input", toggleBtnDisabled);
function toggleBtnDisabled() {
	if (subredditInput.value.trim() === "") {
		addNewSubredditBtn.classList.add("disabled");
	} else {
		addNewSubredditBtn.classList.remove("disabled");
	}
}

// Creates a new subreddit entry by fetching its data and handling UI state.

async function createNewSub(value, saveToLocalStorage = false) {
	Loader(addNewSubredditBtn, true);
	Loader(openModalBtn, true);

	try {
		addNewSubredditBtn.classList.add("disabled");
		const data = await fetchSubReddit(value);
		if (data) {
			success(value, saveToLocalStorage);
		} else {
			toast("No data found", "bg-rose-500");
		}
	} catch (error) {
		console.log(error);
	} finally {
		Loader(addNewSubredditBtn, false);
		Loader(openModalBtn, false);
	}
}

function success(value, saveToLocalStorage = false) {
	renderHeader(value);
	saveToLocalStorage ? saveSubreddit(value.toLowerCase()) : "";
	emptyBoxHandler();
	toast(`"${value.toUpperCase()}" sub has added`, "bg-green-600");
	scrollNav.hidden = false;
	subredditInput.value = "";
}

export { createNewSub };
