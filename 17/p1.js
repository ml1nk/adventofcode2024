const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const field = data.split('\n\n')

let [A, B, C] = field[0].split("\n").map(e=>parseInt(e.split(": ")[1]))


const program = field[1].split(": ")[1].split(",").map(e=>parseInt(e))
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
            B = B ^ C
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

console.log("part1", output.join(","))