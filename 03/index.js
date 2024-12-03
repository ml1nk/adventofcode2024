const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const matcher1 = /mul\((\d{1,3}),(\d{1,3})\)/gm
const matches1 = data.matchAll(matcher1)
const part1  = [...matches1].reduce((p, c)=>p + (c[1] * c[2]), 0)
console.log("part1", part1)

const matcher2 = /(?:mul\((\d{1,3}),(\d{1,3})\))|(?:do\(\))|(?:don't\(\))/gm
const matches2 = data.matchAll(matcher2)

let doit = true

const part2  = [...matches2].reduce((p, c)=>{
    
    if(c[0] === "do()") {
        doit = true
        return p
    } else if(c[0] === "don't()") {
        doit = false
        return p
    } else if (doit) {
        return p + (c[1] * c[2])
    } else {
        return p
    }
}, 0)
console.log("part2", part2)