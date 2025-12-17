// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

// ==========================================
// APPROACH 1: Naive Recursion
// Time Complexity: O(2^n) - Exponential (Very Slow)
// ==========================================

let recursiveCallCount = 0;

function fibonacciRecursive(n) {
  recursiveCallCount++;
  
  // Base case: return n if it is 0 or 1
  if (n < 2) {
    return n;
  }
  
  // Recursive step: sum of the previous two numbers
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// ==========================================
// APPROACH 2: Memoization (Top-Down Dynamic Programming)
// Time Complexity: O(n) - Linear (Fast)
// ==========================================

let memoizedCallCount = 0;

function createFibonacciMemoized() {
  // The 'cache' (or memo) stores results of expensive function calls.
  // We use a closure here so 'cache' persists across calls.
  let cache = {};

  return function fib(n) {
    memoizedCallCount++;

    // 1. Check Cache: If we have calculated this before, return it immediately.
    if (n in cache) {
      return cache[n];
    } 
    
    // 2. Base Case: If n is 0 or 1, store and return it.
    if (n < 2) {
      return n;
    }

    // 3. Calculation: Compute the value and store it in the cache for future use.
    cache[n] = fib(n - 1) + fib(n - 2);
    
    return cache[n];
  };
}

// ==========================================
// EXECUTION & COMPARISON
// ==========================================

const indexToFind = 29;

console.log(`--- Calculating Fibonacci(${indexToFind}) ---`);

// Run Naive Approach
const resultNaive = fibonacciRecursive(indexToFind);
console.log(`Recursive Result: ${resultNaive}`);
console.log(`Recursive Calls:  ${recursiveCallCount.toLocaleString()}`);

console.log("- - - - - - - - - -");

// Run Memoized Approach
const fibonacciMaster = createFibonacciMemoized();
const resultMemoized = fibonacciMaster(indexToFind);
console.log(`Memoized Result:  ${resultMemoized}`);
console.log(`Memoized Calls:   ${memoizedCallCount.toLocaleString()}`);