function Person() {}

const p1 = new Person();
const p2 = new Person();

console.log(p1.__proto__ === Person.prototype);
console.log(Person === Person.prototype.constructor);
