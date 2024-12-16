const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const field = data.split('\n').map(e=>e.split(''))

const directions = [
    { x: 0, y: -1},
    { x: 1, y:  0},
    { x: 0, y: 1},
    { x: -1, y: 0}
]



function findPos(char) {
    for(let y=0; y<field.length; y++) {
        for(let x=0; x<field[y].length; x++) {
            if(field[y][x] === char) return { x, y }
        }
    }
}


const queue = [{ ...findPos('E'), direction: 1, points: 0 }]

const cache = new Map()

while(queue.length>0) {
    cur = queue.shift()

    if(field[cur.y][cur.x] === '#') continue

    const key = `${cur.x}:${cur.y}:${cur.direction}`

    const points = cache.get(key)

    if(cur.points >= points) continue

    cache.set(key, cur.points)

    queue.push(
        {
            x: cur.x + directions[cur.direction].x,
            y: cur.y + directions[cur.direction].y,
            direction: cur.direction,
            points: cur.points + 1
        },
        {
            x: cur.x,
            y: cur.y,
            direction: (cur.direction+1)%4,
            points: cur.points + 1000
        },
        {
            x: cur.x,
            y: cur.y,
            direction: cur.direction === 0 ? 3 : cur.direction-1,
            points: cur.points + 1000
        }
    )
}

const pos = findPos('S')

const key1 = `${pos.x}:${pos.y}:${0}`
const key2 = `${pos.x}:${pos.y}:${1}`
const key3 = `${pos.x}:${pos.y}:${2}`
const key4 = `${pos.x}:${pos.y}:${3}`


const res = Math.min(cache.get(key1), cache.get(key2),cache.get(key3),cache.get(key4))

console.log("part1", res)