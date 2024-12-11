const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

let stones = data.split(" ").map(e => parseInt(e))

function iterate() {
    stones.forEach((v,i)=>{

        if(v===0) {
            stones[i] = [1]
            return
        }
    
    
        const vs = v.toString()
        if(vs.length%2 === 0) {
            const left = parseInt(vs.slice(0, vs.length/2))
            const right = parseInt(vs.slice(vs.length/2))
            stones[i] = [left, right]
            return
        }
    
        stones[i] = [v*2024]
    })
    stones = stones.flat(1)
}


for(let i=0; i<25; i++) {
    iterate()
}

console.log("part1", stones.length)