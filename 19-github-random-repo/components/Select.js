import { getRandomRepo } from "../app.js";

let programmingLanguages = {};

async function getProgrammingLanguages() {
	const url =
		"https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";
	const response = await fetch(url);
	const data = await response.json();

	if (programmingLanguages) {
		programmingLanguages = data;
	}
}

await getProgrammingLanguages();

class Select extends HTMLElement {
	#isOpen = false;

	connectedCallback() {
		this.render();
		this.initSelect();
	}

	render() {
		this.innerHTML = /*html*/ `
      <div class="select" role="combobox" aria-expanded="false" aria-controls="options-list">
        <div class="select-display flex items-center justify-between p-1 border-gray rounded-md" tabindex="0">
          <span class="selected">Choose</span>
          <ion-icon name="arrow-down-outline" class="arrow"></ion-icon>
        </div>
        <ul id="options-list" class="options bg-black rounded-md border-gray">
					<div class="input-holder">
						<input type="search" id="search" class="search option p-1" placeholder="Search languages..."/>
					</div>
          ${
						programmingLanguages.length > 0
							? programmingLanguages
									.map(
										(lang, index) => `
                    <li 
                      id="${index + 1}" 
                      class="option p-1 ${lang.value == "" ? "hidden" : ""}" 
                      data-value="${lang.value}" 
                      role="option"
                      tabindex="-1"
                    >${lang.title}</li>
                  `,
									)
									.join("")
							: '<li class="option p-1" role="option">No languages available</li>'
					}
        </ul>
        <input type="text" id="value" name="value" hidden value="" aria-hidden="true"/>
      </div>
    `;
	}

	initSelect() {
		const selectDisplay = this.querySelector(".select-display");
		const arrow = this.querySelector(".arrow");
		const searchInput = this.querySelector(".search");
		const options = this.querySelector(".options");
		const allOptions = this.querySelectorAll(".option:not(.search , .hidden)");
		const input = this.querySelector("#value");

		const toggleDropdown = () => {
			this.#isOpen = !this.#isOpen;
			arrow.classList.toggle("rotate-180");
			this.setAttribute("aria-expanded", this.#isOpen.toString());
			options.classList.toggle("active", this.#isOpen);
			options.style.height = this.#isOpen ? `${options.scrollHeight}px` : "0";

			searchInput.value = "";
			searchByName();
		};

		const selectValue = (e) => {
			const validTarget = e.target.closest("li");
			if (!validTarget) return;

			const selectDisplayValue = selectDisplay.querySelector(".selected");
			selectDisplayValue.textContent = validTarget.dataset.value;
			input.value = validTarget.dataset.value;
			toggleDropdown();
			getRandomRepo(input.value);
		};

		const searchByName = () => {
			const query = searchInput.value.trim().toLowerCase();

			if (!query) {
				allOptions.forEach((opt) => {
					opt.style.display = "block";
				});
			}

			allOptions.forEach((opt) => {
				const match = opt.textContent.toLowerCase().includes(query);
				opt.style.display = match ? "block" : "none";
			});
		};

		selectDisplay.addEventListener("click", toggleDropdown);
		searchInput.addEventListener("input", searchByName);
		options.addEventListener("click", selectValue);

		document.addEventListener("click", (e) => {
			if (this.#isOpen && !e.target.closest(".select")) {
				toggleDropdown();
			}
		});
	}
}

customElements.define("c-select", Select);
