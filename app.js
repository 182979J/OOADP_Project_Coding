const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// const MySQLStore = require('express-mysql-session');

const mainRoute = require('./routes/main_s');
const app = express();
// const datepicker = require('datepicker');


// Bring in database connection
const delDB = require('./config/DBConnection');
// Connects to MySQL database
delDB.setUpDB(false); // To set up database with new tables set (true)


const MySQLStore = require('express-mysql-session');
const db = require('./config/db'); // db.js config file


// Bring in Handlebars Helpers here
// const {formatDate} = require('./helpers/hbs'); //, radioCheck 

app.engine('handlebars', exphbs({
	helpers: {
		// formatDate: formatDate,
		// radioCheck : radioCheck
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
		// host: db.host,
		port: 3306,
		// user: db.username,
		// password: db.password,
		// database: db.database,
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






// mainRoute.initialize(app);
app.use("/", mainRoute);


const port = 5000;

// Starts the server and listen to port 5000
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});