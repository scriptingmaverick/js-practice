const testcase1 = "LZ"
const testcase2 = "L Z"
const testcase3 = "L ZL"
const testcase4 = "L  L"
const testcase5 = "L  ZZ L"
const testcase6 = "Z  Z    Z"
const testcase7 = "L L  L           Z"
const testcase8 = "      ZL            "
const testcase9 = "   L  Z    L Z"

const savannahLand = testcase3
let isLionsAvailable = false
let isZebrasAvailable = false

for(let index=0; index < savannahLand.length; index++) {
    if( (savannahLand[index] === "L") && !isLionsAvailable){
        isLionsAvailable = true
    } else if( (savannahLand[index] === "Z") && !isZebrasAvailable) {
        isZebrasAvailable = true
    }else if (isLionsAvailable && isZebrasAvailable){
        break
    }
}
const isHuntingPossible = isLionsAvailable && isZebrasAvailable
let shortestPath = Infinity

if(isHuntingPossible) {
    let isPreyOrPredator = ""
    let newPath = 0
    let isPreyFound = false
    let isPredatorFound = false
    for(let index = 0; index < savannahLand.length; index++) {
        if ( (isPreyFound && savannahLand[index] === "Z" ) || (isPredatorFound && savannahLand[index] === "L")) {
            newPath = 0
        } else if(savannahLand[index] === "L" && !isPredatorFound) {
            isPreyOrPredator = "Predator"
            isPredatorFound = true
        } else if(savannahLand[index] === "Z" && !isPreyFound) {
            isPreyOrPredator = "Prey"
            isPreyFound = true
        } else if (savannahLand[index] === " " && isPreyOrPredator) { 
            newPath++
        }
        if(isPreyFound && isPredatorFound) {
            shortestPath = newPath < shortestPath ? newPath : shortestPath
            if(isPreyOrPredator === "Predator"){
                isPreyFound = false
            }  else{
                isPredatorFound = false
            }   
            newPath = 0
        }
    }
} else {
    shortestPath = -1
}

console.log("Input:",'"'+savannahLand+'" ,',"Output:",shortestPath)
