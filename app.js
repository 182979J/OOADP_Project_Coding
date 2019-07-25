const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger');// Library to use MySQL to store session objects
const MySQLStore = require('express-mysql-session');
const db = require('./config/db'); // db.js config file
// const passport = require('passport');
const passport_a = require('passport');
    // passport_c = new Passport(),
    // passpot_m = new Passport();
// const passport_c = require('passport');
// const passport_m = require('passport');

const amainRoute = require('./routes/main_a');
const auserRoute = require('./routes/user_a');
const aStocks = require('./routes/stocks');
const afeedbacks = require('./routes/feedbackRec');

const SmainRoute = require('./routes/main_s');

const { formatDate, radioCheck, replaceCommas } = require('./helpers/hbs');


const app = express();



app.engine('handlebars', exphbs({
	helpers: {
		formatDate: formatDate,
		radioCheck: radioCheck,
		replaceCommas: replaceCommas
	},

	
	defaultLayout: 'main_a' // Specify default template views/layout/main.handlebar 
}));
app.set('view engine', 'handlebars');

// Body parser middleware to parse HTTP body in order to read HTTP data
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Creates static folder for publicly accessible HTML, CSS and Javascript files
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware to use other HTTP methods such as PUT and DELETE
app.use(methodOverride('_method'));

// Enables session to be stored using browser's Cookie ID
app.use(cookieParser());

// To store session information. By default it is stored as a cookie on browser
app.use(session({
	key: 'vidjot_session',
	secret: 'tojiv',
	store: new MySQLStore({
		host: db.host,
		port: 3306,
		user: db.username,
		password: db.password,
		database: db.database,
		clearExpired: true,
		// How frequently expired sessions will be cleared; milliseconds:
		checkExpirationInterval: 900000,
		// The maximum age of a valid session; milliseconds:
		expiration: 900000,
	}),


	resave: false,
	saveUninitialized: false,
}));
// Initilize Passport middleware
app.use(passport_a.initialize());
app.use(passport_a.session());

// app.use(passport_c.initialize());
// app.use(passport_c.session());

// app.use(passport_m.initialize());
// app.use(passport_m.session());

app.use(flash());

app.use(FlashMessenger.middleware); // add this statement after flash()
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Place to define global variables - not used in practical 1
app.use(function (req, res, next) {
	next();
});


app.use('/', amainRoute); // mainRoute is declared to point to routes/main.js
// This route maps the root URL to any path defined in main.js
app.use('/user', auserRoute); // mainRoute is declared to point to routes/main.js

app.use('/main_s', SmainRoute);

app.use('/stocks', aStocks);

app.use('/feedback', afeedbacks);

const port = 5000;

// Starts the server and listen to port 5000
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});


const authenticate = require('./config/passport_a');
//const authenticate_c = require('./config/passport_c');
// const authenticate_m = require('./config/passport_m')
authenticate.localStrategy(passport_a);
// authenticate_c.localStrategy(passport_c);
// authenticate_m.localStrategy(passport);
