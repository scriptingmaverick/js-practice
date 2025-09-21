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
}

const isHuntingPossible = isLionsAvailable && isZebrasAvailable

if(isHuntingPossible) {
    let shortestPath = 0
    
    console.log(shortestPath)

} else{
    console.log(-1)
}
