'use strict';

let library = [];
const body = document.querySelector("body");
const addBookBtn = document.querySelector(".addBook");

function Book(author, title, pages, read) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.read = read;
}

Book.prototype.hello = function () {
	console.log(`Hi! I was written by ${this.author}, my title is ${this.title} and I have a total of ${this.pages} pages. It is ${this.read} that you read me yet.`);
};

function addBook(author, title, pages, read) {
	let book = new Book(author, title, pages, read);
	library.push(book);
}

function displayBooks() {
	library.forEach((book) => {
		let card = document.createElement("div");
		card.classList.add("card");
		let i = 0;
		for (const prop in book) {
			if (i < 4) {
				let row = document.createElement("div");
				row.textContent = `${prop}: ${book[prop]}`;
				card.appendChild(row);
				i++;
			}
		}
		const main = document.querySelector("main");
		main.appendChild(card);
	});
}

addBookBtn.addEventListener("click", () => {
	let formCont = document.createElement("div");
	formCont.classList.add("form");
	let formText = document.createElement("p");
	formText.textContent = "Add a book!";
	let form = document.createElement("form");
	let props = ["author", "title", "pages", "read"];

	for (let i = 0; i < props.length; i++) {
		let label = document.createElement("label");
		label["for"] = props[i];
		label.textContent = `${props[i]}`;
		form.appendChild(label);

		let input = document.createElement("input");
		input["id"] = props[i];
		input["name"] = props[i];
		input["type"] = "text";
		form.appendChild(input);

		console.log(label.for);
	}

	let submitBtn = document.createElement("button");
	submitBtn["type"] = "submit";
	submitBtn.textContent = "Submit";
	submitBtn.addEventListener("click", (event) => {
		const author = document.querySelector("#author");
		const title = document.querySelector("#title");
		const pages = document.querySelector("#pages");
		const read = document.querySelector("#read");
		addBook(author.value, title.value, pages.value, read.value);
		displayBooks();
		const formBackground = document.querySelector(".formBackground");
		formBackground.remove();
		event.preventDefault();
	});
	form.appendChild(submitBtn);

	formCont.appendChild(formText);
	formCont.appendChild(form);

	let formBackground = document.createElement("div");
	formBackground.classList.add("formBackground");
	formBackground.appendChild(form);
	formBackground.addEventListener("click", (event) => {
		const formBackground = document.querySelector(".formBackground");
		if (event.target == formBackground) formBackground.remove();
	});
	body.appendChild(formBackground);
});

for (let i = 0; i < 100; i++) {
	addBook("1", "2", 3, false);
}

displayBooks();