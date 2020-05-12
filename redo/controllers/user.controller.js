// Import data schema
const User = require('../models/user.model');

// Import JSON Web Token
const jwt = require("jsonwebtoken");

module.exports.getUserProfile = async (req, res) => {
	if(req.user) {
		const user = await User.findOne({account: req.params.account});
		console.log(user);
		return res.json(user);
	}else{
		res.status(400).json({message: "Not found !!"})
	}
}

module.exports.userRootPath = async (req, res) =>{
	return res.render('user', {account: req.params.account});
}

// module.exports.postUserRootPath = async (req, res) => {
	
// 	const token = req.cookies.auth;
// 	const iden = jwt.verify(token, process.env.JWT_TOKEN)._id;

// 	const update = {
// 		"name": req.body.name,
// 		"fname": req.body.fname,
// 		"email": req.body.email,
// 		"tel": req.body.tel
// 	}
// 	let doc = await User.updateMany({ _id: iden }, update);
// 	doc = await User.findOne({ _id: iden });
// 	res.render('user', { user: doc });
// }