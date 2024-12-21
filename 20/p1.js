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


const def = solve()


let sum = 0


for(const re of relevant) {
    field[re.y][re.x] = "."
    const cheat = solve()

    if(cheat <= def-100) {
        sum++
    }

    field[re.y][re.x] = "#"
}




console.log("part1", sum)

function solve() {
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
    const key = `${end.x}:${end.y}`
    return cache.get(key)
}

