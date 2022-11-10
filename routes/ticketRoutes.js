const express = require('express');
const router = express.Router();

// Controllers
const ticketsController = require('../controllers/ticketsController');

// Middlewares
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router
	.route('/')
	.get(ticketsController.getAllTickets)
	.post(ticketsController.createNewTicket)
	.patch(ticketsController.updateTicket)
	.delete(ticketsController.deleteTicket);

module.exports = router;
