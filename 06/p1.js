const fs = require('fs');

const data = fs.readFileSync('./input.txt',    { encoding: 'utf8', flag: 'r' });

const rows = data.split("\n")

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
            curY =y
            console.log("found d:x:y", curDirection, x, y)
            break outer
        }
    }
}


const marked = new Set()

while(rows[curY]?.[curX] !== undefined) {
    marked.add(`${curX}:${curY}`)

    if(rows[curY+directions[curDirection].y]?.[curX+directions[curDirection].x] === "#") {
        curDirection = (curDirection + 1) % directions.length;
    } else {
        curY = curY+directions[curDirection].y
        curX = curX+directions[curDirection].x
    }

    console.log(curDirection, curX, curY)
}


console.log("part1", marked.size)

