const testcase1 = "LZ"
const testcase2 = "L Z"
const testcase3 = "L ZL"
const testcase4 = "L  L"
const testcase5 = "L  ZZ L"
const testcase6 = "Z  Z    Z"
const testcase7 = "L L  L           Z"
const testcase8 = "      ZL            "
const testcase9 = "                  "

const savannahLand = testcase8

let isLionsAvailable = false
let isZebrasAvailable = false
for(let i=0; i < savannahLand.length; i++) {
    if( (savannahLand[i] === "L") && !isLionsAvailable){
        isLionsAvailable = true
    } else if( (savannahLand[i] === "Z") && !isZebrasAvailable) {
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
    let canCountPath = false
    let isPreyFound = false
    let isPredatorFound = false
    for(let i = 0; i < savannahLand.length; i++) {
        if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
            newPath = 0
        } else if(savannahLand[i] === "L" && !isPredatorFound) {
            isPreyOrPredator = "Predator"
            isPredatorFound = true
            canCountPath = true
        } else if(savannahLand[i] === "Z" && !isPreyFound) {
            isPreyOrPredator = "Prey"
            isPreyFound = true
            canCountPath = true
        } else if (savannahLand[i] === " " && canCountPath) { 
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
