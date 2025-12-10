export default class Stack {
  constructor(initialArray = []) {
    this.array = initialArray;
  }

  peek() {
    if (this.isEmpty()) {
      console.log("Stack is Empty!");
      return undefined;
    }
    return "Topmost Element: " + this.array[this.array.length - 1];
  }

  push(value) {
    this.array.push(value);
    return this; // Return `this` to allow chaining like myStack.push(1).push(2)
  }

  // Removes the top node from the stack
  pop() {
    if (this.isEmpty()) {
      console.log("Stack is Empty!");
      return undefined;
    }
    const removedElement = this.array.pop();
    return "Removed Element: " + removedElement;
  }

  isEmpty() {
    return this.array.length === 0;
  }

  viewStack() {
    if (this.isEmpty()) {
      console.log("Stack is Empty!");
      return undefined;
    }

    // Return a reversed copy of the array to display from top to bottom
    const reversedArray = this.array.slice().reverse();

    return "Stack: " + reversedArray.join(" -> ");
  }
}

// --- Test 1 ----
// const myStack = new Stack();

// myStack.push(10).push(99).push(22); // top to bottom
// console.log(myStack.viewStack()); // Output: Stack (Top to Bottom): 22 -> 99 -> 10
// console.log(myStack.peek()); // Output: Top Element: 22

// console.log(myStack.pop()); // Output: Removed Node: 22
// console.log(myStack.viewStack()); // Output: Stack (Top to Bottom): 99 -> 10
// console.log(myStack.peek()); // Output: Top Element: 99

// --- Test 2 ----
// const myStack = new Stack([4]);
// console.log(myStack.viewStack());
// console.log(myStack.pop());

// console.log(myStack.viewStack());

// myStack.push(4).push(7);
// console.log(myStack.viewStack());
// console.log(myStack.peek());
