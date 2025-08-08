import Toastify from "toastify-js";
import "./components/Select";

function toast(msg, type) {
	Toastify({
		text: msg,
		duration: 3000,
		newWindow: true,
		gravity: "top",
		position: "left",
		className: type,
	}).showToast();
}

function convertor(from = "c", to = "f", value = 10) {
	let result = null;
	const condition = `${from}=>${to}`;

	switch (condition) {
		case "c=>f":
			result = (value * 9) / 5 + 32;
			break;
		case "f=>c":
			result = ((value - 32) * 5) / 9;
			break;
		case "c=>k":
			result = value + 273.15;
			break;
		case "k=>c":
			result = value - 273.15;
			break;
		case "f=>k":
			result = ((value - 32) * 5) / 9 + 273.15;
			break;
		case "k=>f":
			result = ((value - 273.15) * 9) / 5 + 32;
			break;
		default:
			result = "invalid condition";
	}

	return result;
}

const tempInputElm = document.getElementById("temp-input");
const resultElm = document.getElementById("res");
const unitElm = document.getElementById("unit");
const convertBtn = document.getElementById("convert-btn");

function showResult() {
	const convertValue = document.getElementById("convert-value").value;
	const tempValue = document.getElementById("temp-value").value;

	if (tempInputElm.value === "") {
		toast("Please fill out the input", "bg-rose-500");
		return;
	}

	if (convertValue === tempValue) {
		toast("Operators cannot be same", "bg-rose-500");
		return;
	}

	const result = convertor(tempValue, convertValue, tempInputElm.value);
	const degreeSymbol = ["c", "f"].includes(convertValue) ? "&deg;" : "";

	if (document.startViewTransition) {
		document.startViewTransition(() => {
			resultElm.innerHTML = Number(result).toFixed(2);
			unitElm.innerHTML = `${degreeSymbol}${convertValue.toUpperCase()}`;
		});
	} else {
		resultElm.innerHTML = Number(result).toFixed(2);
		unitElm.innerHTML = `${degreeSymbol}${convertValue.toUpperCase()}`;
	}
}

convertBtn.addEventListener("click", showResult);
