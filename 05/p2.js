const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });


let [rules, updates] = data.split("\n\n")

rules = rules.split("\n").map(e=>e.split("|").map(e=>parseInt(e)))

updates = updates.split("\n").map(e=>e.split(",").map(e=>parseInt(e)))

const incorrectUpdates = []

outer:
for(const update of updates) {
    for(let i=0; i<update.length; i++) {
        const forbidden = new Set(rules.filter(e=>e[0] === update[i]).map(e=>e[1]))
        for(let p=i-1; p>=0; p--) {
            if(forbidden.has(update[p])) {
                incorrectUpdates.push(update)
                continue outer
            }
        }
    }

}

let fix = true
while(fix) {
    fix = false
    for(const update of incorrectUpdates) {
        for(let i=0; i<update.length; i++) {
            const forbidden = new Set(rules.filter(e=>e[0] === update[i]).map(e=>e[1]))
            for(let p=i-1; p>=0; p--) {
                if(forbidden.has(update[p])) {
                    const tmp = update[p]
                    update[p] = update[i]
                    update[i] = tmp
                    fix = true
                    break
                }
            }
        }
    }
}

let res = 0

for(const update of incorrectUpdates) {
    res += update[Math.floor(update.length/2)]
}

console.log("part2", res)