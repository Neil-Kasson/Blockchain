const Blockchain = require('./blockchain')

const blockchain = new Blockchain()
blockchain.addBlock({data: 'initial'})

let prevTimestamp, nextBlock, timeDiff, average
const times = []

for(let i=0; i<10000; i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp

    blockchain.addBlock({data: `block ${i}`})
    nextBlock = blockchain.chain[blockchain.chain.length-1]

    nextTimestamp = nextBlock.timestamp
    timeDiff = nextTimestamp-prevTimestamp
    times.push(timeDiff)

    average = times.reduce((total, num) => (total+num))/times.length

    console.log(`Block number ${i} \nDifficulty: ${nextBlock.difficulty}. \nNonce: ${nextBlock.nonce} \nTime to mine block: ${timeDiff}ms. \nAverage time: ${average}\n`)
}