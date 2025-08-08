const cookieModal = document.querySelector(".cookie-modal");
const closeCookie = document.getElementById("close");
const acceptCookie = document.getElementById("accept");

(closeCookie.onclick = cookieRemover) ? (acceptCookie.onclick = cookieRemover) : "";

function cookieRemover() {
	cookieModal.classList.add("hidden");
	localStorage.setItem("cookie", "accepted");
}

window.addEventListener("load", () => {
	if (localStorage.getItem("cookie") === "accepted") {
		cookieModal.classList.add("hidden");
	}
});
