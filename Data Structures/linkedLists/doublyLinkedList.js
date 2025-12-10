class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(value = null) {
    // Allow empty list by default
    if (value !== null) {
      this.head = new Node(value);
      this.tail = this.head;
      this.length = 1;
    } else {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  }

  append(value) {
    const newNode = new Node(value);

    // Node constructor already initializes next and prev to null
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.length++;
    }

    return this; // Support method chaining
  }

  prepend(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
      this.length = 1;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }

    return this;
  }

  insert(index, value) {
    // If index is out of bounds for appending, just append.
    if (index <= 0) {
      this.prepend(value);
      return this; // Add return to exit the function
    }

    // If index is at the beginning, just prepend.
    if (index >= this.length) {
      this.append(value);
      return this; // Add return to exit the function
    }

    // If we are here, it means we are inserting in the middle.
    // The previous checks already handled empty list, prepend, and append cases.
    const newNode = new Node(value);

    // Traverse only half the length of the index as we have access to
    // previous pointer also now so time complexity becomes O(n/2)
    if (index >= this.length / 2) {
      // Traverse from the tail
      let currentNode = this.tail;
      let i = this.length - 1;

      // Note: We traverse to index - 1 to get the node BEFORE the insertion point
      while (i > index - 1) {
        currentNode = currentNode.prev;
        i--;
      }

      newNode.next = currentNode.next;
      currentNode.next.prev = newNode;
      currentNode.next = newNode;
      newNode.prev = currentNode;

      this.length++;
    } else {
      // Traverse from the head
      let currentNode = this.head;
      let i = 0;

      // We traverse to index - 1 to get the node BEFORE the insertion point
      while (i < index - 1) {
        currentNode = currentNode.next;
        i++;
      }

      newNode.next = currentNode.next;
      currentNode.next.prev = newNode;
      newNode.prev = currentNode;
      currentNode.next = newNode;

      this.length++;
    }

    return this;
  }

  remove(index) {
    // Nothing to remove if list is empty
    if (this.length === 0) {
      console.log("List is empty, nothing to remove!");
      return;
    }

    // Remove the first element if index is <= 0
    if (index <= 0) {
      let removed = this.head;

      removed.next.prev = null;
      this.head = removed.next;

      this.length --;
      return removed.value;
    }

    // Remove the last element if index is >= length - 1
    if (index >= this.length - 1) {
      let removed = this.tail;

      removed.prev.next = null;
      this.tail = removed.prev;

      this.length --;
      return removed.value;
    }

    // Remove middle element
    // If index is in second half of list, start from tail
    if (index > this.length / 2 - 1) {
      let currentNode = this.tail;
      let i = this.length - 1;

      while (i > index) {
        currentNode = currentNode.prev;
        i--;
      }

      let removed = currentNode;

      removed.prev.next = removed.next;
      removed.next.prev = removed.prev;

      this.length --;
      return removed.value;
    }
    // If index is in first half of list, start from head
    else {
      let currentNode = this.head;
      let i = 0;

      while(i < index){
        currentNode = currentNode.next;
        i++;
      }

      let removed = currentNode;

      removed.prev.next = removed.next;
      removed.next.prev = removed.prev;

      this.length --;
      return removed.value;
    }
  }

  viewList() {
    if (this.length === 0) {
      console.log("List is Empty");
      return;
    }

    const arr = [];
    let node = this.head;
    while (node !== null) {
      arr.push(node.value);
      node = node.next;
    }

    const output = arr.join(" ⇆ ");
    console.log(output);
  }
}

let dll = new DoublyLinkedList(); // Empty list
dll.prepend(1);
dll.append(10);
dll.append(15).append(99).prepend(2).prepend(12).append(50);
// dll.viewList(); // Output: "12 ⇆ 2 ⇆ 1 ⇆ 10 ⇆ 15 ⇆ 99 ⇆ 50"

dll.insert(6, 9); //Output: 12 ⇆ 2 ⇆ 1 ⇆ 10 ⇆ 15 ⇆ 99 ⇆ 9 ⇆ 50

console.log(dll.remove(4));
dll.viewList();
