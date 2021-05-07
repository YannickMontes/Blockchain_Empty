const dgram = require('dgram');
const constants = require('./constants');

let routingTable = [];
let isGenesis = true;

const socket = dgram.createSocket('udp4');

function createPingMessage()
{
	return Buffer.from(`${constants.ID}:${constants.UDP.PING_MESSAGE}`);
}

function createPongMessage()
{
	return Buffer.from(`${constants.ID}:${constants.UDP.PONG_MESSAGE}`);
}

function sendMessage(msg, port, address)
{
	socket.send(msg, 0, msg.length, port, address, (err) => {
		if(err)
			console.log(`Error sending ${msg} to ${address}:${port} : ${error}`);
	});
}

function getIsGenesis()
{
	return isGenesis;
}

function getRoutingTable()
{
	return routingTable;
}

//Lorsqu'on écoute, on active le broadcast
socket.on("listening", () => {
	socket.setBroadcast(true);
});

socket.on("error", (error) => {
	console.log(error);
});

//En réception d'un message
socket.on("message", (data, rinfo) =>
{
	let splitData = data.toString().split(":");
	let senderId = splitData[0];
	let msgReceived = splitData[1];
	//On ignore nos propres messages
	if(rinfo.address == constants.MY_LOCAL_IP)
	{
		return;
	}
	console.log("UDP MESSAGE RECEIVED ! from " + rinfo.address + " and we are " + constants.MY_LOCAL_IP);
	console.log(msgReceived + " received from [ip: ", rinfo.address, ", id: " + senderId +"]");

	if(msgReceived == constants.UDP.PONG_MESSAGE)
	{
		//Ajout a la table, on a pas a créer le noeud Genesis
		isGenesis = false;
		routingTable.push({ip: rinfo.address, id: senderId});
		return;
	}
	else if (msgReceived == constants.UDP.PING_MESSAGE)
	{
		//On ajoute a la table de routage, puis on réponds par un PONG.
		routingTable.push({ip: rinfo.address, id: senderId});
		sendMessage(createPongMessage(), constants.UDP.PORT_BROADCAST, rinfo.address);
	}
});

//On bind sur le broadcast
socket.bind(constants.UDP.PORT_BROADCAST, constants.UDP.IP_BORADCAST_REICIVING, () => {
	console.log(`UDP socket binded on ${constants.UDP.IP_BORADCAST_REICIVING}:${constants.UDP.PORT_BROADCAST}`);
});

//On envoie un UDP ping dès qu'on arrive sur le réseau
sendMessage(createPingMessage(), constants.UDP.PORT_BROADCAST, constants.UDP.IP_BROADCAST_SENDING);

module.exports = {getRoutingTable: getRoutingTable, getIsGenesis: getIsGenesis};