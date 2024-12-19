const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });


let [a, b] = data.split("\n\n")

const types = a.split(", ")
const input = b.split("\n")

let res = 0
for(let inp of input) {   
    if(solve(inp)) {
        res++
    }
}



function solve(inp) {
    if(inp.length === 0) return true

    for(const type of types) {
        if(inp.startsWith(type)) {
            if(solve(inp.slice(type.length))) return true
        }
    }

    return false
}

console.log("part1", res)