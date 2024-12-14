const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const costs = { A: 3, B: 1 }

let tasks = data.split("\n\n").map((e,i)=>{
    const lines = e.split("\n")

    const bA = lines[0].split("+")
    const buttonA = { x: parseInt(bA[1].slice(0,-2)), y: parseInt(bA[2])}
    
    const bB = lines[1].split("+")
    const buttonB = { x: parseInt(bB[1].slice(0,-2)), y: parseInt(bB[2])}
    
    
    const p = lines[2].split("=")
    const price = { x: parseInt(p[1].slice(0,-2)), y: parseInt(p[2])}
    
    return { A: buttonA, B: buttonB, P: price}
})


let res = 0

for(const task of tasks) {
    let solutions = []

    let A = 0

    outer:
    while(true) {        
        let B = 0
        while(true) {

            const x = task.A.x*A + task.B.x*B
            const y = task.A.y*A + task.B.y*B

            if(x===task.P.x && y===task.P.y) {
                solutions.push(A*costs.A+B*costs.B)
            }


            if(x>=task.P.x || y>=task.P.y) {
                if(B === 0) break outer
                else break
            }

            B++
        }
        A++
    }

    if(solutions.length>0) res += solutions.sort()[0]
}

console.log("part1", res)