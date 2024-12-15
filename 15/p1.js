const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

let [ field, moves ] = data.split("\n\n")

moves = moves.replaceAll("\n", "")

field = field.split("\n").map(e=>e.split(""))

const moveMap = {
    "<": { x: -1, y: 0 },
    ">": { x: 1, y: 0 },
    "^": { x: 0, y: -1 },
    "v": { x: 0, y: 1 }
}


function robotPos() {
    for(let y=0; y<field.length; y++) {
        for(let x=0; x<field[y].length; x++) {
            if(field[y][x] === "@") return { x, y }
        }
    }
}

const pos = robotPos()

for(const move of moves) {
    const vel = moveMap[move]
    if(moveIt(pos, vel, "@")) {
        field[pos.y][pos.x] = "."
        pos.x = pos.x+vel.x
        pos.y = pos.y+vel.y
    }
}


function moveIt(pos, vel, char) {
    if(field[pos.y+vel.y][pos.x+vel.x] === "#") {
        return false
    } else if(field[pos.y+vel.y][pos.x+vel.x] === ".") {
        field[pos.y+vel.y][pos.x+vel.x] = char
        return true
    } else if(moveIt({
        x: pos.x+vel.x,
        y: pos.y+vel.y
    }, vel, field[pos.y+vel.y][pos.x+vel.x])) {
        field[pos.y+vel.y][pos.x+vel.x] = char
        return true
    }
    return false
}

let res = 0

for(let y=0; y<field.length; y++) {
    for(let x=0; x<field[y].length; x++) {
        if(field[y][x] === "O") res += y*100+x
    }
}

console.log("part1", res)