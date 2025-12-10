// const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

// const middle = Math.round(numbers.length / 2);

// let left = numbers.slice(0, middle);
// let right = numbers.slice(middle);

// console.log(left);
// console.log(right);

let numbers = [1, 2, 3, 4, 5]
let newArr = [];

newArr.push(...numbers.slice(2))
console.log(newArr);
