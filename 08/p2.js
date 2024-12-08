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

            const difx = antenna1.x - antenna2.x
            const dify = antenna1.y - antenna2.y

            let multiplier = 1

            while(true) {

                const nx = difx*multiplier + antenna2.x
                const ny = dify*multiplier + antenna2.y 
        
                if(field[ny]?.[nx] === undefined) break
        
                antinodes.add(`${nx}:${ny}`)
                multiplier++
            }
        }
    }
}

console.log("part2", antinodes.size)