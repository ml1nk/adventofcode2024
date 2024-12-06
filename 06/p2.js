const fs = require('fs');

const data = fs.readFileSync('./input.txt',    { encoding: 'utf8', flag: 'r' });

const rows = data.split("\n").map(e=>e.split(""))

const directions = [
    { y: 1, x: 0},  // down
    { y: 0, x: -1}, // left
    { y: -1, x: 0}, // up
    { y: 0, x: 1},  // right
]

let curDirection
let curX
let curY


outer:
for(let y=0; y<rows.length; y++) {
    for(let x=0; x<rows[y].length; x++) {
        // ToDo: Other start directions?
        if(rows[y][x] === "^") {
            curDirection = 2
            curX = x
            curY = y
            rows[y][x] = '.'
            break outer
        }
    }
}


const start = {
    direction: curDirection,
    x: curX,
    y: curY
}

const marked = new Map()

while(rows[curY]?.[curX] !== undefined) {
    marked.set(`${curX}:${curY}`, { x: curX, y: curY})

    if(rows[curY+directions[curDirection].y]?.[curX+directions[curDirection].x] === "#") {
        curDirection = (curDirection + 1) % directions.length;
    } else {
        curY = curY+directions[curDirection].y
        curX = curX+directions[curDirection].x
    }
}


const possiblePos = [...marked.values()].slice(1) // cannot add box on top


let variants = 0

for(let i=0; i<possiblePos.length; i++) {
    const loop = new Set()

    curX = start.x
    curY = start.y
    curDirection = start.direction

    while(rows[curY]?.[curX] !== undefined) {


        if(i>0) {
            rows[possiblePos[i-1].y][possiblePos[i-1].x] = "."
        } 
        rows[possiblePos[i].y][possiblePos[i].x] = "#"


        const key = `${curX}:${curY}:${curDirection}`

        if(loop.has(key)) {
            variants++; 
            break;
        }

        loop.add(key)

        if(rows[curY+directions[curDirection].y]?.[curX+directions[curDirection].x] === "#") {
            curDirection = (curDirection + 1) % directions.length;
        } else {
            curY = curY+directions[curDirection].y
            curX = curX+directions[curDirection].x
        }

    }
}

console.log("part2", variants)