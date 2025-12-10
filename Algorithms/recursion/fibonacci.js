// Given a number N return the value of the Fibonacci sequence at that index value, where the sequence is:

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...
// the pattern of the sequence is that each value is the sum of the 2 previous values, that means that for N=5 → 2+3

//For example: fibonacciRecursive(6) should return 8

function fibonacciIterative(n) {
  let a = 0;
  let b = 1;
  let sum = 0;

  if (n === 1) {
    return n;
  }

  for (let i = 2; i <= n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }

  return sum;
}

function fibonacciRecursive(n) {
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// console.log(fibonacciIterative(9));
console.log(fibonacciRecursive(15));

