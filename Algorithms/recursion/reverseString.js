function reverseString(str) {
  const arr = [...str];
  return arr.reverse().join("");
}

// console.log(reverseString("yoyo master"));

function reverseStringIterative(str) {
  const arr = [];

  for (let i = str.length - 1; i >= 0; i--) {
    arr.push(str[i]);
  }

  return arr.join("");
}

// console.log(reverseStringIterative("yoyo master"));

function reverseStringRecursive(str) {
  // The base case must handle an empty string.
  // If the string is empty, we're done.
  if (str === "") {
    return "";
  }

  // Take the last character...
  const lastChar = str[str.length - 1];

  // ...and add it to the reverse of the rest of the string.
  const restOfString = str.slice(0, str.length - 1);

  return lastChar + reverseStringRecursive(restOfString);
}

console.log(reverseStringRecursive("yoyo master"));