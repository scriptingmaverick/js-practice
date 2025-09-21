const savannahLand = "L L  L           Z"

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


if(isHuntingPossible) {

    let isPreyOrPredator = ""
    let newPath = 0
    let isPreyFound = false
    let isPredatorFound = false

    let shortestPath = Infinity

    for(let i = 0; i < savannahLand.length; i++) {

        if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
            newPath = 0
        } else if(savannahLand[i] === "L" && !isPredatorFound) {
            isPreyOrPredator = "Predator"
            isPredatorFound = true
        } else if(savannahLand[i] === "Z" && !isPreyFound) {
            isPreyOrPredator = "Prey"
            isPreyFound = true
        } else if (savannahLand[i] === " " ) { 
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

    console.log(shortestPath)
    
} else {
    console.log(-1)
}
