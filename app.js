const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash'); //show error messages in about page
const FlashMessenger = require('flash-messenger');
const MySQLStore = require('express-mysql-session');
const db = require('./config/db'); // db.js config file
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// const MySQLStore = require('express-mysql-session');

const mainRoute = require('./routes/main_s');
const app = express();
// const datepicker = require('datepicker');


// Bring in database connection
const delDB = require('./config/DBConnection');
// Connects to MySQL database
delDB.setUpDB(false); // To set up database with new tables set (true)

// Passport Config
const authenticate = require('./config/passport');
// var authenticate = require('./config/passport');
authenticate.localStrategy(passport);





// Bring in Handlebars Helpers here
// const {formatDate} = require('./helpers/hbs'); //, radioCheck 

app.engine('handlebars', exphbs({
	helpers: {
		// formatDate: formatDate,
		// radioCheck : radioCheck
		tester:function(lvalue, rvalue, options) {

			if (arguments.length < 3)
				throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
		
			var operator = options.hash.operator || "==";
		
			var operators = {
				'==':       function(l,r) { return l == r; },
				'===':      function(l,r) { return l === r; },
				'!=':       function(l,r) { return l != r; },
				'<':        function(l,r) { return l < r; },
				'>':        function(l,r) { return l > r; },
				'<=':       function(l,r) { return l <= r; },
				'>=':       function(l,r) { return l >= r; },
				'typeof':   function(l,r) { return typeof l == r; }
			}
			if (!operators[operator])
				throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
		
			var result = operators[operator](lvalue,rvalue);

			if( result ) {
				return options.fn(this);
				//return true;
			} else {
				return options.inverse(this);
				//return false;
			}
		
		
		}

		},
	defaultLayout: 'main_s' // Specify default template views/layout/main.handlebar 
	//(case semue "handlebars" will be sent to main.handlebar since main.handlebar mcm template gitu. so other handlebars considered as "body"?)
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

app.use(methodOverride('_method'));

// app.use(datepicker.initialize());

// Express session middleware - uses MySQL to store session
//session table
app.use(session({
	key: 'delivery_session',
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




// To store session information. By default it is stored as a cookie on browser
app.use(session({
	key: 'delivery_session',
	secret: 'tojiv',
	resave: false,
	saveUninitialized: false,
}));



// Initilize Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash()); //connect-flash yg require kat atas
app.use(FlashMessenger.middleware); // flash-messenger yg require kt atas




// mainRoute.initialize(app);
app.use("/", mainRoute);


const port = 5000;

// Starts the server and listen to port 5000
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

const project=require('./config/DBConnection');
project.setUpDB(false);
// const authenticate=require('./config/passport');
// authenticate.localStrategy(passport);