const numberToCheck = 16345
let duplicateOfInput = numberToCheck
let lengthOfNum = 0

while(duplicateOfInput >= 1) {
    lengthOfNum = lengthOfNum + 1
    duplicateOfInput = duplicateOfInput / 10
}

duplicateOfInput = numberToCheck

let reminder = 0
let sum = 0
let digit = 0

while(duplicateOfInput >= 1) {    
    reminder = duplicateOfInput % 10    
    duplicateOfInput = duplicateOfInput - reminder
    digit = reminder

    for(let powerCount = 1; powerCount < lengthOfNum; powerCount++){
        digit = digit * reminder
    }
    
    sum = sum + digit
    duplicateOfInput = duplicateOfInput / 10
    // console.log(sum, digit, reminder, duplicateOfInput);
}

let suffix = (sum === numberToCheck) ? "is an armstrong number" : "isn't an armstrong number"
console.log(numberToCheck, suffix);
