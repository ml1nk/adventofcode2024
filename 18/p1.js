const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });


const falling = data.split("\n").map(e => e.split(",").map(e => parseInt(e)))

const size = { x: 71, y: 71 }

const limit = 1024

const field = [...Array(size.y)].map(_ => Array(size.x).fill("."));



console.log(field.map(e => e.join("")).join("\n"))

falling.forEach((e, i) => {
    if (i >= limit) return
    field[e[1]][e[0]] = "#"
})



const queue = [{ x: 0, y: 0, steps: 0 }]

const cache = new Map()

while (queue.length > 0) {
    cur = queue.shift()

    if (field[cur.y]?.[cur.x] !== '.') continue

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

const key = `${size.x-1}:${size.y-1}`

const res = cache.get(key)

console.log("part1", res)