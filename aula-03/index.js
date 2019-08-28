const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmmiter = new MyEmitter();

const nameEvent = "user:click";

myEmmiter.on(nameEvent, function(click) {
  console.log("Um user Clicou", click);
});

// myEmmiter.emit(nameEvent, "Barra de Rolagem");

// let count = 0;
// setInterval(() => {
//   myEmmiter.emit(nameEvent, "Clicou no OK" + count++);
// }, 1000);

const stdin = process.openStdin();

stdin.addListener("data", function(value) {
  console.log(`você digitou ${value.toString().trim()}`);
});

// function main() {
//   return new Promise(function(resolve, reject) {
//     stdin.addListener("data", function(value) {
//       //   console.log(`você digitou ${value.toString().trim()}`);
//       return resolve(value);
//     });
//   });
// }

//mostrando que promises s´ø executam uma única vez
main().then(function(result) {
  console.log(result.toString());
});
