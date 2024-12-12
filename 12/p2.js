const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

let field = data.split("\n").map(e => e.split(""))


const usedField = new Set()

const regions = []

for(let y=0; y<field.length; y++) {
    for(let x=0; x<field[y].length; x++) {

        if(usedField.has(`${x}:${y}`)) continue

        regions.push(new Map())
        processRegion(regions.length-1, field[y][x], y, x)
    
    }
}

function processRegion(r, t, y, x) {
    if(field[y]?.[x] !== t || usedField.has(`${x}:${y}`)) return

    usedField.add(`${x}:${y}`)
    regions[r].set(`${x}:${y}`, { x, y })
    processRegion(r, t, y-1, x)
    processRegion(r, t, y+1, x)
    processRegion(r, t, y, x-1)
    processRegion(r, t, y, x+1)
}


function processPerimeter(region) {

    let res = 0
    const fields = region.values()

    for(const field of fields) {
        if(
            !region.has(`${field.x+1}:${field.y}`) &&
            (
                !region.has(`${field.x}:${field.y-1}`) ||
                region.has(`${field.x+1}:${field.y-1}`)
            )
        ) res +=1
        if(
            !region.has(`${field.x-1}:${field.y}`) && (
                !region.has(`${field.x}:${field.y+1}`) ||
                region.has(`${field.x-1}:${field.y+1}`) 
            )
        ) res +=1


        if(
            !region.has(`${field.x}:${field.y+1}`) && (
                !region.has(`${field.x-1}:${field.y}`) ||
                region.has(`${field.x-1}:${field.y+1}`) 
            )
        ) res +=1
    
        if(
            !region.has(`${field.x}:${field.y-1}`) && (
                !region.has(`${field.x+1}:${field.y}`) ||
                region.has(`${field.x+1}:${field.y-1}`) 
            )
        ) res +=1
    }


    return res
}

const perimeters = regions.map(e=>processPerimeter(e))

const cost = regions.reduce((p, e,i)=> p + e.size * perimeters[i], 0)

console.log("part2", cost)