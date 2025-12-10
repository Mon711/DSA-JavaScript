// Write two functions that finds the factorial of any number. One should use recursive, the other should just use a for loop

function findFactorialRecursive(number) {
   // Handle edge cases: Factorial is not defined for negative numbers.
  // Factorial of 0 is 1. Factorial of 1 is 1.
  if (number < 0) {
    return undefined;
  }
  
  if (number === 0 || number === 1){
    return 1
  }

  return number * findFactorialRecursive(number - 1);
}

function findFactorialIterative(number) {
  if (number < 0) {
    return undefined;
  }

  if(number === 0 || number === 1){
    return 1;
  }

  let result = 1;
  for(let i = number; i > 0; i--){
    result *= i;
  }

  return result;
}

console.log(findFactorialRecursive(12));
console.log(findFactorialIterative(7));
