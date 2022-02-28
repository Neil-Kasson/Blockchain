const Blockchain = require ('./blockchain')
const Block = require('./block')

describe('Blockchain', ()=>{
    let blockchain, newChain, originalChain

    beforeEach(()=>{
        blockchain = new Blockchain()
        newChain = new Blockchain()
        originalChain = blockchain.chain
    })

    it('contains `chain` Array instance', ()=>{
        expect(blockchain.chain instanceof Array).toBe(true)
    })

    it('starts with genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    })

    it('adds new block to chain', ()=>{
        const newData = 'foo bar'
        blockchain.addBlock({data: newData})
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData)
    })

    describe('isValidChain()', ()=>{
        describe('when chain doesn nott start with genesis block', ()=>{
            it('returns false', ()=>{
                blockchain.chain[0] = {data:'fake-genesis'}
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
            })
        })

        describe('when chain starts with genesis block and has multiple blocks', ()=>{
            beforeEach(()=>{
                blockchain.addBlock({data:'Bears'})
                blockchain.addBlock({data:'Beats'})
                blockchain.addBlock({data:'Battlestar Galactica'})
            })

            describe('and a lastHash value reference has changed', ()=>{
                it('returns false', ()=>{
                    blockchain.chain[2].lastHash = 'broken-lastHash'
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
            describe('and chain contains block with an invalid field', ()=>{
                it('returns false', ()=>{
                    blockchain.chain[2].data = 'bad data'
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                })
            })
            describe('and the chain does not contain any invalid blocks', ()=>{
                it('returns true', ()=>{
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
                })
            })
        })
    })

    describe('replaceChain()', ()=>{
        let errorMock, logMock
        beforeEach(()=>{
            errorMock = jest.fn()
            logMock = jest.fn()

            global.console.error = errorMock
            global.console.log = logMock
        })

        describe('when new chain is not longer', ()=>{
            beforeEach(()=>{
                newChain.chain[0] = {new: 'chain'}
                blockchain.replaceChain(newChain.chain)
            })
            
            it('does not replace chain', ()=>{
                expect(blockchain.chain).toEqual(originalChain)
            })

            it('logs an error', ()=>{
                expect(errorMock).toHaveBeenCalled()
            })
        })

        describe('when new chain is longer', ()=>{
            beforeEach(()=>{
                newChain.addBlock({data:'Bears'})
                newChain.addBlock({data:'Beats'})
                newChain.addBlock({data:'Battlestar Galactica'})
            })
            
            describe('and the chain is invalid', ()=>{
                it('does not replace chain', ()=>{
                    newChain.chain[2].hash = 'some-fake-hash'
                    blockchain.replaceChain(newChain.chain)
                    expect(blockchain.chain).toEqual(originalChain)
                })
            })

            describe('and the chain is valid', ()=>{
                it('replaces chain', ()=>{
                    blockchain.replaceChain(newChain.chain)
                    expect(blockchain.chain).toEqual(newChain.chain)
                })
            })
        })
    })
})