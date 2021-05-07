let blockHashes_validated_by_ip = {};//Pour chaque block, on enregistre les IP qui ont accepté 
let waiting_blocks = {}; //Liste des blocks en attente

/*
	C'est lui qui s'occupera de répondre aux requêtes HTTP. 
	Il contiendra également les blocks en attente de validation. 
	
	La déclaration des fonctions est là pour vous aider,
	mais vous êtes libre des les modifier/supprimer, d'en ajouter.
*/

function checkBlock(req, res)
{
	//Check si le block reçu est correct & mieux que ceux en attente
	//Si oui
		//On envoie un refuse pour tout ceux en attente
		//On supprime tout les blocks en attente
		//On ajoute le block a la liste d'attente
		//On envoie un accept pour ce block à tout le monde
	//Si non
		//On envoie un refuse
	res.status(200).json({status: 'success'});
}

function acceptBlock(req, res)
{
	//On ajoute le block à la liste d'attente
	//On prends en compte le fait que l'IP d'ou vient la requête à déjà accepté le block
	//Si tout le  monde l'a accepté
		//Ajout du block a la blockchain
	res.status(200).json({status:'success'});
}

function refuseBlock(req, res)
{
	//On supprime le block de la liste d'attente
	res.status(200).json({status:'success'});
}

module.exports = {acceptBlock:acceptBlock,
					refuseBlock: refuseBlock,
					checkBlock:checkBlock}