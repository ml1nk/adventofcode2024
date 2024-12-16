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


let startpos = findPos('E')
let destpos = findPos('S')


let dests = []


const queue = [{ ...startpos, direction: 1, points: 0, path: [startpos] }]

const cache = new Map()

while(queue.length>0) {
    let cur = queue.shift()

    if(field[cur.y][cur.x] === '#') continue

    if(cur.x === destpos.x && cur.y === destpos.y) {
        dests.push(cur)
    }

    const key = `${cur.x}:${cur.y}:${cur.direction}`

    const c = cache.get(key)

    if(cur.points > c) continue

    cache.set(key, cur.points)

    queue.push(
        {
            x: cur.x + directions[cur.direction].x,
            y: cur.y + directions[cur.direction].y,
            direction: cur.direction,
            points: cur.points + 1,
            path: [...cur.path, { x: cur.x + directions[cur.direction].x, y: cur.y + directions[cur.direction].y }]
        },
        {
            x: cur.x,
            y: cur.y,
            direction: (cur.direction+1)%4,
            points: cur.points + 1000,
            path: cur.path,
        },
        {
            x: cur.x,
            y: cur.y,
            direction: cur.direction === 0 ? 3 : cur.direction-1,
            points: cur.points + 1000,
            path: cur.path
        }
    )
}

const pos = findPos('S')

function getKeys(pos) {
    return [`${pos.x}:${pos.y}:${0}`,`${pos.x}:${pos.y}:${1}`,`${pos.x}:${pos.y}:${2}`,`${pos.x}:${pos.y}:${3}`]
} 


const res = Math.min(...getKeys(pos).map(e=>cache.get(e)))

const fd = dests.filter(e=>e.points === res)


const marked = new Set()
fd.forEach(e=>e.path.forEach(e=>{
    marked.add(`${e.x}:${e.y}`)
}))


console.log("part2", marked.size)