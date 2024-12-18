const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });


const falling = data.split("\n").map(e => e.split(",").map(e => parseInt(e)))

const size = { x: 71, y: 71 }

const field = [...Array(size.y)].map(_ => Array(size.x).fill("."));

function reachable() {
    const queue = [{ x: 0, y: 0, steps: 0 }]

    const cache = new Set()
    
    while (queue.length > 0) {
        cur = queue.shift()

        if(
            cur.x === size.x-1 && 
            cur.y === size.y-1
        ) return true

    
        if (field[cur.y]?.[cur.x] !== '.') continue
    
        const key = `${cur.x}:${cur.y}`    
        if (cache.has(key)) continue
    
        cache.add(key)
    
        queue.push(
            {
                x: cur.x + 1,
                y: cur.y
            },
            {
                x: cur.x - 1,
                y: cur.y
            },
            {
                x: cur.x,
                y: cur.y + 1
            },
            {
                x: cur.x,
                y: cur.y - 1
            },
        )
    }
    return false
}



for(const e of falling) {
    field[e[1]][e[0]] = "#"

    if(reachable()) continue

    console.log("part2", e)
    break
}

