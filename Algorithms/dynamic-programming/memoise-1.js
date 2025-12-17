function addTo80(n){
    return n + 80;
}


function memoizedAddTo80(){
    let cache = {}
    return function(n){
        if(n in cache){
            process.stdout.write("Returning cached value: ");
            return cache[n]
        }else{
            cache[n] = n + 80;
            process.stdout.write("Calculated value: ");
            return cache[n];
        }
    }
}

const memoized = memoizedAddTo80();

console.log(memoized(20));
console.log(memoized(20));


