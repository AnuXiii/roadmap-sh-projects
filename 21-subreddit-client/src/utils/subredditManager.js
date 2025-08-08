import { fetchSubReddit } from "./ApiService";
import { getActionButton } from "./subredditActions";
import { sectionScroller } from "./slider";

// Main container for subreddit sections
const mainContainer = document.querySelector(".main");
mainContainer.addEventListener("click", getActionButton);

// Render subreddit header and posts
async function renderHeader(value) {
	const data = await fetchSubReddit(value);
	const fragment = document.createDocumentFragment();
	const section = document.createElement("section");
	section.id = `sub-${value}`;
	section.className = "sub-section shadow-main";
	section.innerHTML = `
		<header class="sub-header shadow-main">
			<h2 class="sub-title"><span class="sub-r">r/</span><span>${value}</span></h2>
			<ul role="list" class="sub-actions">
				<li role="listitem">
					<button title="refresh current" aria-label="refresh current subreddit" data-action="refresh" data-value="${value}" class="btn btn-soft">
						<ion-icon name="refresh"></ion-icon>
					</button>
				</li>
				<li role="listitem">
					<button title="delete current" aria-label="delete current subreddit" data-action="delete" data-value="${value}" class="btn btn-danger">
						<ion-icon name="close-outline"></ion-icon>
					</button>
				</li>
			</ul>
		</header>
	`;

	fragment.append(section);

	try {
		if (data) {
			data.forEach((item, index) => {
				const article = renderArticle(item, index);
				fragment.querySelector("section").append(article);
			});
		}

		mainContainer.append(fragment);
	} catch (error) {
		section.innerHTML = '<p class="text-2xl text-rose-500 text-center">Failed to get data from reddit</p>';
		mainContainer.append(section);
	}

	sectionScroller(section);
}

// Render a single subreddit post/article
function renderArticle(item, index) {
	const article = document.createElement("article");
	article.style.animationDelay = `${index * 20}ms`;
	article.className = "sub-box scale-in";
	article.innerHTML = `
		<header class="sub-box-header">
			<div class="sub-box-title">
				<h3 class="sub-box-sub-title">${item.title || "N/A"}</h3>
				<p class="sub-box-author">Posted By: <span>${item.author || "N/A"}</span></p>
			</div>
			<a
				href="${item.url}"
				target="_blank"
				title="view post"
				aria-label="view post"
				class="btn btn-primary">
				<ion-icon name="open-outline"></ion-icon>
			</a>
		</header>
		<div class="sub-box-footer">
			<figure class="sub-box-thumbnail">
				<img
					src="${
						item.thumbnail == "" || item.thumbnail == "self" || item.thumbnail == "default"
							? "/images/placeholder-img.jpg"
							: item.thumbnail
					}"
					alt="${item.title || "N/A"}"
					loading="lazy"
					class="sub-box-img" />
			</figure>
			<ul role="list" class="sub-box-info">
				<li role="listitem" class="text-orange-600">
					<span aria-label="upvotes">${item.score || "N/A"}</span>
					<ion-icon name="caret-up-outline"></ion-icon>
				</li>
				<li role="listitem" class="text-blue-500">
					<span aria-label="comments">${item.num_comments || "N/A"}</span>
					<ion-icon name="chatbox-ellipses-outline"></ion-icon>
				</li>
			</ul>
		</div>
	`;

	return article;
}

export { renderHeader, renderArticle };
