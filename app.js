function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${
      !this.title ? "read" : "not read yet"
    }`;
  };
}

theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());

let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};

nineteenEightyFour = new Book("1984", "George Orwell", 328, false);
toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
theGreatGatsby = new Book("The Great Gatsby", "F.Scott Fitzgerald", 180, false);
theGameOfThrones = new Book(
  "A Game of Thrones",
  "George R.R. Martin",
  807,
  true
);
gravitysRainbow = new Book("Gravity's Rainbow", "Thomas Pynchon", 784, false);
