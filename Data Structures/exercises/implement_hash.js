class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  set(key, value) {
    let address = this._hash(key);

    if (!this.data[address]) {
      this.data[address] = [];
    }

    this.data[address].push([key, value]);
    return this.data;
  }

  get(key) {
    let address = this._hash(key);

    // Get array/arrays at this addresss
    const currentBucket = this.data[address];

    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1];
        }
      }
    }

    // If the bucket is empty or the key wasn't found in the bucket
    return undefined;
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] && this.data[i].length) {
        for (let j = 0; j < this.data[i].length; j++) {
          let key = this.data[i][j][0];
          keysArray.push(key);
        }
      }
    }

    return keysArray;
  }
}

// Create an instance of the HashTable
const myHashTable = new HashTable(50);

// Set some key-value pairs
myHashTable.set("grapes", 10000);
myHashTable.set("apples", 9);
myHashTable.set("oranges", 54);
myHashTable.set("banana", 2);

// Get values
// console.log(myHashTable.get('grapes'));
// console.log(myHashTable.get('oranges'))
// console.log(myHashTable.get('pearls'));
// console.log(myHashTable.get('apples'));
console.log(myHashTable.keys());
