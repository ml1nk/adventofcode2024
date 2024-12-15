const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

let [ field, moves ] = data.split("\n\n")

moves = moves.replaceAll("\n", "")


field = field
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
    .replaceAll("#", "##")

field = field.split("\n").map(e=>e.split(""))
let fieldNew 

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

    const [res, work] = moveIt(pos, vel)
    if(res) {
        fieldNew = field.map(e=>e.map(e=>e))
        work.sort((e,f)=>f[0]-e[0])
        work.forEach(e=>e[1]())
        field = fieldNew
        pos.x = pos.x+vel.x
        pos.y = pos.y+vel.y
    }
}


function moveIt(pos, vel, deep = 0) {
    if(field[pos.y+vel.y][pos.x+vel.x] === "#") {
        return [false, []]
    } else if(field[pos.y+vel.y][pos.x+vel.x] === ".") {
        return [true, [[ deep, ()=>{
            fieldNew[pos.y+vel.y][pos.x+vel.x] = field[pos.y][pos.x]
            fieldNew[pos.y][pos.x] = "."
        }]]]
    } 

    if(vel.y === 0) {
        const [ res, work ] = moveIt({
            x: pos.x+vel.x,
            y: pos.y+vel.y
        }, vel, deep+1)
        return [res, [...work, [ deep, ()=>{
            fieldNew[pos.y+vel.y][pos.x+vel.x] = field[pos.y][pos.x]
            fieldNew[pos.y][pos.x] = "."
        }]]]
    }

    const dir = field[pos.y+vel.y][pos.x+vel.x] === "]" ? -1 : 1

    const [ res, work ] = moveIt({
        x: pos.x+vel.x,
        y: pos.y+vel.y
    }, vel, deep+1)

    const [ res2, work2 ] = moveIt({
        x: pos.x+vel.x+dir,
        y: pos.y+vel.y
    }, vel, deep+1)

    return [res && res2, [
        ...work, 
        ...work2, 
        [ deep, ()=>{
            fieldNew[pos.y+vel.y][pos.x+vel.x] = field[pos.y][pos.x]
            fieldNew[pos.y][pos.x] = "."
        }]
    ] ]  
}

let res = 0

for(let y=0; y<field.length; y++) {
    for(let x=0; x<field[y].length; x++) {
        if(field[y][x] === "[") res += y*100+x
    }
}

console.log("part2", res)