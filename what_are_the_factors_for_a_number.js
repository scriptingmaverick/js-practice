const numberToSearchForFactors = 34
let answer_string = ""

for (let present_number = 2; present_number < numberToSearchForFactors; present_number++)  {
    if((numberToSearchForFactors % present_number) === 0) {
        answer_string = answer_string + present_number + " "
    }
}

console.log(answer_string, "are the factors");  
