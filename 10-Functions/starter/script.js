'use strict';

// const bookings = [];
// function createBooking(flightNum, numPassengers = 1, price = 199 * numPassengers) {

//     const booking = {
//         flightNum,
//         numPassengers,
//         price
//     }
//     console.log(booking);
//     bookings.push(booking);
// }

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 5);

// const flight = 'LH234';
// const fock = {
//     name : 'fock space',
//     passport : 12345678
// }

// const checkIn = function(flightNum, passenger) {
//     flightNum = 'LH999';
//     passenger.name = 'Mr. ' + passenger.name;

//     if(passenger.passport === 12345678) {
//         alert('Check in');
//     } else {
//         alert('Wrong passport!');
//     }
// }
// checkIn(flight, fock)
// console.log(flight);
// console.log(fock);

// const flightNum = flight;
// const passenger = fock;

// function newPassport(person) {
//     person.passport = Math.trunc(Math.random() * 1e8);
// }
// newPassport(fock);
// checkIn(flight, fock);
// console.log(flight);
// console.log(fock);

// function oneWord(str) {
//   return str.replace(/ /g, '').toLowerCase();
// }

// function upperFirstWord(str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// }

// function transformer(str, fn) {
//   return fn(str);
// }

// function hi() {
//     console.log('hi!');
// }
// document.body.addEventListener('click', hi);

// let transWord = transformer('JavaScript is the best!', upperFirstWord);
// console.log(transWord);
// transWord = transformer('JavaScript is the best!', oneWord);
// console.log(transWord);

// ['jonas', 'Martha', 'Adam'].forEach(hi);

// const greet = greeting => {
//     return name => {
//         console.log(`${greeting} ${name}`);
//     }
// }

// function greet(greeting) {
//     return function(name) {
//         console.log(`${greeting} ${name}`);
//     }
// }
// const greeterHey = greet('Hey');
// greeterHey('fock');
// greeterHey('space');

// greet('Hello')('Jonas');

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };
// // lufthansa.book(239, 'fock space');
// // lufthansa.book(635, 'fock');
// // console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };
// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// const book = lufthansa.book;
// book(23, 'Sarah Williams');
// book.call(eurowings, 23, 'fock space');
// console.log(eurowings);

// book.call(lufthansa, 239, 'fuji');
// console.log(lufthansa);

// book.call(swiss, 583, 'Mary');
// console.log(swiss);

// const flightData = [583, 'fock space'];
// book.apply(swiss, flightData);
// book.call(swiss, ...flightData);

// bind method
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);
// bookEW(23, 'fock space');

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('fock space');

// With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// // console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));

// coding challenge #1
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section!
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const num = Number(prompt('What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)'));
//     if (num === 0 || num === 1 || num === 2 || num === 3) this.answers[num]++;
//     else console.log('not a valid number');
//     this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') console.log(this.answers);
//     else if (type === 'string') console.log(`Poll results are ${this.answers}`);
//     else console.log('wrong type');
//   },
// };
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({answers : [1,5,3,9,6]});

// const runOnce = function() {
//   console.log('This will never run again');
// };
// runOnce();

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    function color(color) {
        header.style.color = 'blue';   
    }
    document.querySelector('body').addEventListener('click', color);
    })();
