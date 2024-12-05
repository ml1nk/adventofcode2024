const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });


let [rules, updates] = data.split("\n\n")

rules = rules.split("\n").map(e=>e.split("|").map(e=>parseInt(e)))

updates = updates.split("\n").map(e=>e.split(",").map(e=>parseInt(e)))


let res = 0

outer:
for(const update of updates) {
    for(let i=0; i<update.length; i++) {
        const forbidden = new Set(rules.filter(e=>e[0] === update[i]).map(e=>e[1]))
        for(let p=i-1; p>=0; p--) {
            if(forbidden.has(update[p])) {
                continue outer
            }
        }
    }

    res += update[Math.floor(update.length/2)]
}

console.log("part1", res)