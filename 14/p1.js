const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const size = { x: 101, y: 103 }
const ticks = 100

let robots = data.split("\n").map(e=>{
   let split = e.split(" ")

   const pos = split[0].slice(2).split(",")
   const vel = split[1].slice(2).split(",")

    return {
        px: parseInt(pos[0]),
        py: parseInt(pos[1]),
        vx: parseInt(vel[0]),
        vy: parseInt(vel[1]),
    }

})


for(let t=0; t<ticks; t++) {
    robots.forEach(e=>{
        e.px = (e.px + e.vx) % size.x
        if(e.px < 0) e.px += size.x
        e.py = (e.py + e.vy) % size.y
        if(e.py < 0) e.py += size.y
    })
}

const hx = (size.x-1)/2
const hy = (size.y-1)/2

const q1 = robots.filter(e=>e.px < hx && e.py < hy).length
const q2 = robots.filter(e=>e.px > hx && e.py < hy).length
const q3 = robots.filter(e=>e.px > hx && e.py > hy).length
const q4 = robots.filter(e=>e.px < hx && e.py > hy).length

console.log("part1", q1*q2*q3*q4)