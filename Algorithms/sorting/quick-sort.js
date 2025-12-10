const numbers = [8, 3, 2, 7, 0, 10, 1];
// [0, 3, 2, 7, 8, 10, 1]
// [0, 1, 2, 7, 8, 10, 3]

function quickSort(array, left, right) {
  // 1. Base Case: If the list has 1 or 0 elements, it's sorted.
  if (left >= right) {
    return;
  }

  // 2. Pick a pivot (we'll use the element at the 'right' index)
  const pivot = array[right];

  // 3. Partition the array and get the Pivot's final correct index
  const partitionIndex = partition(array, pivot, left, right);

  // 4. Recursively sort the left side and the right side
  quickSort(array, left, partitionIndex - 1);
  quickSort(array, partitionIndex + 1, right);
}

function partition(array, pivot, left, right) {
  // 'partitionIndex' acts as a "Wall". 
  // Everything to the left of the Wall is smaller than the pivot.
  // Everything to the right of the Wall is larger.
  let partitionIndex = left; 
  
  for (let i = left; i < right; i++) {
    // If the current element is smaller than the pivot...
    if (array[i] < pivot) {
      // Swap it behind the "Wall" (with the element at partitionIndex)
      swap(array, i, partitionIndex);
      // Move the Wall one step to the right
      partitionIndex++;
    }
  }
  
  // Finally, swap the pivot (which is at 'right') to its correct spot (the Wall)
  swap(array, right, partitionIndex);
  
  // Return the spot where the pivot landed
  return partitionIndex;
}

function swap(array, firstIndex, secondIndex) {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

// Select first and last index
quickSort(numbers, 0, numbers.length - 1);
console.log(numbers);