
const inputToCheck = "lol"
let duplicateOfInput = inputToCheck + ""
const lengthOfInput = duplicateOfInput.length
let palindromicString = ""
let digit = 1

while(digit <= lengthOfInput) {
    palindromicString += duplicateOfInput[lengthOfInput - digit++]
}

const suffix = (palindromicString === (inputToCheck + "")) ? "is a palindrome" : "isn't a palindrome"
console.log(inputToCheck, suffix)
