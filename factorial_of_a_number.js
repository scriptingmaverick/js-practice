const numberToGetFactorial = 7
let factorialValue = 1

for(let present_number = 1; present_number <= numberToGetFactorial; present_number++) {
    factorialValue *= present_number
}

console.log(factorialValue, "is the factorial")
