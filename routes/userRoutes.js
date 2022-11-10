const express = require('express');
const router = express.Router();

// Controllers
const usersController = require('../controllers/usersController');

// Middlewares
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router
	.route('/')
	.get(usersController.getAllUsers)
	.post(usersController.createNewUser)
	.patch(usersController.updateUser)
	.delete(usersController.deleteUser);

module.exports = router;
