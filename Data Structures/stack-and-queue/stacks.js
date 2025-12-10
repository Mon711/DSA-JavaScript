class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    if (!this.isEmpty()) {
      return "Last Element: " + this.top.value;
    } else {
      console.log("Stack is Empty!");
      return undefined;
    }
  }

  push(value) {
    // Stack is more efficient if pointers start from top:
    /*
     10 <-- this.top
      ↓
      7
      ↓
      13
      ↓
      99 <- this.bottom
    */

    let newNode = new Node(value);

    if (this.isEmpty()) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top; // New node points to the old top
      this.top = newNode; // New node becomes the new top
    }

    this.length++;
    return this;
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Stack is Empty!");
      return undefined;
    }

    // If it's the last item, reset bottom as well
    if (this.top === this.bottom) {
      this.bottom = null;
    }

    const removedNode = this.top;
    this.top = this.top.next; // Move top to the next node
    this.length--;

    return "Removed Node: " + removedNode.value;
  }

  isEmpty() {
    if (this.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  viewStack() {
    if (this.isEmpty()) {
      console.log("Stack is Empty!");
      return undefined;
    }

    let currentNode = this.bottom;
    const arr = [];

    while (currentNode !== null) {
      arr.push(currentNode.value);

      currentNode = currentNode.next;
    }

    return "Stack: " + arr.join(" -> ");
  }
}

const myStack = new Stack();

myStack.push(10).push(99).push(22);
console.log(myStack.viewStack());
console.log(myStack.peek());

console.log(myStack.pop());
console.log(myStack.viewStack());
console.log(myStack.peek());
