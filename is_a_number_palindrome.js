const numberToCheck = 303

let duplicateOfInput = numberToCheck

let reminder = 0

let palindromicValue = 0

while(duplicateOfInput >= 1){
    reminder = duplicateOfInput % 10
    palindromicValue = (palindromicValue * 10) + reminder
    duplicateOfInput -= reminder
    duplicateOfInput = duplicateOfInput / 10

    console.log(reminder,palindromicValue,duplicateOfInput)
}

const suffix = (palindromicValue === numberToCheck) ? "is a palindrome" : "isn't a palindrome"

console.log(numberToCheck, suffix)
