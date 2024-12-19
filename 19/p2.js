const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });


let [a, b] = data.split("\n\n")

const types = a.split(", ")
const input = b.split("\n")


const r = {}


const symbol = Symbol()

for(const type of types) {
    let pos = r

    for(const t of type) {
        if(pos[t] === undefined) pos[t] = {}
        pos = pos[t]
    }

    pos[symbol] = true
}

const cache = new Map()


let res = 0
for(let inp of input) {   
    res += solve(inp, 0)
}



function solve(inp, deep) {
    if(inp.length === deep) return 1

    let count = 0
    let pos = r
    
    for(;deep<inp.length; deep++) {
        const cur = pos[inp[deep]]
        if(cur === undefined) break
        pos = cur

        const key = inp.slice(deep+1)
        let c = cache.get(key)
        if(c === undefined) {
            c = solve(inp, deep+1)
            cache.set(key, c)
        }

        if(pos[symbol]) count += c
    }

    return count
}

console.log("part2", res)