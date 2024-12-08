const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const field = data.split("\n").map(e => e.split(""))


const antennasByType = new Map()

field.forEach((row,y)=>{
    row.forEach((cell,x)=>{
        if(/(\d|[a-zA-Z])/.test(cell)) {
            const res = antennasByType.get(cell)
            if(res === undefined) antennasByType.set(cell, [{ x: x, y: y}])
            else res.push({ x: x, y: y})
         }
    })
})

const antinodes = new Set()




for(const antennas of antennasByType.values()) {

    for(const antenna1 of antennas) {
        for(const antenna2 of antennas) {
            if(antenna1 === antenna2) continue
            const nx = antenna1.x - antenna2.x + antenna1.x
            const ny = antenna1.y - antenna2.y + antenna1.y 
    
            if(field[ny]?.[nx] === undefined) continue
    
            antinodes.add(`${nx}:${ny}`)
        }
    }
}

console.log("part1", antinodes.size)