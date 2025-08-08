export function showAlert(msg, type) {
	Toastify({
		text: msg,
		duration: 3000,
		gravity: "top",
		position: "left",
		className: "alert",
		style: {
			background: type,
			boxShadow: "none",
		},
	}).showToast();
}

export const colors = {
	error: "#ff2056",
	success: "#00a63e",
};
