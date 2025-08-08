const DEFAULT_JPEG_QUALITY = 0.85;

function imgResizer(file, maxWidth, maxHeight) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		// Read passed file as data url
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			const img = new Image();
			img.onload = () => {
				let { width, height } = img;

				const aspectRatio = width / height;

				const widthRatio = width / maxWidth;
				const heightRatio = height / maxHeight;

				if (widthRatio > heightRatio) {
					width = maxWidth;
					height = width / aspectRatio;
				} else {
					height = maxHeight;
					width = height * aspectRatio;
				}

				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, width, height);

				if (file.type === "image/png") {
					resolve(canvas.toDataURL("image/png"));
				} else {
					resolve(canvas.toDataURL("image/jpeg", DEFAULT_JPEG_QUALITY));
				}
			};

			img.onerror = () => reject(new Error("Could not load the image."));

			img.src = fileReader.result;
		};

		fileReader.onerror = () => reject(new Error("Could not read the file."));
	});
}

export { imgResizer };
