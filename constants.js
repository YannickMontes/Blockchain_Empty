const os = require('os');

const constants = {
	ID: os.hostname(),
	MY_LOCAL_IP:  require('my-local-ip')(),
	MIN_TIME_MINAGE:5000,
	MAX_TIME_MINAGE:10000,
	ALL_MESSAGES: ["Chocolatine n'est pas un mot", "Tiens 100€", "J'adore l'eau", "Dans 20 30 ans y en aura plus"],
	UDP: {
		TIMEOUT: 2000,
		PORT_BROADCAST: 3000,
		IP_BROADCAST_SENDING: '255.255.255.255',
		IP_BORADCAST_REICIVING: '0.0.0.0',
		PING_MESSAGE: "PING !",
		PONG_MESSAGE: "PONG !"
	},
	HTTP: {
		LISTEN_PORT: 4000,
		FETCH_TIMEOUT: 5000,
		HEADERS: {'Content-Type': 'application/json'},
		BLOCK_ROOT_ROUTES: '/block',
		CHECK_BLOCK_ROUTE: '/check',
		ACCEPT_BLOCK_ROUTE: '/accept',
		REFUSE_BLOCK_ROUTE: '/refuse',
		BLOCKCHAIN_ROOT_ROUTES: '/blockchain'
	},
};

module.exports = constants;
