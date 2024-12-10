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
    sum += getScore(trailhead.y, trailhead.x)
}

function getScore(y, x) {
    const cur = topo[y][x]
    if (cur === 9) {
        return 1
    }

    let sum = 0

    if (topo[y + 1]?.[x] === cur + 1) sum += getScore(y + 1, x)
    if (topo[y - 1]?.[x] === cur + 1) sum += getScore(y - 1, x)
    if (topo[y]?.[x + 1] === cur + 1) sum += getScore(y, x + 1)
    if (topo[y]?.[x - 1] === cur + 1) sum += getScore(y, x - 1)

    return sum
}

console.log("part2", sum)