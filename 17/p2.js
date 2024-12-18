const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const field = data.split('\n\n')

let [A, B, C] = field[0].split("\n").map(e=>parseInt(e.split(": ")[1]))
const program = field[1].split(": ")[1].split(",").map(e=>parseInt(e))

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

function solve(pos, base) {
    base = base * Math.pow(2, 3)
    
    success = false
    for(let i=0; i<8; i++) {
        const output = runToCopy(program, base+i, B, C)
        const sub = program.slice(pos)
        if(arraysEqual(output, sub)) {
            if(pos === 0) return base+i
            const res = solve(pos-1, base+i)
            if(res !== undefined) {
                return res
            }
        }
    }
}

const res = solve(program.length-1, 0)

console.log("part2", res)

function runToCopy(program, A, B, C) {
    //console.log(A)
    let pointer = 0
    const output = []
    while(pointer<program.length) {
        const command = program[pointer]
    
        switch(command) {
            case 0: // adv
                A = Math.floor(A/Math.pow(2, comboOperand()))
                break;
            case 1: // bxl
                B = B ^ literalOperand()
                break;
            case 2: // bst
                B = comboOperand() % 8
                break;
            case 3: // jnz
                if(A === 0) break;
                pointer = literalOperand()
                continue
            case 4: // bxc
                B = (B%8) ^ (C%8) // hack to prevent negative integer on large ints, not working on all inputs
                break;
            case 5: // out
                output.push(comboOperand() % 8)
                break;
            case 6: // bdv
                B = Math.floor(A/Math.pow(2, comboOperand()))
                break;
            case 7: // cdv
                C = Math.floor(A/Math.pow(2, comboOperand()))
        }
    
        pointer +=2
    }

    return output
    
    function literalOperand() {
        return program[pointer+1]
    }
    
    function comboOperand() {
        const combo = program[pointer+1]
        switch(combo) {
            case 0:
                return 0
            case 1:
                return 1
            case 2: 
                return 2
            case 3:
                return 3
            case 4: 
                return A
            case 5:
                return B
            case 6: 
                return C
            default:
                console.error("operand invalid")
        }
    }
    
}