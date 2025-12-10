const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let index = i;
    let j = i - 1;

    while (array[index] < array[j] && j >= 0) {
      [array[j], array[index]] = [array[index], array[j]];
      index--;
      j--;
    }
  }

  return array;
}

console.log(insertionSort(numbers));