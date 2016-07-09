//import require modules
var express = require('express');
var stormpath = require('express-stormpath');

//initialize our express app
var app = express();

//configure stormpath
app.use(stormpath.init(app, {
	application: {
		href: process.env.STORMPATH_URL
	},
	web: {
		login: {
			nextUri: '/dashboard'
		}
	}
}));

//generate a simple home page.
app.get('/', function(req, res) {
	res.send("Hey there! thanks for visiting, be sure to l<a href='/login'>login</a>!");
});

//generate a simple dashboard page.
app.get('/dashboard', stormpath.loginRequired, function(req, res) {
	res.send('Hi: ' + req.user.email + '. Logout <form action="/logout" method="POST"><button type="submit">Logout</button></form>');
});

app.get('/products', stormpath.loginRequired, function(req, res)  {
	res.send('hi: ' + req.user.email + 'wel come to the products page to manage your products');
});

app.listen(process.env.PORT || 3000);