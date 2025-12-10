function checkIfCommon(array1, array2) {
  let x = 0;

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        x = 1;
        return true;
      }
    }
  }

  if (x === 0) {
    return false;
  }
}

function optimised(array1, array2){
    let myObj = {}
    for(let i = 0; i < array1.length; i++){
        if(!myObj[array1[i]]){
            myObj[array1[i]] = true
        }
    }

    for (let i = 0; i < array2.length; i++) {
        if(array2[i] in myObj){
            return true
        }
    }
    return false
}

const arr1 = ["a", "b", "u", "h", "h"];
const arr2 = ["e", "f", "g", "j", "b"];

console.log(optimised(arr1, arr2));
