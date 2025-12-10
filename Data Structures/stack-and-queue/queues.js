class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return undefined;
    }
    return "First in line: " + this.first.value;
  }

  enqueue(value) {
    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.length++;
    return this;
  }

  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return undefined;
    }

    if (this.length === 1) {
      const removedNode = this.first;
      this.first = null;
      this.last = null;
      this.length--;

      return "Removed element: " + removedNode.value;
    }

    // If length more than 1
    const removedNode = this.first;
    this.first = removedNode.next;
    this.length--;

    return "Element removed from line: " + removedNode.value;
  }

  isEmpty() {
    return this.length === 0;
  }

  viewQueue() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return undefined;
    }
    let arr = [];
    let currentNode = this.first;

    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr.join(" --> ");
  }
}

const myQueue = new Queue();
myQueue.enqueue("Joy").enqueue("Matt").enqueue("Pavel").enqueue("Samir");

console.log(myQueue.viewQueue());
console.log(myQueue.peek());

console.log(myQueue.dequeue());
console.log(myQueue.viewQueue());
console.log(myQueue.peek());

//Joy
//Matt
//Pavel
//Samir