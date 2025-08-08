import { chevronDownOutline } from "ionicons/icons";
const icon = chevronDownOutline.split(",")[1];

class Select extends HTMLElement {
	#isOpen = false;

	connectedCallback() {
		const id = this.getAttribute("data-id") || "select";
		const selected = this.getAttribute("placeholder") || "seleted";
		const selectedValue = this.getAttribute("default") || "";
		const options = JSON.parse(this.getAttribute("options") || "[]");

		this.innerHTML = `
               <div id="${id}" class="select">
                    <div class="selected-holder">
                        <button class="select-btn">
                            <p class="default-value">${selected}</p>
                            <i class="icon">${icon}</i>
                        </button>
                    </div>
                    <ul class="options" hidden>
                        ${options
													.map(
														(item) => `
                                <li class="opt">
                                    <button class="btn" data-value="${item.value}">${item.key.toUpperCase()}</button>
                                </li>    
                            `
													)
													.join("")}
                    </ul>
                    <input id="${id}-value" value="${selectedValue}" hidden/>
               </div> 
        `;

		this.initSelectBox();
	}

	initSelectBox() {
		const selectBtn = this.querySelector(".select-btn");
		const selectValue = this.querySelector(".default-value");
		const options = this.querySelector(".options");
		const selectInput = this.querySelector("input");

		const selectToggler = () => {
			if (!this.#isOpen) {
				options.classList.remove("scale-out");
				options.classList.add("scale-in");
				options.hidden = false;
				this.#isOpen = true;
			} else {
				options.classList.remove("scale-in");
				options.classList.add("scale-out");

				options.addEventListener(
					"animationend",
					() => {
						options.hidden = true;
						this.#isOpen = false;
					},
					{ once: true }
				);
			}
		};

		const Selector = (e) => {
			selectValue.textContent = e.target.textContent;
			selectInput.value = e.target.dataset.value;
			selectToggler();
			this.#isOpen = false;
		};

		selectBtn.addEventListener("click", selectToggler);
		options.addEventListener("click", Selector);

		document.addEventListener("click", (event) => {
			if (this.#isOpen && !this.contains(event.target)) {
				selectToggler();
				this.#isOpen = false;
			}
		});
	}
}

customElements.define("c-select", Select);
