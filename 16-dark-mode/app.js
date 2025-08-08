const button = document.getElementById("change-theme");
button?.addEventListener("click", changeTheme);

function themeChecker() {
	if (!button) return;

	const isDark = localStorage.getItem("theme") === "dark";
	document.documentElement.classList.toggle("dark", isDark);
	document.title = isDark ? "dark theme" : "light theme";
	button.textContent = isDark ? "🌕" : "🌑";
}

function changeTheme() {
	if (!button) return;

	const isDark = document.documentElement.classList.toggle("dark");
	localStorage.setItem("theme", isDark ? "dark" : "light");
	document.title = isDark ? "dark theme" : "light theme";
	button.textContent = isDark ? "🌕" : "🌑";
}

window.addEventListener("load", themeChecker);
