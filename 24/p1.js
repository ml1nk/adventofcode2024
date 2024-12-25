const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [input, gates] = data.split("\n\n")

const state = new Map()

const queue = []

input.split("\n").forEach(e=>{
    const [key, value] = e.split(": ")
    queue.push([key, value === "1"])
})

const logic = []

const trigger = new Map()

gates.split("\n").forEach(e=>{
    const [in1, op, in2, _, out] = e.split(" ")

    const d = {
        in: [in1, in2],
        op,
        out,
    }

    d.in.forEach(e=>{
        const t = trigger.get(e)
        if(t===undefined) trigger.set(e, new Set([d]))
        else t.add(d)
    })

    logic.push(d)
})


while(queue.length>0) {
    const el = queue.shift()

    if(state.has(el[0])) {
        console.error("state already exists", el, state.has(el[0]))
        process.exit(1)
    }

    state.set(el[0], el[1])

    const relevant = trigger.get(el[0])
    if(relevant === undefined) continue
    for(const key of relevant.keys()) {
        const inp = key.in.map(e=>state.get(e))
        if(inp.some(e=>e===undefined)) continue
        queue.push([key.out, out(key.op, inp)])
    }

}


const finalStates = [...state.entries()].sort((e,f)=>f[0].localeCompare(e[0]))
const res = parseInt(finalStates.filter(e=>e[0].startsWith("z")).map(e=>e[1] ? "1" : "0").join(""),2)

console.log("part1", res)


console.log(out("XOR", [false, false]))

function out(op, inp) {
    switch (op) {
        case "AND":
            return inp.every(e=>e === true)
        case "OR":
            return inp.some(e=>e === true)
        case "XOR":
            return inp.reduce((p,e)=>!p != !e, false)
    }
}