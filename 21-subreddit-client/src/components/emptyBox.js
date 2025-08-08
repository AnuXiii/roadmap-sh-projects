import { hideWithAnimation, showWithAnimation } from "../utils/animationUtils";

const emptyBox = document.querySelector(".empty-box");

//  * Toggles the visibility of the empty box based on the isHidden flag.

function emptyBoxHandler(isHidden = false) {
	isHidden ? showEmptyBox() : hideEmptyBox();
}

function showEmptyBox() {
	showWithAnimation(emptyBox, "scale-in", "scale-out");
}

function hideEmptyBox() {
	hideWithAnimation(emptyBox, "scale-in", "scale-out");
}

export default emptyBoxHandler;
