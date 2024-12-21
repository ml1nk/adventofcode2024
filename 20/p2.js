const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const field = data.split("\n").map(e => e.split(""))


function findPos(char) {
    for (let y = 0; y < field.length; y++) {
        for (let x = 0; x < field[y].length; x++) {
            if (field[y][x] === char) return { x, y }
        }
    }
}


const relevant = []

for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] !== "#") continue
        let sum = (field[y+1]?.[x] ?? "#") !== "#" ? 1 : 0
        sum += (field[y-1]?.[x] ?? "#") !== "#" ? 1 : 0
        sum += (field[y]?.[x-1] ?? "#") !== "#" ? 1 : 0
        sum += (field[y]?.[x+1] ?? "#") !== "#" ? 1 : 0
        if(sum>=2) relevant.push({ x, y })
    }
}


const start = findPos("S")
const end = findPos("E")


const forward = solve(start)
const backward = solve(end)

const key = `${end.x}:${end.y}`
const cost = forward.get(key)


const path = []

let pos = { ...start }


while(pos.x !== end.x || pos.y !== end.y) {
    path.push(pos)

    const posKey = `${pos.x}:${pos.y}`


    const left = { x: pos.x-1, y: pos.y } 
    const leftKey = `${left.x}:${left.y}`

    const right = { x: pos.x+1, y: pos.y }
    const rightKey = `${right.x}:${right.y}`
    
    const top = { x: pos.x, y: pos.y-1 } 
    const topKey = `${top.x}:${top.y}`

    const bottom = { x: pos.x, y: pos.y+1 } 
    const bottomKey = `${bottom.x}:${bottom.y}`


    if(forward.get(leftKey) > forward.get(posKey) && forward.get(leftKey) + backward.get(leftKey) === cost) {
        pos = left
    } else if(forward.get(rightKey) > forward.get(posKey) && forward.get(rightKey) + backward.get(rightKey) === cost) {
        pos = right
    } else if (forward.get(topKey) > forward.get(posKey) && forward.get(topKey) + backward.get(topKey) === cost) {
        pos = top
    } else if(forward.get(bottomKey) > forward.get(posKey) && forward.get(bottomKey) + backward.get(bottomKey) === cost) {
        pos = bottom
    } else {
        process.exit(1)
    }
}
path.push(end)


const possibleJumps = []
for(let y=-20; y<=20; y++) {
    for(let x=-20; x<=20; x++) {
        if(Math.abs(y)+Math.abs(x)>1 && Math.abs(x) + Math.abs(y) <=20) {
            possibleJumps.push({ x, y })
        }
    }
}

let sum = 0

for(p of path) {
    const pKey = `${p.x}:${p.y}`
    const cur = forward.get(pKey)

    for(const j of possibleJumps) {
        const points = backward.get(`${p.x+j.x}:${p.y+j.y}`)
        if(points === undefined) continue


        if(cur + points + Math.abs(j.x) + Math.abs(j.y) <= cost - 100) sum+=1
    }
}

console.log("part2", sum)

function solve(start) {
    const queue = [{ x: start.x, y: start.y, steps: 0 }]
    const cache = new Map()
    while (queue.length > 0) {
        cur = queue.shift()
    
        if (field[cur.y][cur.x] === '#') continue
    
        const key = `${cur.x}:${cur.y}`
    
        const steps = cache.get(key)
    
        if (cur.steps >= steps) continue
    
        cache.set(key, cur.steps)
    
        queue.push(
            {
                x: cur.x + 1,
                y: cur.y,
                steps: cur.steps + 1
            },
            {
                x: cur.x - 1,
                y: cur.y,
                steps: cur.steps + 1
            },
            {
                x: cur.x,
                y: cur.y + 1,
                steps: cur.steps + 1
            },
            {
                x: cur.x,
                y: cur.y - 1,
                steps: cur.steps + 1
            },
        )
    }
    return cache
}

