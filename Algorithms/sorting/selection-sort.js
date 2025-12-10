const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let smallest = array[i];
    let index = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < smallest) {
        smallest = array[j];
        index = j;
      }
    }

    // Swap the unsorted index with the miniumum value
    // from the remaining list
    [array[i], array[index]] = [array[index], array[i]];
  }

  return array;
}

console.log(selectionSort(numbers));
