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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

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

function calDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} €`;
}

function calDisplaySummary(account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * account.interestRate)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

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
  .reduce((acc, mov) => acc + mov, 0);

function updateUI(acc) {
  // Display UI and welcome message
  labelWelcome.textContent = `Welcome back, ${acc.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calDisplayBalance(acc);
  // Display summary
  calDisplaySummary(acc);
}

// Login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  let prevAccount = currentAccount;
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  currentAccount = currentAccount ? currentAccount : prevAccount;
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    //update UI
    updateUI(currentAccount);
  } else alert('incorrect username or password');

  //clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  //update UI
  updateUI(currentAccount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  currentAccount = undefined;
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  } else {
    alert('too much!');
  }
  inputLoanAmount.value = '';
});

let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sort = !sort;
  displayMovements(currentAccount.movements, sort);
});

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});

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

//////////////////////// coding chllanges #3
// const dogs = [5, 2, 4, 1, 15, 8, 3];
// function calcAverageHumanAge2(ages) {
//   const age = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return age
// }
// console.log(calcAverageHumanAge2(dogs));

//////////////////////// coding chllanges #4
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// //1
// dogs.forEach(dog => (dog.stdFood = dog.weight ** 0.75 * 28));

// //2
// // console.log(dogs);
// // const Sarah_dog = dogs.find(el => el.owners.includes('Sarah'));
// const compare = (food, std) => food >= std * 0.9 && food <= std * 1.1;

// //3
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.stdFood)
//   .flatMap(dog => dog.owners);
// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.stdFood)
//   .flatMap(dog => dog.owners);

// //4
// const MuchString = ownersEatTooMuch.join(' and ') + "'s dogs eat too much!";
// const littleString =
//   ownersEatTooLittle.join(' and ') + "'s dogs eat too little!";
// console.log(MuchString);
// console.log(littleString);

// //5
// console.log(dogs.some(dog => dog.curFood === dog.stdFood));
// //6
// console.log(dogs.some(dog => compare(dog.curFood, dog.stdFood)));
// //7
// const Okay = dogs.filter(dog => compare(dog.curFood, dog.stdFood));
// console.log(Okay);

// //8
// const dogCopy = dogs.slice().sort((a, b) => a.stdFood - b.stdFood);

