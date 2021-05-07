const {workerData, parentPort} = require('worker_threads');

//C'est ici que doit être gérer le minage. 

console.log(workerData);

// let block = (..);

// while(!block.proofOfWork())
// {
// 	//miner le block
// }

parentPort.postMessage('Le worker est en train de s exécuter');