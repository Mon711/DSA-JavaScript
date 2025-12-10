// Formula
// For a node at index i:
// Left child: index 2i + 1
// Right child: index 2i + 2
// Parent: index floor((i − 1)/2)

function buildMaxHeap(array) {
  // Start from the last parent node and work backwards to the root.
  // We don't need to check leaf nodes because they have no children.
  const lastParentIndex = Math.floor(array.length / 2) - 1;

  for (let i = lastParentIndex; i >= 0; i--) {
    heapify(array, array.length, i);
  }

  return array;
}

function heapify(array, length, i) {
  let largestPos = i; // Initialize largest as root
  const leftChildPos = 2 * i + 1;
  const rightChildPos = 2 * i + 2;

  // 1. Compare Left Child with Parent
  if (leftChildPos < length && array[leftChildPos] > array[largestPos]) {
    largestPos = leftChildPos;
  }

  // 2. Compare Right Child with the CURRENT largest (could be Parent or Left)
  if (rightChildPos < length && array[rightChildPos] > array[largestPos]) {
    largestPos = rightChildPos;
  }

  // 3. If the parent is not the largest, swap and CONTINUE sifting down
  if (largestPos !== i) {
    swap(array, i, largestPos);

    // RECURSION
    // We now check the position we just swapped into to see if we need to go deeper.
    heapify(array, length, largestPos);
  }
}

function heapSort(array){
  // 1. Build the max heap initially (Get the biggest guy to the top)
  buildMaxHeap(array);

  // 2. Iterate backwards from the end of the array down to 1
  // 'i' represents the current position of our "Invisible Wall"
  for (let i = array.length - 1; i > 0; i--) {
    // Step A: Swap the Root (largest) with the element at the Wall (i)
    swap(array, 0, i);

    // Step B: The element at 'i' is now sorted! 
    // The heap size is now reduced to 'i'.
    // We only need to fix the Root (index 0) because we just put a small number there.
    
    // Notice: We pass 'i' as the length. This tells heapify to IGNORE
    // everything after index 'i'.
    heapify(array, i, 0)
    
  }
  return array;
}

function swap(array, index1, index2) {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}

const arr1 = [10, 17, 9, 42, 11, 2];
console.log("Original:", [10, 17, 9, 42, 11, 2]);
console.log("Sorted:", heapSort(arr1));