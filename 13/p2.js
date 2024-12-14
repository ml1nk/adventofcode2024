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
    const price = { x: parseInt(p[1].slice(0,-2))+10000000000000, y: parseInt(p[2])+10000000000000}
    
    return { A: buttonA, B: buttonB, P: price}
})


let res = 0

for(const task of tasks) {
    let solutions = []

    const dif = Math.abs((task.B.x-task.B.y) / (task.A.x-task.A.y))

    if(task.B.x === task.B.y) {
        const dif = task.A.x - task.A.y
        const price = task.P.x - task.P.y

        const A = price/dif
        const B = (task.P.x - task.A.x * A) / task.B.x


        console.log(task, A, B)

        if(!Number.isInteger(B) || !Number.isInteger(A)) continue

        res +=  A*costs.A+B*costs.B

        continue
    }

    if(task.A.x === task.A.y) {
        const dif = task.B.x - task.B.y
        const price = task.P.x - task.P.y
        
        const B = price/dif
        const A = (task.P.x - task.B.x * B) / task.A.x 

        if(!Number.isInteger(B) || !Number.isInteger(A)) continue

        res +=  A*costs.A+B*costs.B

        continue
    }

    const fac = 10000000000000 / (task.A.x*dif + task.B.x)

    const sub = 1000

    const base = Math.floor(fac) - sub

    let A = Math.floor(dif*fac) - sub

    outer:
    while(true) {        
        let B = base
        while(true) {

            const x = task.A.x*A + task.B.x*B
            const y = task.A.y*A + task.B.y*B

            if(x===task.P.x && y===task.P.y) {
                solutions.push(A*costs.A+B*costs.B)
                break outer
            }


            if(x>=task.P.x || y>=task.P.y) {
                if(B === base) break outer
                else break
            }

            B++
        }
        A++
    }

    if(solutions.length>0) res += solutions.sort()[0]
}

console.log("part2", res)