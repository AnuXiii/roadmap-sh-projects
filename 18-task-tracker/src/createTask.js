import { showAlert, colors } from "./showAlert.js";

const newTaskInput = document.getElementById("new-task-input");
const createNewTaskBtn = document.getElementById("create-new-task-btn");
const resultContainer = document.querySelector(".result-container");
const emptyBox = document.querySelector(".empty-box");

newTaskInput.addEventListener("keypress", (e) => {
	const taskValue = newTaskInput.value;

	if (e.key.toLocaleLowerCase() == "enter") {
		if (newTaskInput.value.trim() == "") {
			showAlert("input is required", colors.error);
			return;
		}
		addNewTask(taskValue);
		newTaskInput.value = "";
	}
});

createNewTaskBtn.addEventListener("click", () => {
	const taskValue = newTaskInput.value;

	if (newTaskInput.value.trim() == "") {
		showAlert("input is required", colors.error);
		return;
	}
	addNewTask(taskValue);
	newTaskInput.value = "";
});

const getNowDate = () => {
	return new Date().toLocaleDateString("fa-IR", {
		hour: "2-digit",
		minute: "2-digit",
		day: "numeric",
		weekday: "long",
	});
};

setInterval(() => {
	getNowDate();
}, 1000);

const getTasksFromLocalStorage = () => {
	const tasks = localStorage.getItem("tasks");
	return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

window.addEventListener("DOMContentLoaded", () => {
	const tasks = getTasksFromLocalStorage();
	tasks.forEach((task) => {
		createNewTask(task.text, task.completed, task.id, task.date);
	});
});

function addNewTask(value) {
	const tasks = getTasksFromLocalStorage();
	const newTask = {
		id: Date.now(),
		text: value,
		completed: false,
		date: getNowDate(),
	};

	tasks.push(newTask);
	saveTasksToLocalStorage(tasks);

	createNewTask(newTask.text, newTask.completed, newTask.id, newTask.date);
}

function createNewTask(value, completed = false, id, date) {
	const taskContainer = document.createElement("div");
	taskContainer.className = "task";
	taskContainer.dataset.checked = completed;
	taskContainer.dataset.id = id;
	taskContainer.innerHTML = `
		<button class="flex-1/2 flex items-center gap-6 py-8 cursor-pointer checkbox-btn group ${completed ? "active" : ""}">
			<span
				class="p-2 flex justify-center items-center duration-200 cursor-pointer bg-primary border border-solid border-white/50 rounded-md w-8 h-8 group-hover:bg-green-500/20">
				<ion-icon
					name="checkmark-outline"
					class="duration-100 delay-200 opacity-0"></ion-icon>
			</span>
			<div class="flex flex-col gap-3 justify-start items-start">
			<span class="date text-sm text-secondary/50 font-mono">${date}</span>
			<p class="task-text duration-200 text-secondary/80 select-none break-all whitespace-normal break-words
 				group-hover:opacity-80">
				${value}
			</p>
			</div>
		</button>
		<button
			aria-label="delete-task"
			title="delete task"
			class="delete-btn duration-200 cursor-pointer text-2xl text-secondary p-4 border-2 border-solid bg-neutral-900 border-rose-500 flex justify-center items-center rounded-lg hover:bg-rose-500">
			<ion-icon name="trash-outline"></ion-icon>
		</button>
    `;
	resultContainer.prepend(taskContainer);
	taskContainer.classList.add("scale-in");
	emptyBox.classList.add("hidden");

	const checkboxBtn = taskContainer.querySelector(".checkbox-btn");
	checkboxBtn.addEventListener("click", checkedBox);

	const deleteTaskBtn = taskContainer.querySelector(".delete-btn");
	deleteTaskBtn.addEventListener("click", deleteTask);
}

function checkedBox() {
	const taskEl = this.parentNode;
	const taskId = Number(taskEl.dataset.id);
	const isChecked = this.classList.toggle("active");

	if (isChecked) {
		this.title = "checked";
		this.classList.add("active");
		taskEl.dataset.checked = true;
	} else {
		this.title = "unchecked";
		this.classList.remove("active");
		taskEl.dataset.checked = false;
	}

	const tasks = getTasksFromLocalStorage();
	const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: isChecked } : task));
	saveTasksToLocalStorage(updatedTasks);
}

function deleteTask() {
	const taskEl = this.parentNode;
	const taskId = Number(taskEl.dataset.id);

	taskEl.classList.add("fade-out");
	taskEl.addEventListener("transitionend", () => {
		taskEl.remove();

		const tasks = getTasksFromLocalStorage();
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		saveTasksToLocalStorage(updatedTasks);

		showAlert("task is deleted", colors.success);

		if (resultContainer.childElementCount === 0) {
			emptyBox.classList.remove("hidden");
		}
	});
}
