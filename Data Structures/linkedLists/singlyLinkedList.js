class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
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

    // If list is empty
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  prepend(value) {
    const newNode = new Node(value);

    // If list is empty
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  insert(index, value){
    // If index is out of bounds, just append to the end.
    if (index >= this.length) {
      return this.append(value);
    }

    // If index is at the beginning, prepend.
    if (index <= 0) {
      return this.prepend(value);
    }

    // If we are here, it means we are inserting in the middle.
    const newNode = new Node(value);
    let leader = this.head;
    let i = 0;

    // Traverse to the node *before* the insertion point
    while(i < index - 1){
      leader = leader.next;
      i++;
    }

    // Insert the new node
    const holdingPointer = leader.next;
    leader.next = newNode;
    newNode.next = holdingPointer;

    this.length++;
    return this;
  }

  remove(index){
    // Check for invalid index (out of bounds) or empty list
    if (index < 0 || index >= this.length) {
      console.log(`Invalid index: ${index}. Nothing removed.`);
      return; // Or return null/undefined
    }

    // Handle removal of the head (index 0)
    if (index === 0) {
      const removedNode = this.head;
      this.head = this.head.next;
      this.length--;
      // If the list is now empty, update the tail as well
      if (this.length === 0) {
        this.tail = null;
      }
      return removedNode;
    }

    // Handle removal of a middle or tail node
    // Traverse to the node *before* the one to be removed
    let leader = this.head;
    for (let i = 0; i < index - 1; i++) {
      leader = leader.next;
    }

    const removedNode = leader.next;
    leader.next = removedNode.next;
    this.length--;

    // If we removed the tail, update the tail pointer
    if (leader.next === null) {
      this.tail = leader;
    }

    return removedNode;
  }

  reverse(){
    if(this.length === 1){
      return this.head;
    }

    let first = this.head;
    this.tail = this.head;
    let second = first.next;

    while(second){
      const temp = second.next;
      second.next = first;
      first = second;
      second = temp;
    }

    this.head.next = null;
    this.head = first;

    return this.viewList();
  }

  viewList() {
    if (this.length === 0) {
      console.log("Empty List!");
      return;
    }

    let currentNode = this.head;
    const arr = [];

    while (currentNode !== null) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    const output = arr.join(" ➞ ");
    console.log(output);
  }
}

let sll = new LinkedList();
sll.append(12).append(1).append(99).append(17).append(4).append(2);
sll.reverse();
// sll.viewList();
