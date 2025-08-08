import { toast } from "../components/toast";

// Utility functions for interacting with Reddit API
async function fetchSubReddit(input) {
	let cachedData = [];

	try {
		const url = `https://corsproxy.io/?https://www.reddit.com/r/${input}.json?limit=10`;
		const response = await fetch(url);
		if (!response.ok) {
			toast("Failed to get response", "bg-rose-500");
			return;
		}

		const result = await response.json();
		cachedData = result.data.children.map((item) => item.data);

		if (cachedData.length) {
			return cachedData;
		} else {
			toast("No data founded", "bg-rose-500");
		}
	} catch (error) {
		toast("Failed to fetch data", "bg-rose-500");
	}
}

export { fetchSubReddit };
