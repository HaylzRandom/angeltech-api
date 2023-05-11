const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
	const { username, password } = req.body;

	// No username or password received
	if (!username || !password) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	//  Find user in MongoDB
	const foundUser = await User.findOne({ username }).exec();

	// If user isn't found or user is deactivated
	if (!foundUser || !foundUser.active) {
		return res.status(401).json({ message: 'Unauthorised' });
	}

	// Match password
	const match = await bcrypt.compare(password, foundUser.password);

	// If password do not match
	if (!match) return res.status(401).json({ message: 'Unauthorised' });

	foundUser.lastLogin = Date.now();

	await foundUser.save();

	// Create accessToken
	const accessToken = jwt.sign(
		{
			UserInfo: {
				id: foundUser.id,
				username: foundUser.username,
				roles: foundUser.roles,
				lastLogin: foundUser.lastLogin,
			},
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '30m' }
	);

	// Create refreshToken
	const refreshToken = jwt.sign(
		{
			username: foundUser.username,
			roles: foundUser.roles,
			lastLogin: foundUser.lastLogin,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '7d' }
	);

	// Create secure cookie with refresh token
	res.cookie('jwt', refreshToken, {
		httpOnly: true, // Accessible only by server
		secure: true, // https
		sameSite: 'None', // Cross-Site Cookie
		maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie Expiry: Set to match refreshToken
	});

	// Send accessToken containing username and roles
	res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
	// Get cookie
	const cookies = req.cookies;

	// If no cookie with 'jwt' exists
	if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorised' });

	const refreshToken = cookies.jwt;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) return res.status(403).json({ message: 'Forbidden' });

			// Find user
			const foundUser = await User.findOne({
				username: decoded.username,
			}).exec();

			// If user not found
			if (!foundUser) return res.status(401).json({ message: 'Unauthorised' });

			const accessToken = jwt.sign(
				{
					UserInfo: {
						id: foundUser.id,
						username: foundUser.username,
						roles: foundUser.roles,
						lastLogin: foundUser.lastLogin,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30m' }
			);

			res.json({ accessToken });
		}
	);
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookies if exists
const logout = (req, res) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(204); // No Content

	// Remove cookie
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

	res.json({ message: 'Cookie cleared' });
};

module.exports = {
	login,
	refresh,
	logout,
};
