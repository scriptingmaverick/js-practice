const endOfRange = 4

let firstTerm = 0
let secondTerm = 1


if(endOfRange === 1){
    console.log(firstTerm)
}else if(endOfRange === 2){
    console.log(firstTerm + "\n" + secondTerm)
}else{
    let currentTerm = 0

    console.log(firstTerm + "\n" + secondTerm)
    
    currentTerm = firstTerm + secondTerm
    firstTerm = secondTerm
    secondTerm = currentTerm

    console.log(secondTerm)
    
    currentTerm = firstTerm + secondTerm
    firstTerm = secondTerm
    secondTerm = currentTerm
    
    console.log(secondTerm)


}

