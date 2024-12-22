const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const sequences = data.split("\n")

const keypad = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [undefined, 0, "A"]
]

const keypadMap = genMap(keypad)

const directional = [
    [undefined, "^", "A"],
    ["<", "v", ">"]
]

const directionalMap = genMap(directional)


//console.log(findShortest(keypad, { x: 0, y: 0 }, { x: 2, y: 3 }))


function getResolved(data, dataMap, sequence) {
    let curPos = dataMap["A"]
    let possibleSequences = [[]]
    for (const c of sequence) {
        let nextPos = dataMap[c]
        const res = findShortest(data, curPos, nextPos)
        const tmp = []
        possibleSequences.forEach(f => {
            res.forEach(e => {
                tmp.push([...f, ...e, "A"])
            })
        })
        possibleSequences = tmp

        curPos = nextPos
    }
    return possibleSequences.map(e=>e.join(""))
}


const shorts = []


for(const sequence of sequences) {
    const keypadResolved = getResolved(keypad, keypadMap, sequence)

    const directionalResolved = []
    for(const seq of keypadResolved) {
        directionalResolved.push(...getResolved(directional, directionalMap, seq))
    }
    
    
    let shortest = undefined
    for(const seq of directionalResolved) {
        resolved = getResolved(directional, directionalMap, seq)
        for(const resolve of resolved) {
            if(shortest === undefined || shortest > resolve.length) shortest = resolve.length
        }
    }
    
    shorts.push(shortest)
}


const res = shorts.reduce((p,c,i)=>p+c*parseInt(sequences[i]),0)

console.log(res)



function findShortest(data, from, to, path = []) {
    const results = []

    if (data[from.y]?.[from.x] === undefined) return []
    if (from.x === to.x && from.y === to.y) return [path]


    if (from.x < to.x) {
        results.push(...findShortest(data, { x: from.x + 1, y: from.y }, to, [...path, ">"]))
    } else if (from.x > to.x) {
        results.push(...findShortest(data, { x: from.x - 1, y: from.y }, to, [...path, "<"]))
    }

    if (from.y < to.y) {
        results.push(...findShortest(data, { x: from.x, y: from.y + 1 }, to, [...path, "v"]))
    } else if (from.y > to.y) {
        results.push(...findShortest(data, { x: from.x, y: from.y - 1 }, to, [...path, "^"]))
    }

    return results
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

