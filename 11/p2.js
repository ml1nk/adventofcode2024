const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

let stones = data.split(" ").map(e => parseInt(e))

let cache = new Map()

function iterateCache(stone, remaining) {
    let res = cache.get(`${stone}:${remaining}`)
    if(res !== undefined) return res
    res = iterate(stone, remaining)
    cache.set(`${stone}:${remaining}`, res)
    return res
}

function iterate(stone, remaining) {
    if(remaining === 0) return 1


    if(stone===0) {
        return iterateCache(1, remaining-1)
    }
    
    const vs = stone.toString()
    if(vs.length%2 === 0) {
        const left = parseInt(vs.slice(0, vs.length/2))
        const right = parseInt(vs.slice(vs.length/2))
        return iterateCache(left, remaining-1) + iterateCache(right, remaining-1)
    }
    
    return iterateCache(stone*2024, remaining-1)
}

const res = stones.reduce((p,c)=>p+iterateCache(c, 75), 0)

console.log("part2", res)