const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const sequences = data.split("\n")

const keypad = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [undefined, 0, "A"]
]

const cache = new Map()


const keypadMap = genMap(keypad)

const directional = [
    [undefined, "^", "A"],
    ["<", "v", ">"]
]

const directionalMap = genMap(directional)



const shorts = []


let iterations = 25


for (const sequence of sequences) {
    let currentInput = getResolvedKeypad(sequence)

    let startMap = new Map()

    for(const a of currentInput.split("A").slice(0,-1)) {
        const res = startMap.get(a + "A")
        startMap.set(a + "A", (res??0)+1)
    }

    for (let i = 0; i < iterations; i++) {
        startMap = getResolved(startMap)
    }

    let size = 0
    for(const [key, val] of startMap.entries()) {
        size += key.length*val
    }

    shorts.push(size)
}


const res = shorts.reduce((p, c, i) => p + c * parseInt(sequences[i]), 0)
console.log(res)


function getResolvedKeypad(sequence) {
    let curPos = keypadMap["A"]
    let res = ""

    for (const c of sequence) {
        let nextPos = keypadMap[c]
        res += getShortest(keypad, curPos, nextPos) + "A"
        curPos = nextPos
    }

    return res
}

function getResolved(curMap) {
    const newMap = new Map()

    for(const [sequence, val] of curMap.entries()) {
        let cur = 'A'

        for (const c of sequence) {
            let nextPos = directionalMap[c]
            let curPos = directionalMap[cur]
            let ca = getShortest(directional, curPos, nextPos) + "A"
            const res = newMap.get(ca)
            newMap.set(ca, (res??0)+val)
            cur = c
        }
    }

    return newMap
}


function getShortest(data, from, to) {
    if (from.x === to.x && from.y === to.y) return ""

    let x = (from.x < to.x ? ">" : "<").repeat(Math.abs(from.x - to.x))
    let y = (from.y < to.y ? "v" : "^").repeat(Math.abs(from.y - to.y))

    if (data[to.y][from.x] === undefined) return x + y
    if (data[from.y][to.x] === undefined) return y + x

    if (from.x < to.x) return y + x
    if (from.y > to.y) return x + y
    
    return x+y
}

function genMap(data) {
    const resMap = {}

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            const el = data[y][x]
            if (el === undefined) continue
            resMap[el] = { x, y }
        }
    }

    return resMap
}

