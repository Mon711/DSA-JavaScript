// ====================
// Node (BST building block)
// ====================
class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

// ====================
// Binary Search Tree (BST)
// ====================
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new Node(value);

    // If the tree is empty, make the new node the root
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;

    // Traverse the tree to find the correct spot for the new node
    while (true) {
      if (value <= currentNode.value) {
        // Go left
        if (!currentNode.left) {
          // Place new node here if left child does not exist
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        // Go right
        if (!currentNode.right) {
          // Place new node here if right child does not exist
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  // Check if a value exists in the BST
  lookup(value) {
    if (!this.root) {
      return false;
    }

    let currentNode = this.root;

    // Traverse the tree to find the value
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return true;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    // Value not found
    return false;
  }

  // Remove a node with the given value from the BST
  remove(value) {
    if (!this.root) {
      console.log("Tree is empty!");
      return null;
    }

    let parentNode = null;
    let currentNode = this.root;

    // Find the node to remove and its parent
    while (currentNode && currentNode.value !== value) {
      parentNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (!currentNode) {
      console.log(`Node with value ${value} not found.`);
      return null;
    }

    // Case 1: Node has no children (leaf)
    if (!currentNode.left && !currentNode.right) {
      if (!parentNode) {
        this.root = null;
      } else if (currentNode === parentNode.left) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }

    // Case 2: Node has one child
    else if (!currentNode.left) {
      // Node has right child only
      if (!parentNode) {
        this.root = currentNode.right;
      } else if (currentNode === parentNode.left) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    } else if (!currentNode.right) {
      // Node has left child only
      if (!parentNode) {
        this.root = currentNode.left;
      } else if (currentNode === parentNode.left) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    }

    // Case 3: Node has two children
    else {
      // Find the in-order successor (smallest value in the right subtree)
      let successorParent = currentNode;
      let successor = currentNode.right;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Replace current node's value with successor's value
      currentNode.value = successor.value;

      // Remove the successor node, which has at most one child (right child)
      if (successor === successorParent.right) {
        successorParent.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }
    }

    return this;
  }

  // Breadth-first search (BFS) traversal (iterative)
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

  // Breadth-first search (BFS) traversal (recursive)
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

  // Depth-first search (DFS) traversals
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

// ====================
// DFS Traversal Helpers (Recursive)
// ====================
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

function traversePostorder(node, list) {
  if (node.left) {
    traversePostorder(node.left, list);
  }

  if (node.right) {
    traversePostorder(node.right, list);
  }

  list.push(node.value);

  return list;
}

// ====================
// Tree Visualization Helpers (Convert tree to plain objects)
// ====================
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

// ====================
// Test / Demo
// ====================
const tree = new BinarySearchTree();
tree.insert(9).insert(4).insert(6).insert(20).insert(170).insert(15).insert(1);

// Tree structure:
//      9
//     / \
//    4   20
//   / \  / \
//  1  6 15 170

// DFS
// console.log(tree.DFSInorder());
// console.log(tree.DFSPreorder());
console.log(tree.DFSPostorder());

// BFS
// console.log(tree.breadthFirstSearch());
// console.log(tree.breadthFirstSearchRecursive([tree.root], []));

// Visualize
// console.log("Tree Structure:");
// console.log(JSON.stringify(traverseRecursion(tree.root), null, 2));
// console.log(JSON.stringify(traverseIteration(tree.root), null, 2));

// Lookup
// console.log("\nLookup Results:");
// console.log(tree.lookup(20)); // Should be found
// console.log(tree.lookup(1));  // Should be found
// console.log(tree.lookup(99)); // Should NOT be found

// Remove
// tree.remove(20).remove(4).remove(9);
// console.log("Tree Structure:");
// console.log(JSON.stringify(traverse(tree.root), null, 2));
