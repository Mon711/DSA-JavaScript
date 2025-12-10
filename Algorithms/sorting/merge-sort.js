const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
const numbers2 = [99, 44, 6, 2, 2, 5, 4, 87, 99, 4, 0];

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }
  // Split Array in into right and left
  const middle = Math.floor(array.length / 2);

  let left = array.slice(0, middle);
  let right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const newArr = [];
  let i = 0;
  let j = 0;

  // 1. Main comparison loop
  // Keep comparing elements as long as *both*
  // arrays still have elements.
  while (i < left.length && j < right.length) {
    // By using <=, we handle duplicates automatically.
    if (left[i] <= right[j]) {
      newArr.push(left[i]);
      i++;
    } else {
      newArr.push(right[j]);
      j++;
    }
  }
  // 2. Cleanup logic
  // The while loop above has finished, which means
  // one of the arrays is now empty (i.e., i === left.length OR j === right.length).
  // We just need to add the remaining elements from the *other* array.

  // Using .slice() is a very clean way to do this.
  // If `i` is already at the end, `left.slice(i)` returns an empty array.
  // The same goes for `right.slice(j)`.
  // Only one of these will actually have elements.
  return [...newArr, ...left.slice(i), ...right.slice(j)];
}

const answer = mergeSort(numbers);
console.log(answer);
