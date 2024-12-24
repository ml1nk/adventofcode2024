const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const connections = data.split("\n").map(e=>e.split("-"))


let curElements = new Set()
let curGroups = new Set()

for(const connection of connections) {
    curGroups.add(connection.sort().join(","))
    curElements.add(connection[0])
    curElements.add(connection[1])
}


let nextElements = new Set()
let nextGroups = new Set()

while(true) {
    for(const element of curElements.keys()) {
        outer:
        for(const curGroup of curGroups.keys()) {
            const splitted = curGroup.split(",")
            for(let i=0; i<splitted.length;i++) {
                if(curGroup[i] === element) continue outer
                const cur = [...splitted.slice(0,i),element,...splitted.slice(i+1)].sort().join(",")
                if(!curGroups.has(cur)) continue outer
            }
            splitted.forEach(e=>nextElements.add(e))
            nextElements.add(element)
            nextGroups.add([...splitted, element].sort().join(","))
        }
    }

    if(nextGroups.size === 0) break;

    curGroups = nextGroups
    curElements = nextElements
    nextElements = new Set()
    nextGroups = new Set()
}

console.log("part2", curGroups)
