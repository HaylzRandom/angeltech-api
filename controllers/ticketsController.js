const User = require('../models/User');
const Ticket = require('../models/ticket');
const bcrypt = require('bcrypt');

// @desc Get all tickets
// @route GET /tickets
// @access Private
const getAllTickets = async (req, res) => {
	// Find all tickets
	const tickets = await Ticket.find().lean().exec();

	// No tickets exists
	if (!tickets?.length)
		return res.status(400).json({ mesage: 'No tickets can be found' });

	const ticketsWithCustomer = await Promise.all(
		tickets.map(async (ticket) => {
			const user = await User.findById(ticket.customer).lean().exec();
			return { ...ticket, customer: user.username };
		})
	);
	const ticketsWithAssigned = await Promise.all(
		ticketsWithCustomer.map(async (ticket) => {
			let user;

			if (ticket?.assigned) {
				user = await User.findById(ticket.assigned).lean().exec();
			} else {
				user = '';
			}

			return { ...ticket, assigned: user?.username };
		})
	);

	// Return tickets
	res.json(ticketsWithAssigned);
};

// @desc Create New Ticket
// @route POST /tickets
// @access Private
const createNewTicket = async (req, res) => {
	const { customer, title, text, category, assigned } = req.body;

	// Confirm data
	if (!customer || !title || !category || !text) {
		return res.status(400).json({
			message: 'Customer, Category, Title and Text is required! ',
		});
	}

	const user = await User.findById(customer).lean().exec();

	const ticketObject = {
		customer: user._id,
		title,
		text,
		category,
		assigned,
	};

	// Create and store new ticket
	const ticket = await Ticket.create(ticketObject);

	if (ticket) {
		res.status(201).json({
			message: `New ticket has been created!`,
		});
	} else {
		res.status(400).json({ message: 'Invalid ticket data received!' });
	}
};

// @desc Update a Ticket
// @route PATCH /ticket
// @access Private
const updateTicket = async (req, res) => {
	const { id, customer, category, title, text, assigned, completed } = req.body;

	// Confirm data
	if (
		!id ||
		!customer ||
		!category ||
		!title ||
		!text ||
		typeof completed !== 'boolean'
	) {
		return res.status(400).json({
			message:
				'ID, Customer, Category, Title, Text and Completed Status is required! ',
		});
	}

	// Find ticket by ID
	const ticket = await Ticket.findById(id).exec();

	// If ticket does not exist
	if (!ticket)
		return res.status(400).json({ mesage: 'Ticket cannot be found' });

	// Check if assigned field is empty
	if (assigned === '' || !assigned) {
		ticket.customer = customer;
		ticket.category = category;
		ticket.title = title;
		ticket.text = text;
		ticket.assigned = null;
		ticket.completed = completed;
	} else {
		const user = await User.findById(assigned).lean().exec();

		ticket.customer = customer;
		ticket.category = category;
		ticket.title = title;
		ticket.text = text;
		ticket.assigned = user._id;
		ticket.completed = completed;
	}

	const updatedTicket = await ticket.save();

	res.json({ message: `${updatedTicket.title} updated` });
};

// @desc Delete Ticket
// @route DELETE /tickets
// @access Private
const deleteTicket = async (req, res) => {
	const { id } = req.body;

	// Confirm ID been entered
	if (!id) return res.status(400).json({ mesage: 'Ticket ID is required' });

	// Confirm ticket exists
	const ticket = await Ticket.findById(id).exec();

	// If ticket cannot be found
	if (!ticket) return res.status(400).json({ message: 'Ticket not found' });

	// Delete User
	const result = await ticket.deleteOne();

	const reply = `Ticket ${result.title} with ID ${result._id} deleted!`;

	res.json(reply);
};

module.exports = {
	getAllTickets,
	createNewTicket,
	updateTicket,
	deleteTicket,
};
