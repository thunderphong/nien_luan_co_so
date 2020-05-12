// Import data schema
const User = require('../models/user.model');

// Import password hash tool
const bcrypt = require('bcryptjs');

module.exports.registerRootPath = (req, res) =>{
	res.render('register');
}

module.exports.postRegisterRootPath = async (req, res) => {
	// Validate password
	var searchAcc = await User.findOne({ account: req.body.account });
	if (searchAcc) 
		return res.status(404).json('This username has been taken. Please choose another account name!');
	else {	
		// Hash password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const user = new User({
			account: req.body.account,
			password: hashedPassword
		});

		// Send api
		try {
			const savedUser = await user.save();
			return res.sendStatus(200);
		} catch(err) {
			console.log(err);
			return res.status(404).json(err);
		}
	}
}