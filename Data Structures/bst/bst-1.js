class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    // If the tree is empty, make the new node the root
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    // Loop forever until we find a spot
    while (true) {
      if (value <= currentNode.value) {
        // Go Left
        if (!currentNode.left) {
          // If there's no left child, place the new node here
          currentNode.left = newNode;
          return this; // Exit the loop and the function
        }

        // If there is a left child, move to it for the next iteration
        currentNode = currentNode.left;
      } else {
        // Go Right
        if (!currentNode.right) {
          // If there's no right child, place the new node here
          currentNode.right = newNode;
          return this;
        }
        // If there is a right child, move to it for the next iteration
        currentNode = currentNode.right;
      }
    }
  }

  lookup(value) {
    if (!this.root) {
      return false;
    }

    let currentNode = this.root;

    // Keep searching as long as we haven't fallen off the tree
    while (currentNode !== null) {
      if (value === currentNode.value) {
        // Found it!
        return true;
      } else if (value < currentNode.value) {
        // Go Left
        currentNode = currentNode.left;
      } else {
        // Go Right
        currentNode = currentNode.right;
      }
    }

    // If the loop finishes, it means we never found the value
    return false;
  }

  remove(value) {
    // if root doesn't exist, return null
    if (!this.root) {
      console.log("Tree is empty!");
      return null;
    }

    // Keep track of the node to remove and its parent node
    let parentNode = null;
    let currentNode = this.root;

    // 1. Find the node to remove and its parent
    while (currentNode && currentNode.value !== value) {
      parentNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    // If the node wasn't found, return null
    if (!currentNode) {
      console.log(`Node with value ${value} not found.`);
      return null;
    }

    // === CASE 1: Node has NO children (it's a leaf) ===
    if (!currentNode.left && !currentNode.right) {
      // If the node to remove is the root and has no children
      if (!parentNode) {
        this.root = null;
      } else if (currentNode === parentNode.left) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }

    // === CASE 2: Node has ONE child ===
    // It has a right child but no left child
    else if (!currentNode.left) {
      // If the node to remove is the root
      if (!parentNode) {
        this.root = currentNode.right;
      } else if (currentNode === parentNode.left) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    }
    // It has a left child but no right child
    else if (!currentNode.right) {
      // If the node to remove is the root
      if (!parentNode) {
        this.root = currentNode.left;
      } else if (currentNode === parentNode.left) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    }

    // === CASE 3: Node has TWO children ===
    else {
      // Find the in-order successor (smallest value in the right subtree)
      let successorParent = currentNode;
      let successor = currentNode.right;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Copy the successor's value to the node we intended to remove
      currentNode.value = successor.value;

      // Now, remove the successor node.
      // The successor is guaranteed to have at most one (right) child.
      // We check if the successor was the left or right child of its parent.

      // If the successor is the direct right child of the node we're replacing
      if (successor === successorParent.right) {
        // The successor's right child (if any) takes its place.
        successorParent.right = successor.right;
      } else {
        // The successor must be a left child.
        // The successor's right child (if any) takes its place.
        successorParent.left = successor.right;
      }
    }

    return this;
  }

  breadthFirstSearch() {
    let currentNode = this.root;
    let list = [];
    let queue = [];

    queue.push(currentNode);
    while (queue.length > 0) {
      currentNode = queue.shift();
      list.push(currentNode.value);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return list;
  }

  // Implement BFS recursively
  breadthFirstSearchRecursive(queue, list) {
    if (queue.length === 0) {
      return list;
    }
    let currentNode = queue.shift();

    list.push(currentNode.value);

    if (currentNode.left) {
      queue.push(currentNode.left);
    }

    if (currentNode.right) {
      queue.push(currentNode.right);
    }

    return this.breadthFirstSearchRecursive(queue, list);
  }

  DFSInorder() {
    return traverseInorder(this.root, []);
  }

  DFSPreorder() {
    return traversePreorder(this.root, []);
  }

  DFSPostorder() {
    return traversePostorder(this.root, []);
  }
}

// implement traversing the tree using recursion
function traverseRecursion(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverseRecursion(node.left);
  tree.right = node.right === null ? null : traverseRecursion(node.right);
  return tree;
}

function traverseIteration(node) {
  if (!node) {
    return null;
  }

  const result = { value: node.value, left: null, right: null };

  let todo = [{ orig: node, copy: result }];

  while (todo.length > 0) {
    const current = todo.pop();

    // If the original node has a left child
    if (current.orig.left) {
      const newLeft = {
        value: current.orig.left.value,
        left: null,
        right: null,
      };

      current.copy.left = newLeft;

      todo.push({ orig: current.orig.left, copy: newLeft });
    }

    if (current.orig.right) {
      const newRight = {
        value: current.orig.right.value,
        left: null,
        right: null,
      };

      current.copy.right = newRight;

      todo.push({ orig: current.orig.right, copy: newRight });
    }
  }

  return result;
}

// implement DFS by traversing tree InOrder
function traverseInorder(node, list) {
  if (node.left) {
    traverseInorder(node.left, list);
  }

  list.push(node.value);

  if (node.right) {
    traverseInorder(node.right, list);
  }

  return list;
}

// implement DFS by traversing tree PreOrder
function traversePreorder(node, list) {
  list.push(node.value);

  if (node.left) {
    traversePreorder(node.left, list);
  }

  if (node.right) {
    traversePreorder(node.right, list);
  }

  return list;
}

// implement DFS by traversing tree PostOrder
function traversePostorder(node, list) {}

// ==== TEST Tree 1 ====
const tree = new BinarySearchTree();
tree.insert(9).insert(4).insert(6).insert(20).insert(170).insert(15).insert(1);
//     9
//    / \
//   4   20
//  / \  / \
// 1  6 15 170

// Test if DFS works
// console.log(tree.DFSInorder());
console.log(tree.DFSPreorder());

// Test if BFS works
// console.log(tree.breadthFirstSearch());

// console.log(tree.breadthFirstSearchRecursive([tree.root], []));

// console.log("Tree Structure:");
// console.log(JSON.stringify(traverseRecursion(tree.root), null, 2));
// console.log(JSON.stringify(traverseIteration(tree.root), null, 2));

// Test the lookup function
// console.log("\nLookup Results:");
// console.log(tree.lookup(20)); // Should be found
// console.log(tree.lookup(1)); // Should be found
// console.log(tree.lookup(99)); // Should NOT be found

// tree.remove(20).remove(4).remove(9);
// console.log("Tree Structure:");
// console.log(JSON.stringify(traverse(tree.root), null, 2));
