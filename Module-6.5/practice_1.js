//2 no solution

let n = parseInt(readlineSync.question("enter any number: "));
if (n % 2 === 0) {
  console.log("Odd Number");
} else {
  console.log("Even Number");
}

//3 no solution
let arr = [
  7, 14, 3, 19, 11, 2, 16, 8, 20, 5, 13, 1, 17, 9, 4, 12, 18, 6, 15, 10,
];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

console.log(arr);

//4 no solution

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

let year = parseInt(readlineSync.question("Enter a year: "));

if (isLeapYear(year)) {
  console.log(`${year} is a leap year`);
} else {
  console.log(`${year} is not a leap year`);
}

//5 no solution
let arr2 = [
  42, 17, 31, 8, 25, 46, 3, 29, 14, 38, 21, 50, 12, 33, 6, 27, 44, 19, 36, 10,
  48, 23, 4, 30, 15, 41, 9, 34, 20, 47, 2, 26, 11, 39, 16, 45, 7, 32, 18, 49,
  24, 5, 35, 13, 40, 22, 1, 28, 43, 37,
];

for (let num of arr2) {
  if (num % 3 === 0 && num % 5 === 0) {
    console.log(num);
  }
}

//6 no solution
let friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
let maxLength = friends[0].length;
let longName = friends[0];

for (let friend of friends) {
  if (friend.length > maxLength) {
    longName = friend;
    maxLength = friend.length;
  }
}

console.log(longName);

// 7 answer

let numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
let found;
let uniqueNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  found = false;
  for (let j = 0; j < uniqueNumbers.length; j++) {
    if (numbers[i] === uniqueNumbers[j]) {
      found = true;
      break;
    }
  }
  if (!found) {
    uniqueNumbers.push(numbers[i]);
  }
}

console.log(uniqueNumbers);

// 8 no answer
let maxNum = numbers[0];

for (let num of numbers) {
  if (num > maxNum) {
    maxNum = num;
  }
}
console.log(maxNum);

//last answer

let input = readlineSync.question();
let payments = input.trim().split(" ").map(Number);
let cost = parseInt(readlineSync.question());

if (payments.some(isNaN) || payments.length === 0 || isNaN(cost)) {
  console.log("invalid input");
} else {
  let total = 0;
  for (let i = 0; i < payments.length; i++) {
    total += payments[i];
  }

  let saving = total - cost;

  if (saving < 0) {
    console.log("earn more");
  } else {
    console.log(saving);
  }
}
