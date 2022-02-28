// const datHash = (data) => {
//     return data + '*';
// }

// class Block {
//     constructor(data, hash, lastHash){
//         this.data = data;
//         this.hash = hash;
//         this.lastHash = lastHash;
//     }
// }

// class Blockchain {
//     constructor(){
//         const genesis = new Block('gen-data', 'gen-hash', 'gen-lastHash');
//         this.chain = [genesis];
//     }

//     addBlock(data){
//         const lastHash = this.chain[this.chain.length-1].hash;

//         const hash = datHash(data + lastHash);

//         const block = new Block(data, hash, lastHash);

//         this.chain.push(block);
//     }
// }

// const fooChain = new Blockchain();
// fooChain.addBlock('one');
// fooChain.addBlock('two');
// fooChain.addBlock('three');

// console.log(fooChain);

// // const fooBlock = new Block('foo-data', 'foo-hash', 'foo-lastHash');
// // console.log(fooBlock);