const User = require('../models/User');
const Ticket = require('../models/ticket');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
	// Find all users but do not return password
	const users = await User.find().select('-password').lean().exec();

	// No users exists
	if (!users?.length)
		return res.status(400).json({ mesage: 'No users can be found' });

	// Return users
	res.json(users);
};

// @desc Create New User
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
	const { username, password, email, roles, firstName, lastName } = req.body;

	// Confirm data
	if (
		!username ||
		!password ||
		!email ||
		!firstName ||
		!lastName ||
		!Array.isArray(roles) ||
		!roles.length
	) {
		return res.status(400).json({
			message:
				'Username, Password, Email Address, First Name, Last Name and Roles are required! ',
		});
	}

	// Check for duplicate username
	const duplicateUsername = await User.findOne({ username })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	if (duplicateUsername)
		return res.status(409).json({ message: 'Duplicate username' });

	// Check for duplicate email
	const duplicateEmail = await User.findOne({ email })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	if (duplicateEmail)
		return res.status(409).json({ message: 'Duplicate email address' });

	// Hash Password
	const hashedPassword = await bcrypt.hash(password, 10); // Salt Rounds

	const userObject = {
		username,
		password: hashedPassword,
		email,
		firstName,
		lastName,
		roles,
	};

	// Create and store new user
	const user = await User.create(userObject);

	if (user) {
		res.status(201).json({ message: `New user ${username} has been created!` });
	} else {
		res.status(400).json({ message: 'Invalid user data received!' });
	}
};

// @desc Update a User
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
	const { id, username, password, email, roles, firstName, lastName, active } =
		req.body;

	// Confirm data
	if (
		!id ||
		!username ||
		!email ||
		!firstName ||
		!lastName ||
		!Array.isArray(roles) ||
		!roles.length ||
		typeof active !== 'boolean'
	) {
		return res.status(400).json({
			message:
				'Username, Email Address, First Name, Last Name and Roles are required! ',
		});
	}

	// Find user by ID
	const user = await User.findById(id).exec();

	// If user does not exist
	if (!user) return res.status(400).json({ mesage: 'User cannot be found' });

	// Check for duplicate username
	const duplicateUsername = await User.findOne({ username })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	// Allow update to original user
	if (duplicateUsername && duplicateUsername?._id.toString() !== id)
		return res.status(409).json({ message: 'Duplicate username' });

	// Check for duplicate email
	const duplicateEmail = await User.findOne({ email })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	// Allow update to original user
	if (duplicateEmail && duplicateEmail?._id.toString() !== id)
		return res.status(409).json({ message: 'Duplicate email address' });

	user.username = username;
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.roles = roles;
	user.active = active;

	if (password) {
		// Hash Password
		user.password = await bcrypt.hash(password, 10);
	}

	const updatedUser = await user.save();

	res.json({ message: `${updatedUser.username} updated` });
};

// @desc Delete User
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
	const { id } = req.body;

	// Confirm ID been entered
	if (!id) return res.status(400).json({ mesage: 'User ID is required' });

	// Check if user has tickets assigned to them
	const assignedTicket = await Ticket.findOne({ assigned: id }).lean().exec();

	if (assignedTicket)
		return res
			.status(400)
			.json({ message: 'User still has tickets assigned to them' });

	// TODO: Check if user has open tickets they created still attached to them

	const user = await User.findById(id).exec();

	// If user cannot be found
	if (!user) return res.status(400).json({ message: 'User not found' });

	// Delete User
	const result = await user.deleteOne();

	const reply = `Username ${result.username} with ID ${result._id} deleted!`;

	res.json(reply);
};

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
};
