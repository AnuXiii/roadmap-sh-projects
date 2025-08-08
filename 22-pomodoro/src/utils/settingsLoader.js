import toast from "../components/Toast";
import { defaultSettings, settings, state } from "./settings";
import { timeConvertor } from "./ui";

const settingsMap = {
	currentMode: document.querySelector(`[current-mode="${state.mode}"]`),

	settingsModesText: {
		focus: document.querySelector('[data-mode-value="focus"]'),
		short: document.querySelector('[data-mode-value="short"]'),
		long: document.querySelector('[data-mode-value="long"]'),
	},

	settingsModesInput: {
		focus: document.querySelector('[data-mode-input="focus"]'),
		short: document.querySelector('[data-mode-input="short"]'),
		long: document.querySelector('[data-mode-input="long"]'),
	},

	sendNotificationCheckbox: document.querySelector("#send-notification"),
	alarmCheckbox: document.querySelector("#active-alarm"),
	alarmSelectContainer: document.querySelector('[data-id="alarm-select"]'),
	alarmDefaultSong: document.querySelector(".options li button"),
	alarmSelectInput: document.querySelector("#alarm-select"),
	uploadSongText: document.querySelector("#song-name"),
	customSongInput: document.querySelector("#custom-song"),
};

async function loadSettingsToUi(settings) {
	const { modeTimes, notifications } = settings;

	for (const mode in settingsMap.settingsModesInput) {
		const input = settingsMap.settingsModesInput[mode];
		const text = settingsMap.settingsModesText[mode];
		const time = modeTimes[mode];

		if (input) input.value = time;
		if (text) text.textContent = time;
	}

	settingsMap.sendNotificationCheckbox.checked = notifications.enabled;
	settingsMap.alarmCheckbox.checked = notifications.alarmEnabled;
	settingsMap.alarmSelectInput.value = notifications.alarmSelected;

	settingsMap.currentMode.textContent = timeConvertor(
		modeTimes[settingsMap.currentMode.getAttribute("current-mode")] * 60,
	);

	if (notifications.customSongName !== "") {
		settingsMap.alarmSelectContainer.classList.add("disabled");
		settingsMap.uploadSongText.textContent = notifications.customSongName;
	}
}

const resetSettingsBtn = document.getElementById("reset-settings");
resetSettingsBtn.addEventListener("click", resetSettings);

function resetSettings() {
	localStorage.removeItem("settings");
	indexedDB.deleteDatabase("songDB");
	Object.assign(settings, structuredClone(defaultSettings));
	loadSettingsToUi(settings);
	//
	settingsMap.alarmDefaultSong.click();
	settingsMap.alarmSelectContainer.classList.remove("disabled");
	settingsMap.uploadSongText.textContent = "Selected";
	settingsMap.customSongInput.value = "";
	//
	toast("Settings reset", "bg-blue-500");
}

loadSettingsToUi(settings);
