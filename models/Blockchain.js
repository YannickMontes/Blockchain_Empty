const Block = require('./Block.js');

class Blockchain
{
	constructor()
	{
		this.blocks = new Array();
	}

	addBlock(block)
	{
		this.blocks.push(block);
	}

	getGenesis()
	{
		return this.blocks[0];
	}

	getLastBlock()
	{
		return this.blocks[this.blocks.length - 1];
	}

	toJson()
	{
		var blockChainToJson = {blockChain:this.blocks};
		return blockChainToJson;
	}

	createBlockChainFromJson(json)
	{
		var blockChainJson = json;
		this.blocks = blockChainJson.blockChain;
	}

	createBlockFromJson(json)
	{
		let block = new Block(false);
		block.initFromJSON(json);
		return block;
	}
};

let blockchain = new Blockchain();

module.exports = blockchain;
