'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

function createUserName(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
}

// const user = 'Steven Thomas Williams';
// const username = createUserName(user);
// console.log(username);
createUserName(accounts);
// console.log(accounts);

// console.log(containerMovements.innerHTML);

function calDisplayBalance(movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance} €`;
}
calDisplayBalance(account1.movements);

function calDisplaySummary(movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * 1.2e-2)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}
calDisplaySummary(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const eurToUsd = 1.1;
// const movementsUSD = movements.map(function(mov) {
//   return (mov * eurToUsd).toFixed(2);
// })
const movementsUSD = movements.map(mov => (mov * eurToUsd).toFixed(2));
// console.log(movements);
// console.log(movementsUSD);

// const movements_USD = [];
// for (const mov of movements) movements_USD.push(mov * eurToUsd);
// console.log(movements_USD);

const movementsDecriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
// console.log(movementsDecriptions);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// console.log(movements);
// console.log(deposits);

const withdrawal = movements.filter(mov => mov < 0);
// console.log(withdrawal);

// accumulator -> snowball
const balance = movements.reduce(function (acc, cur, i) {
  return acc + cur;
}, 0);
// console.log(balance);

// Maximum Value
// console.log(movements);
const max_mov = movements.reduce(
  (acc, cur) => (acc = Math.max(acc, cur)),
  movements[0]
);
// console.log(max_mov);

// console.log(movements);
// PIPELINE
const totalUSD = movements
  .filter(mov => mov < 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalUSD);

//////////////////////// coding chllanges #1
// function checkDogs(dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   // for (let i = 0; i < dogs.length; i++) {
//   //   if (dogs[i] < 3) console.log(`Dog number ${i + 1} is still a puppy `);
//   //   else
//   //     console.log(`Dog number ${i + 1}
//   //   is an adult, and is ${dogs[i]} years old`);
//   // }
//   dogs.forEach(function(dog, i) {
//     if (dog < 3) console.log(`Dog number ${i + 1} is still a puppy `);
//     else
//       console.log(`Dog number ${i + 1}
//     is an adult, and is ${dog} years old`);
//   })
// }

// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];
// checkDogs(Julia, Kate);

//////////////////////// coding chllanges #2
// const dogs = [5, 2, 4, 1, 15, 8, 3];
// function calcAverageHumanAge(ages) {
//   let humanAge = ages.map(age => age = (age <= 2 ? 2 * age : 16 + age * 4));
//   humanAge = humanAge.filter(age => age > 18);
//   console.log(humanAge);
//   let totalAge = humanAge.reduce((acc, age) => acc + age);
//   return totalAge / humanAge.length;
// }
// calcAverageHumanAge(dogs);
