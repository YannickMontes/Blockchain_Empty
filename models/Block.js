const cryptoJS = require("crypto-js");

class Block
{
	constructor(newIndex, oldHash, sender, receiver, msg)
	{
		this.index = newIndex;
		this.data = {sender_id: sender, receiver_id: receiver, message: msg}
		this.previous_hash = oldHash;
		this.timeStamp = new Date().getTime();
		this.nonce = -1;
		this.mineHash();
	}

	initFromJSON(blockJson)
	{
		this.index = blockJson.index;
		this.previous_hash = blockJson.previous_hash;
		this.timeStamp = blockJson.timeStamp;
		this.nonce = blockJson.nonce;
		this.hash = blockJson.hash;
		this.data = {sender_id:  blockJson.data.sender_id, receiver_id: blockJson.data.receiver_id, message: blockJson.data.message};
	}

	mineHash()
	{
		this.nonce++;
		let toHash = this.timeStamp + this.index + this.previous_hash + JSON.stringify(this.data) + this.nonce;
		this.hash = cryptoJS.SHA256(toHash).toString();
	}

	displayBlock()
	{
		console.log('index: ' + this.index);
		console.log('timeStamp: ' + this.timeStamp);
		console.log('previous_hash: ' + this.previous_hash);
		console.log('hash: ' + this.hash);
		console.log('nonce: ' + this.nonce);
		console.log('sender_id: ' + this.data.sender_id);
		console.log('receiver_id: ' + this.data.receiver_id);
		console.log('message: ' + this.data.message);
	}

	proofOfWork()
	{
		return (parseInt(this.hash, 16)%7 == 0);
	}

	toJson()
	{
		let blockToJson = {
			index: this.index,
			timeStamp: this.timeStamp,
			previous_hash: this.previous_hash,
			hash: this.hash,
			nonce: this.nonce,
			data:{
				sender_id: this.data.sender_id,
				receiver_id: this.data.receiver_id,
				message: this.data.message
			}
		};
		return blockToJson;
	}
};

module.exports = Block;
