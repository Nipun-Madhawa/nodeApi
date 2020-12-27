var express = require('express');
var app = express();

var Account = require('./Account.js');
var bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const Bcrypt = require("bcryptjs");


/*app.use('/', (req, res) => {
	res.json({ msg : 'It works....!' });
	//console.log('Listening on port 3000');
    });*/


app.listen(3000, () => {
	console.log('Listening on port 3000');
    });

app.use('/signup', (req, res) => {
	var newAccount = new Account({
		firstName: req.body.firstname,
	lastName: req.body.lastname,
	companyName: req.body.companyname,
	phone: req.body.phone,
	conutry: req.body.country,
	userName: req.body.username,
	password: Bcrypt.hashSync(req.body.password, 10),});

	newAccount.save( (err) => {
		if(err){
			res.type('html').status(500);
			res.send('Erro: '+ err);
		}else{
			res.type('html').status(200);
			res.send('Sign up success ');
		}
	});

	
	
    });
app.use('/login', (req, res) => {

	var username=req.body.username;
	var password=req.body.password;
	

	Account.findOne({userName:username},(err,account) =>{
	if(err){
	res.type('html').status(500);
	res.send('Error:'+ err);
	}
	else{
	if(account){
	if(Bcrypt.compareSync(password,account.password)){
	res.type('html').status(200);
	res.send('login successful');
	}
	else{
	res.type('html').status(400);
	res.send('password incorrect');
	}
	}
	
	else{
	res.type('html').status(400);
	res.send('login faild');}
	}
	});
	
    });

module.exports = app;