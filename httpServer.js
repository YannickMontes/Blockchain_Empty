const express = require('express');
const app = express();
app.use(express.json());

const constants = require("./constants");
const blockRoutes = require('./routes/blockRoutes');
const blockchainRoutes = require('./routes/blockchainRoutes');
app.use(constants.HTTP.BLOCK_ROOT_ROUTES, blockRoutes);
app.use(constants.HTTP.BLOCKCHAIN_ROOT_ROUTES, blockchainRoutes);

app.listen(constants.HTTP.LISTEN_PORT, () => 
	console.log(`Listening http request on port ${constants.HTTP.LISTEN_PORT}`));