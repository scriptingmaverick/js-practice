const numberToConvert = 88
let duplicateOfOriginalNumber = numberToConvert
let reminder = 0
let binaryString = ""

while(duplicateOfOriginalNumber >= 1) {
    reminder = duplicateOfOriginalNumber % 2
    duplicateOfOriginalNumber -= reminder
    binaryString += reminder
    duplicateOfOriginalNumber /= 2
}

let realBinaryValue = ""

for(let i=1; i <= binaryString.length; i++){
    realBinaryValue += binaryString[binaryString.length - i]
}

console.log(realBinaryValue)
