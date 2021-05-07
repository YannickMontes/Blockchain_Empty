const blockchain = require('../models/Blockchain');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	if(blockchain.getLastBlock() == null)
	{
		console.log("Ma blockchain est vide ! Je lui demande de demander a qqun d'autre.");
		res.status(200).json({error: 'no blockchain on this peer'});
	}
	else
	{
		console.log("J'envoie la blockchain au nouveau!");
		res.status(200).json(blockchain.toJson());
	}
});

module.exports = router;