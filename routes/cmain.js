const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger')
const feedback = require('../models/feedback');
const ensureAuthenticated = require('../helpers/auth');
const moment = require('moment');


// router.get('/', (req, res) => {
// 	const title = 'Video Jotter';
// 	res.render('chome', { title: title }) // renders views/index.handlebars
// });

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/chome');
});

router.get('/about', (req, res) => {

	let success_msg = 'Success message';
	let error_msg = 'Error message using error_msg';

	alertMessage(res, 'success',
		'This is an important message', 'fas fa-sign-in-alt', true);
	alertMessage(res, 'danger',
		'Unauthorised access', 'fas fa-exclamation-circle', false);

	var errorTexts = [
		{ text: "Error message using error object" },
		{ text: "First error message🙅‍♀️" },
		{ text: "Second error message 🚫" },
		{ text: "Third error message⛔" }
	];


	var dev_name = "🧐 Happy 脸😀"
	res.render('about', {
		developer_name: dev_name,
		success_msg: success_msg,
		error_msg: error_msg,
		errors: errorTexts
	}) // renders views/about.handlebars
});

// router.post('/messageemailsend', (req, res) => {
// 	// let emailfeedback = req.user.email;
// 	let emailfeedback = req.body.emailfeedback;
//     let message= req.body.Message.slice(0, 1999)
//     // let DropdownPorS = req.body.DropdownPorS.toString();
//     // let DropdownSType=req.body.DropdownSType.toString();
    
//     // Multi-value components return array of strings or undefined
//     feedback.create({
// 		emailfeedback,
// 		// DropdownPorS,
// 		// DropdownSType,
//         message
//     }).then((feedback) => {
//         res.redirect('/home');
//     })
// 	.catch(err => console.log(11111111111111111111111111111111111111))
// });

// router.get('/messageemail',(req,res)=>{
// 	res.render('customerfeedback/messageemail') 
// })

router.get('/chome', (req, res) => {
	
	res.render('chome') 
});

router.get('/try', (req, res) => {
	
	res.render('trydisplay') 
});

router.get('/cLogin', (req, res) => {
	res.render('user/clogin') // renders views/user/login.handlebars
});

router.get('/CRegister', (req, res) => {
	res.render('user/cregister') // renders views/register.handlebars
});

module.exports = router;
