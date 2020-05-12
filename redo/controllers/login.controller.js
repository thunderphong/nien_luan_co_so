// Import data schema
const User = require('../models/user.model');

// Import JSON Web Token
const jwt = require('jsonwebtoken');

// Import password hash tool
const bcrypt = require('bcryptjs');

module.exports.loginRootPath = (req, res) =>{
	const authHeader = req.header('Authorization');
	// if(!authHeader){
	// 	console.log(req.header('accept'));
	// }
	res.render('login');
}

module.exports.postLoginRootPath = async (req, res) => {
    let errors = {};
	try {
		// Check database
		const searchAcc = await User.findOne({ account: req.body.account });
		if (searchAcc === null) errors.account = 'Wrong account!';
		else {	
			// Validate password
			try {
				const validPass = await bcrypt.compare(req.body.password, searchAcc.password);
				if (!validPass) errors.password = 'Wrong password!';
			}
			catch(err) {
				console.log(err.response);
			}
		}

		if (Object.entries(errors).length === 0 ) {
			// Create token
			const token = jwt.sign({ userInfo: searchAcc }, process.env.SECRET_KEY);
			// res.cookies('jwtToken', "Bearer " + token);
			return res.status(200).json(token);	
		}	
		else return res.status(404).json(errors);
	}
	catch(err) {
		console.log(err.response);
	}
}