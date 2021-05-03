const cryptoJS = require("crypto-js");

class Block
{
	/*
	Un noeud peut ressembler à ça
	Le hash d'un noeud, pour être validé par le réseau, doit être divisble par 7. 
		{
			"index":1,
			"data":{
				"sender_id":"f829932beefe",
				"receiver_id":"dc97d7102ad7",
				"message":"Chocolatine n'est pas un mot"
			}
			"previous_hash":"6acbed0b530bf4ab0236dbf62b4cc8a8d1780d9f6571e6db16b0455baf9a2bd3",
			"timeStamp":1620076673237,
			"nonce":4,
			"hash":"ab0e99574c1c00c25bc5a1918538cc0cf23d185c03035ebd0d27135fa894f2eb"
		}
	*/

	proofOfWork()
	{
		return (parseInt(this.hash, 16)%7 == 0);
	}
};