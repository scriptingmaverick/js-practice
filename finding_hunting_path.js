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

    let isPreyOrPredator = ""
    let shortestPath = 0
    let isPreyFound = false
    let isPredatorFound = false

    let previousPath = Infinity

    let i = 0
    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }

        
        shortestPath = 0
    }

    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)


    i++

    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }
        
        
        shortestPath = 0
    }

    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)


    i++

    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }
        
        
        shortestPath = 0
    }

    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)


    i++

    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }
        
        
        shortestPath = 0
    }

    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)


    i++

    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }
        
        
        shortestPath = 0
    }

    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)


    i++

    
    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }
        
        
        shortestPath = 0
    }

    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)


    i++

    
    if ( (isPreyFound && savannahLand[i] === "Z" ) || (isPredatorFound && savannahLand[i] === "L")) {
        
        shortestPath = 0
    } else if(savannahLand[i] === "L" && !isPredatorFound) {
        isPreyOrPredator = "Predator"
        isPredatorFound = true
    } else if(savannahLand[i] === "Z" && !isPreyFound) {
        isPreyOrPredator = "Prey"
        isPreyFound = true
    } else if (savannahLand[i] === " " ) { 
        shortestPath++
    }

    if(isPreyFound && isPredatorFound){
        previousPath = shortestPath < previousPath ? shortestPath : previousPath
        if(isPreyOrPredator === "Predator"){
            isPreyFound = false
        }  else{
            isPredatorFound = false
        }
        
        
        shortestPath = 0
    }
    
    console.log(previousPath,shortestPath,isPredatorFound,isPreyFound,isPreyOrPredator)

} else {
    console.log(-1)
}
