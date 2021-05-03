function get4subCharOf(string)
{
	return string.substr(0,4);
}

function getIpFromRequest(req)
{
	let ip = req.headers['x-forwarded-for'] ||
		 req.connection.remoteAddress ||
		 req.socket.remoteAddress ||
		 (req.connection.socket ? req.connection.socket.remoteAddress : null);
	let split = ip.split(":");
	ip = split[split.length-1];
	return ip;
}

module.exports = {get4subCharOf: get4subCharOf,
					getIpFromRequest: getIpFromRequest};