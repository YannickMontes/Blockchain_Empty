const constants = require('./constants');
const udp = require('./udp');
const fetch = require('node-fetch');
const utils = require('./utils');

function sendAcceptToAll(block)
{
	console.log("J'envoie un ACCEPT pour le block "+ utils.get4subCharOf(block.hash));
	udp.getRoutingTable().forEach(destHost => sendAcceptBlock(destHost.ip, block));
}

function sendRefuseToAll(block)
{
	console.log("J'envoie un REFUSE pour le block "+ utils.get4subCharOf(block.hash));
	udp.getRoutingTable().forEach(destHost => sendRefuseBlock(destHost.ip, block));
}

function sendCheckToAll(block)
{
	console.log("J'envoie le block "+utils.get4subCharOf(block.hash));
	udp.getRoutingTable().forEach(destHost => sendCheckBlock(destHost.ip, block));
}

function sendGetBlockchain(index, callback)
{
	let destIp = udp.getRoutingTable()[index].ip;
	let url = `http://${destIp}:${constants.HTTP.LISTEN_PORT}${constants.HTTP.BLOCKCHAIN_ROOT_ROUTES}`;
	sendHTTPRequest(url, 'GET', null, callback);
}

function sendAcceptBlock(destIp, block)
{
	let url = `http://${destIp}:${constants.HTTP.LISTEN_PORT}${constants.HTTP.BLOCK_ROOT_ROUTES}${constants.HTTP.ACCEPT_BLOCK_ROUTE}`;
	sendHTTPRequest(url, 'POST', {block: block}, null);
}

function sendRefuseBlock(destIp, block)
{
	let url = `http://${destIp}:${constants.HTTP.LISTEN_PORT}${constants.HTTP.BLOCK_ROOT_ROUTES}${constants.HTTP.REFUSE_BLOCK_ROUTE}`;
	sendHTTPRequest(url, 'POST', {block: block}, null);
}


function sendCheckBlock(destIp, block)
{	
	let url = `http://${destIp}:${constants.HTTP.LISTEN_PORT}${constants.HTTP.BLOCK_ROOT_ROUTES}${constants.HTTP.CHECK_BLOCK_ROUTE}`;
	sendHTTPRequest(url, 'POST', {block: block}, null);
}

function sendHTTPRequest(url, method, bodyJson, callback)
{
	fetch(url, {
		headers : constants.HTTP.HEADERS,
		method: method,
		body: JSON.stringify(bodyJson)
	})
	.then((resp) => resp.json())
	.then(callback)
	.catch((error) => console.log(error));
}

module.exports = {sendAcceptToAll: sendAcceptToAll, 
	sendRefuseToAll: sendRefuseToAll,
	sendCheckToAll: sendCheckToAll,
	sendGetBlockchain: sendGetBlockchain
}