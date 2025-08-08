function padding(num) {
	return num.toString().padStart(2, "0");
}

function storyUploadedTime(time) {
	const hours = new Date(time).getHours();
	const minutes = new Date(time).getMinutes();

	return `${padding(hours)}:${padding(minutes)} ${hours >= 12 ? "PM" : "AM"}`;
}

export { storyUploadedTime };
