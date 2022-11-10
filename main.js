'use strict';

let library = [];
const body = document.querySelector("body");
const addBookBtn = document.querySelector(".addBook");
const removeAllBtn = document.querySelector(".removeAll");

function Book(author, title, pages, read) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.read = read;
}

Book.prototype.hello = function () {
	console.log(`Hi! I was written by ${this.author}, my title is ${this.title} and I have a total of ${this.pages} pages. It is ${this.read} that you read me yet.`);
};

Book.prototype.edit = function (author, title, pages, read, origin) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.read = read;
	let props = Array.from(origin.childNodes);
	props[0].textContent = author.value;
	props[1].textContent = title.value;
	props[2].textContent = pages.value;
	props[3].textContent = read.value;
};

function addBook(author, title, pages, read) {
	let book = new Book(author, title, pages, read);
	library.push(book);
}

function displayBooks() {
	const books = document.querySelectorAll(".card");
	books.forEach((book) => {
		book.remove();
	});
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

function createForm(origin) {
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
	}

	let submitBtn = document.createElement("button");
	submitBtn["type"] = "submit";
	submitBtn.textContent = "Submit";
	submitBtn.addEventListener("click", (event) => {
		event.preventDefault();
		const author = document.querySelector("#author");
		const textPattern = /^[a-z0-9\s]+$/i;
		const title = document.querySelector("#title");
		const pages = document.querySelector("#pages");
		const numPattern = /^[0-9]+$/;
		const read = document.querySelector("#read");
		const readPattern = /^[true|false]+$/;
		if (textPattern.test(author.value) && textPattern.test(title.value) && numPattern.test(pages.value) && readPattern.test(read.value)) {
			if (origin === "newBook") {
				addBook(author.value, title.value, pages.value, read.value);
				displayBooks();
			}
			else {
				const books = Array.from(document.querySelectorAll(".card"));
				let book = library[books.indexOf(origin)];
				book.edit(author.value, title.value, pages.value, read.value, origin);
			}
			formBackground.remove();
		}
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
}

addBookBtn.addEventListener("click", () => {
	createForm("newBook");
});

removeAllBtn.addEventListener("click", () => {
	library = [];
	displayBooks();
});

for (let i = 1; i < 51; i++) {
	addBook(`testauthor${i}`, `testtitle${i}`, "611", true);
}

displayBooks();