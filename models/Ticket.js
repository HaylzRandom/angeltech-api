const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ticketSchema = new mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		category: {
			type: String,
			required: true,
			default: 'Laptop',
		},
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		assigned: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

ticketSchema.plugin(AutoIncrement, {
	inc_field: 'ticket',
	id: 'ticket_nums',
	start_seq: 1,
});

module.exports = mongoose.model('Ticket', ticketSchema);
