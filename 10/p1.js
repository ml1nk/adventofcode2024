const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const topo = data.split("\n").map(e => e.split("").map(e => parseInt(e)))

const trailheads = []

for (let y = 0; y < topo.length; y++) {
    for (let x = 0; x < topo[y].length; x++) {
        if (topo[y][x] === 0) trailheads.push({ x, y })
    }
}

let sum = 0
for (const trailhead of trailheads) {
    const dest = new Set()
    getScore(trailhead.y, trailhead.x, dest)
    sum += dest.size
}

function getScore(y, x, dest) {
    const cur = topo[y][x]
    if (cur === 9) {
        dest.add(`${x}:${y}`)
        return 
    }

    if (topo[y + 1]?.[x] === cur + 1) getScore(y + 1, x, dest)
    if (topo[y - 1]?.[x] === cur + 1) getScore(y - 1, x, dest)
    if (topo[y]?.[x + 1] === cur + 1) getScore(y, x + 1, dest)
    if (topo[y]?.[x - 1] === cur + 1) getScore(y, x - 1, dest)
}

console.log("part1", sum)