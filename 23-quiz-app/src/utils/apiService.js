import Toast from "../components/Toast";
import Loader from "../components/Loader";
import topicInput from "../components/inputPlaceholder";
import { questionGenerator, MAX_QUESTIONS } from "../main";

const API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;

const mainForm = document.getElementById("main-form");
const topicText = document.getElementById("topic");

mainForm.addEventListener("submit", fetchQuestion);

async function fetchQuestion() {
	let topic = topicInput.value;

	if (topic.trim() === "") {
		Toast("Fill out the input", "bg-rose-500");
		return;
	}

	Loader(mainForm, true);

	//
	const prompt = `
		Only return a valid JSON array that contains ${MAX_QUESTIONS} multiple-choice questions about ${topic}.
		Do not include any explanation or extra text.
		Format strictly as an array starting with [ and ending with ].
		Each question should be an object with the following keys: "question", "options" (array of 4 strings), and "correctAnswer".
		`;

	try {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					contents: [{ parts: [{ text: prompt }] }],
				}),
			},
		);

		if (response.status === 429) {
			Toast("Too Many Requests", "bg-rose-500");
			return;
		}

		if (!response.ok) {
			Toast("No response found", "bg-rose-500");
			return;
		}

		const data = await response.json();
		const dataText = data.candidates[0].content.parts[0].text;
		const startIndex = dataText.indexOf("[");
		const endIndex = dataText.lastIndexOf("]") + 1;

		// convert data to json => !!! is not safe !!!
		const parsedData = JSON.parse(dataText.slice(startIndex, endIndex));

		if (parsedData) {
			questionGenerator(parsedData);
			topicText.textContent = topic;
		}
		//
	} catch (error) {
		Toast("Unfortunately, no questions were found.", "bg-rose-500");
		throw new Error(error.message);
	} finally {
		topicInput.value = "";
		topicInput.focus();
		topicInput.blur();
		Loader(mainForm, false);
	}
}
