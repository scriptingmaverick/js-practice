const numberToConvert = 6
let duplicateOfOriginalNumber = numberToConvert
let reminder = 0
let binaryEquivalent = 0
let canCount = false
let count = 1

while(duplicateOfOriginalNumber >= 1) {
    reminder = duplicateOfOriginalNumber % 2
    duplicateOfOriginalNumber -= reminder
    binaryEquivalent = (binaryEquivalent * 10) + reminder
    duplicateOfOriginalNumber /= 2

    console.log(duplicateOfOriginalNumber, binaryEquivalent, reminder)
}

let output = binaryEquivalent
console.log(output)
