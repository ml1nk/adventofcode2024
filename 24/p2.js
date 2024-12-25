const fs = require('fs');


const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [inputRaw, gatesRaw] = data.split("\n\n")

const gates = new Map()
gatesRaw.split("\n").forEach(e => {
    const [in1, op, in2, _, out] = e.split(" ")
    const d = {
        in1,
        in2,
        op,
        out,
    }
    gates.set(out, d)
})


const switched = []

function switchGate(a,b) {
    switched.push(a)
    switched.push(b)

    const ag = gates.get(a)
    const bg = gates.get(b)

    ag.out = b
    bg.out = a

    gates.set(a, bg)
    gates.set(b, ag)

}

/**
 * Solved semiautomatic by counting xor/and/or gatter and trying to match it against binary adder.
 */
//switchGate("", "")
//switchGate("", "")
//switchGate("", "")
//switchGate("", "")


const input = new Map()
inputRaw.split("\n").forEach(e => {
    const [key, value] = e.split(": ")
    input.set(key, value === "1")
})

const bits = input.size/2

const x = getNumber("x")
const y = getNumber("y")

const output = getOutput(x, y)

let or = 0
let xor = 0
let and = 0

for(const [key, val] of output.entries()) {
    const gate = gates.get(key)
    console.log("")
    console.log("solve", key)
    or = 0
    xor = 0
    and = 0

    const res = solve(gate)

    console.log("")
    console.log(or, xor, and)

    if(res !== val) {
        console.log(key, "expected", val, "got", res)
    }
}

console.log("part2", switched.sort().join(","))


function solve(gate) {

    let in1 = input.get(gate.in1)
    if(in1 === undefined) {
        process.stdout.write("("+gate.in1 + ":")
        in1 = solve(gates.get(gate.in1))
        process.stdout.write(")")
    } else process.stdout.write(gate.in1);

        
    process.stdout.write(" " + gate.op + " ")

    let in2 = input.get(gate.in2)
    if(in2 === undefined) {
        process.stdout.write("("+gate.in2 + ":")
        in2 = solve(gates.get(gate.in2))
        process.stdout.write(")");
    } else process.stdout.write(gate.in2);



    switch (gate.op) {
        case "AND":
            and++
            return in1 && in2
        case "OR":
            or++
            return in1 || in2
        case "XOR":
            xor++
            return !in1 != !in2
    }
}

function getNumber(char) {
    let res=0
    for(let i=0; i<bits; i++) {
        if(input.get(char+i.toString().padStart(2, '0'))) res += Math.pow(2, i)
    }
    return res
}

function getOutput(x, y) {
    const output = new Map()
    let z = (x + y) % Math.pow(2, bits)
    console.log(z)
    for(i=0; i<bits; i++) {
        output.set("z"+i.toString().padStart(2, '0'), z%2 == 1)
        z = Math.floor(z/2)
    }
    console.log(output)

    return output
}