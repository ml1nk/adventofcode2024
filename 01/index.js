const fs = require('fs');

const data = fs.readFileSync('./input.txt',    { encoding: 'utf8', flag: 'r' });

const rows = data.split("\n").map(e=>e.split("   "))

const left = rows.map(e=>parseInt(e[0]))
const right = rows.map(e=>parseInt(e[1]))

left.sort()
right.sort()


let dif = 0;
for(let i=0; i<rows.length;i++) {
    dif += Math.abs(left[i]-right[i])
}

console.log("part1", dif)

const sim = left.reduce((p, c)=>{
    return p + c*right.filter(e=>e===c).length
},0)

console.log("part2", sim)
