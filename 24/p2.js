const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [input, gates] = data.split("\n\n")


const queue = []

input.split("\n").forEach(e => {
    const [key, value] = e.split(": ")
    queue.push([key, value === "1"])
})

const logic = []

const trigger = new Map()

gates.split("\n").forEach(e => {
    const [in1, op, in2, _, out] = e.split(" ")

    const d = {
        in: [in1, in2],
        op,
        out,
    }

    d.in.forEach(e => {
        const t = trigger.get(e)
        if (t === undefined) trigger.set(e, new Set([d]))
        else t.add(d)
    })

    logic.push(d)
})

for(let p1i=0; p1i<queue.length; p1i++) {
    for(let p1p=p1i+1; p1p<queue.length; p1p++) {
        [input[p1i].out, input[p1p].out] = [input[p1p].out, input[p1i].out]

        for(let p2i=0; p2i<queue.length; p2i++) {
            if(p2i === p1i || p2i === p1p) continue
            for(let p2p=p2i+1; p2p<queue.length; p2p++) {
                if(p2p === p1i || p2p === p1p) continue
                [input[p2i].out, input[p2p].out] = [input[p2p].out, input[p2i].out]
                const a = solve([...queue])
                if(isValid(a)) {
                    console.log(input[p1i].out, input[p1p].out)
                    process.exit(0)
                }
                [input[p2i].out, input[p2p].out] = [input[p2p].out, input[p2i].out]

            }
        }
        [input[p1i], input[p1p]] = [input[p1p], input[p1i]]
    }
}


function solve(queue) {
    const state = new Map()
    while (queue.length > 0) {
        const el = queue.shift()

        if (state.has(el[0])) {
            console.error("state already exists", el, state.has(el[0]))
            process.exit(1)
        }

        state.set(el[0], el[1])

        const relevant = trigger.get(el[0])
        if (relevant === undefined) continue
        for (const key of relevant.keys()) {
            const inp = key.in.map(e => state.get(e))
            if (inp.some(e => e === undefined)) continue
            queue.push([key.out, out(key.op, inp)])
        }

    }

    return state
}


function isValid(state) {
    const rFilter = [...state.entries()]
        .filter(e => e[0].startsWith("z"))

    const mod = Math.pow(2, rFilter.length)

    const zRes = rFilter
        .sort((e, f) => e[0].localeCompare(f[0]))
        .reduce((p, e, i) => p + (e[1] ? Math.pow(2, i) : 0), 0)


    const xRes = [...state.entries()]
        .filter(e => e[0].startsWith("x"))
        .sort((e, f) => e[0].localeCompare(f[0]))
        .reduce((p, e, i) => p + (e[1] ? Math.pow(2, i) : 0), 0)

    const yRes = [...state.entries()]
        .filter(e => e[0].startsWith("y"))
        .sort((e, f) => e[0].localeCompare(f[0]))
        .reduce((p, e, i) => p + (e[1] ? Math.pow(2, i) : 0), 0)

    return zRes === (xRes + yRes) % mod
}

function out(op, inp) {
    switch (op) {
        case "AND":
            return inp.every(e => e === true)
        case "OR":
            return inp.some(e => e === true)
        case "XOR":
            return inp.reduce((p, e) => !p != !e, false)
    }
}