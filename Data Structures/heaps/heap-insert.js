// Whats a Heap?
// Its a complete binary tree,
// but we never store it as a tree.
// We store it as a level-order array.

// Formula
// For a node at index i:
// Left child: index 2i + 1
// Right child: index 2i + 2
// Parent: index floor((i − 1)/2)

// Why?
// This is what allows heaps to be so fast.

class MaxHeap {
  constructor() {
    this.data = [];
  }

  insert(newItem) {
    this.data.push(newItem);
    let newItemPos = this.data.length - 1;

    while (newItemPos > 0) {
      let parentPos = Math.floor((newItemPos - 1) / 2);

      if (this.data[parentPos] < this.data[newItemPos]) {
        this.swap(newItemPos, parentPos);
        newItemPos = parentPos;
      } else {
        break;
      }
    }

    return this;
  }

  remove() {
  if (this.data.length === 0) {
    console.log("Heap is empty!");
    return;
  }

  // If there is only one element, just pop and return it.
  if (this.data.length === 1) {
    return this.data.pop();
  }

  const removed = this.data[0];

  // Move last element to root and shrink array
  this.data[0] = this.data[this.data.length - 1];
  this.data.pop();

  let i = 0;

  while (true) {
    const leftChildPos = 2 * i + 1;
    const rightChildPos = 2 * i + 2;

    // Assume current node is largest
    let largestPos = i;

    // If left child exists and is bigger than current
    if (
      leftChildPos < this.data.length &&
      this.data[leftChildPos] > this.data[largestPos]
    ) {
      largestPos = leftChildPos;
    }

    // If right child exists and is bigger than current largest
    if (
      rightChildPos < this.data.length &&
      this.data[rightChildPos] > this.data[largestPos]
    ) {
      largestPos = rightChildPos;
    }

    // If current node is already the largest, heap property is fixed
    if (largestPos === i) {
      break;
    }

    // Otherwise, swap with the larger child and continue sifting down
    this.swap(i, largestPos);
    i = largestPos;
  }

  return removed;
}


  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  view() {
    if (this.data.length === 0) {
      console.log("Heap is empty!");
    }

    return this.data;
  }
}

const myHeap = new MaxHeap();
myHeap
  .insert(10)
  .insert(8)
  .insert(27)
  .insert(67)
  .insert(7)
  .insert(49)
  .insert(1)
  .insert(100)
  .insert(11)
  .insert(17);
console.log(myHeap.view());
console.log(myHeap.remove());
console.log(myHeap.view());
