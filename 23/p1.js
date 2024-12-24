const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const connections = data.split("\n").map(e=>e.split("-"))

const structure = new Map()
for(const connection of connections) {
    const a = structure.get(connection[0])
    const b = structure.get(connection[1])

    if(a === undefined) {
        structure.set(connection[0],new Set([connection[1]]))
    } else {
        a.add(connection[1])
    }
        
    if(b === undefined) {
        structure.set(connection[1],new Set([connection[0]]))
    } else {
        b.add(connection[0])
    }
}


const checked = new Set()
let res = []

for(const [a, value] of structure.entries()) {
    const d = [...value.keys()]

    for(let i=0; i<d.length; i++) {
        for(let p=i+1; p<d.length; p++) {
            if(checked.has(d[i]) || checked.has(d[p])) continue
            if(structure.get(d[i]).has(d[p])) {
                res.push([a,d[i],d[p]])
            }
        }
    }
    checked.add(a)
}


res = res.filter(e=>e.some(e=>e.startsWith("t")))

console.log("part1",res.length)