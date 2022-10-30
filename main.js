'use strict';

let library = [];

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

library.forEach((book) => {
	book.hello();
});

displayBooks();