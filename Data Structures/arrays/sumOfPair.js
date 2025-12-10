// If a pair of numbers in an array add up to a sum, return True, else False

// const { createElement } = require("react");

// Can assume input is array
// Elements are ordered
// Repeating elements are possible
// Same element cannot be added to itself
// Always integers
// Negative numbers can be there
// Just return true or false

// Method 1: Brute Force, Time Complexity = O(n^2)
function sumPair1(array, sum) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        // console.log(array[i], array[j], array[i] + array[j])
        if (array[i] + array[j] === sum) {
          return true;
        }
      }
    }
  }

  return false;
}
// console.log(sumPair1(arr2, 8));

// Method 2: Complement & Binary Search, Time Complexity = O(n*log(n))

function sumPair2(array, sum){
  // assuming sorted array
  for(let i=0; i < array.length; i++){
    const currentElement = array[i];
    const complement = sum - currentElement;

    let low_pointer = 0;
    let high_pointer = array.length - 1;

    while (low_pointer <= high_pointer){
      let middle_pointer = Math.floor((low_pointer + high_pointer) / 2);

      let middle_value = array[middle_pointer];

      if(middle_value === complement && middle_pointer !== i){
        return true;
      } else if (middle_value < complement) {
        low_pointer = middle_pointer + 1;
      }else{
        high_pointer = middle_pointer - 1;
      }

    }

  }
  return false;
}

// console.log(sumPair2(arr1, 8));
// console.log(sumPair2(arr2, 18));


// Method 3: Sum of high and low pairs, Time Complexity = O(n)
function sumPair3(array, sum){
  let lowPointer = 0;
  let highPointer = array.length - 1;

  while(lowPointer < highPointer){
    let total = array[lowPointer] + array[highPointer]

    if(total === sum){
      return true;
    }else if(total < sum ){
      lowPointer++;
    }else{
      highPointer--;
    }
  }

  return false;

}
let arr1 = [1, 2, 3, 4];
let arr2 = [9, 10, 13, 15];
// console.log(sumPair3(arr1, 9));
// console.log(sumPair3(arr2, 22));


// Method 5: Unsorted Array, O(n) time, O(n) space
function sumPair4(array, sum){
  const mySet = new Set();

  for(let i = 0;i < array.length;i++){
    let complement = sum - array[i];

    if(mySet.has(complement)){
      return true;
    }

    mySet.add(array[i]);
    console.log(mySet);
    
  }

  return false;
}

let arr3 = [4, 2, 9, 1]
console.log(sumPair4(arr3, 6));









