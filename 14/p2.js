const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const size = { x: 101, y: 103 }
const ticks = 99999

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
    draw(t)
    robots.forEach(e=>{
        e.px = (e.px + e.vx) % size.x
        if(e.px < 0) e.px += size.x
        e.py = (e.py + e.vy) % size.y
        if(e.py < 0) e.py += size.y
    })
}
draw(ticks)



function draw(i) {
    let draw = false

    const lines = []
    lines.push("_______" + i +"________")
    for(let y=0; y<size.y; y++) {
        const arr = Array.apply(null, Array(size.x)).map(function () { return 0 })
        robots.filter(e=>e.py === y).forEach(e=>arr[e.px]+=1)
        const line = arr.map(e=>{ if(e===0) return " "; else return "#"}).join("")

        if(line.includes("######")) {
            draw = true
        }
        lines.push(line)
    }
    lines.push("\n\n\n")

    if(draw) {
        lines.forEach(e=>console.log(e))
    }

}