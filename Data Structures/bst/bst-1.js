// ====================
// Node (BST building block)
// ====================
// A single node in the tree. Each node stores a value and pointers to left/right children.
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
// A BST keeps values ordered: left subtree values are <= node, right subtree values are > node.
// This makes search/insert/remove efficient on average.
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST (returns the tree for chaining)
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

  // Check whether a value exists in the BST (true/false)
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

  // Remove a value from the BST if it exists (returns the tree)
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

    // Case 1: Leaf node (no children)
    if (!currentNode.left && !currentNode.right) {
      if (!parentNode) {
        this.root = null;
      } else if (currentNode === parentNode.left) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }

    // Case 2a: Only right child
    else if (!currentNode.left) {
      // Node has right child only
      if (!parentNode) {
        this.root = currentNode.right;
      } else if (currentNode === parentNode.left) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    }

    // Case 2b: Only left child
    else if (!currentNode.right) {
      // Node has left child only
      if (!parentNode) {
        this.root = currentNode.left;
      } else if (currentNode === parentNode.left) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    }

    // Case 3: Two children (replace with in-order successor)
    else {
      // In-order successor = smallest value in the right subtree
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

  // BFS traversal (iterative): visits level by level
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

  // BFS traversal (recursive): same output as iterative BFS
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

  // DFS traversal (in-order): returns values in sorted order
  DFSInorder() {
    return traverseInorder(this.root, []);
  }

  // DFS traversal (pre-order): visits node before its children
  DFSPreorder() {
    return traversePreorder(this.root, []);
  }

  // DFS traversal (post-order): visits node after its children
  DFSPostorder() {
    return traversePostorder(this.root, []);
  }
}

// ====================
// DFS Traversal Helpers (Recursive)
// ====================
// These helpers return an array of values by visiting nodes in a specific DFS order.

// In-order: Left -> Node -> Right (sorted order for a BST)
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

// Pre-order: Node -> Left -> Right (useful for copying/serializing structure)
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

// Post-order: Left -> Right -> Node (useful for deleting/freeing nodes)
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
// These helpers convert the BST into plain JS objects so it prints nicely with JSON.stringify.

// Recursively build a plain-object representation of the tree
function traverseRecursion(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverseRecursion(node.left);
  tree.right = node.right === null ? null : traverseRecursion(node.right);
  return tree;
}

// Iteratively build a plain-object representation of the tree (no recursion)
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
// Quick sanity checks and examples. Uncomment logs to run different operations.
const tree = new BinarySearchTree();
tree.insert(9).insert(4).insert(6).insert(20).insert(170).insert(15).insert(1);

// Reference tree used for the examples below:
//      9
//     / \
//    4   20
//   / \  / \
//  1  6 15 170

// DFS
// Expected:
//   In-order   -> [1, 4, 6, 9, 15, 20, 170]
//   Pre-order  -> [9, 4, 1, 6, 20, 15, 170]
//   Post-order -> [1, 6, 4, 15, 170, 20, 9]
// console.log(tree.DFSInorder());
// console.log(tree.DFSPreorder());
console.log(tree.DFSPostorder());

// BFS
// Expected -> [9, 4, 20, 1, 6, 15, 170]
// console.log(tree.breadthFirstSearch());
// console.log(tree.breadthFirstSearchRecursive([tree.root], []));

// Visualize
// Prints the tree structure as nested plain objects
// console.log("Tree Structure:");
// console.log(JSON.stringify(traverseRecursion(tree.root), null, 2));
// console.log(JSON.stringify(traverseIteration(tree.root), null, 2));

// Lookup
// Expected:
//   lookup(20) -> true
//   lookup(1)  -> true
//   lookup(99) -> false
// console.log("\nLookup Results:");
// console.log(tree.lookup(20)); // Should be found
// console.log(tree.lookup(1));  // Should be found
// console.log(tree.lookup(99)); // Should NOT be found

// Remove
// Remove nodes and print updated tree structure
// tree.remove(20).remove(4).remove(9);
// console.log("Tree Structure:");
// console.log(JSON.stringify(traverse(tree.root), null, 2));
