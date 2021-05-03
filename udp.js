const dgram = require('dgram');
const constants = require('./constants');

let routingTable = [];
let isGenesis = true;

const socket = dgram.createSocket('udp4');

function getIsGenesis()
{
	return isGenesis;
}

function getRoutingTable()
{
	return routingTable;
}

socket.on("listening", () => {
	socket.setBroadcast(true);
});

socket.on("error", (error) => {
	console.log(error);
});

socket.on("message", (data, rinfo) =>
{
	//Vérifier si on reçoit un PING ou PONG
});

socket.bind(constants.UDP.PORT_BROADCAST, constants.UDP.IP_BORADCAST_REICIVING, () => {
	console.log(`UDP socket binded on ${constants.UDP.IP_BORADCAST_REICIVING}:${constants.UDP.PORT_BROADCAST}`);
});

module.exports = {getRoutingTable: getRoutingTable, getIsGenesis: getIsGenesis};