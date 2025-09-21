const savannahLand = "L  ZL Z"

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
    console.log(savannahLand[i],isLionsAvailable,isZebrasAvailable)
}

const isHuntingPossible = isLionsAvailable && isZebrasAvailable
let shortestPath = isHuntingPossible ? 0 : -1

console.log(shortestPath)
