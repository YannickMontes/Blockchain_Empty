const { Worker } = require('worker_threads');
const Block = require('./models/Block');
const blockchain = require('./models/Blockchain');
const constants = require("./constants");
const udp = require('./udp');
const blockController = require('./controllers/blockController');
const utils = require('./utils');
const httpServer = require('./httpServer');

const requests = require('./requests');

let IS_MINING = false;
let tmpIndex = 0;

//Se lance TIMOUT secondes après la création du noeud.
setTimeout(function(){
	//Si on a pas reçu de UDP pong, Genesis
	if(udp.getIsGenesis())
	{
		console.log("Je suis le premier noeud!! \o/");
		let newBlock = new Block(0,0,constants.ID,null,"Genesis BLOCK!");
		while(!newBlock.proofOfWork())
		{
			newBlock.mineHash();
		}
		blockchain.addBlock(newBlock);
		console.log(`J'ai créer le block genesis !`);
		//Lancer le minage
	}
	else
	{
		console.log("Je suis pas le premier... :'(\nJe demande la blockchain");
		requests.sendGetBlockchain(tmpIndex, onBlockchainResponse);
	}
}, constants.UDP.TIMEOUT);

function onBlockchainResponse(jsonResp)
{
	if(jsonResp.error == null)
	{
		blockchain.createBlockChainFromJson(jsonResp);
		//Lancer le minage
	}
	else
	{
		tmpIndex++;
		requests.sendGetBlockchain(tmpIndex, onBlockchainResponse);
	}
}

function getRandomInt(maxValue)
{
	return Math.floor(Math.random() * maxValue);
}

// EXEMPLE D'UTILISATION WORKER THREAD

function workerMine()
{
	return new Promise((resolve, reject) => {
		const worker = new Worker('./mine.js', { workerData: {id:27}});

		worker.on('message', workerMessage => {
			console.log(workerMessage);
			return resolve;
		});
		worker.on('error', reject);
		worker.on('exit', code => {
			if(code !== 0)
				reject(new Error(`Probleme execution du worker, code ${code}`));
			else
				console.log('Worker bien terminé.');
		});
	});
}

async function main()
{
	await workerMine();
}

main();

