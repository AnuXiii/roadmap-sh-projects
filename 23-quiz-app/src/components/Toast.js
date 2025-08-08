import Toastify from "toastify-js";

function Toast(msg, type) {
	Toastify({
		text: msg,
		className: type,
		position: "left",
		duration: 3000,
	}).showToast();
}

export default Toast;
