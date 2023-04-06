const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect to db
db.connect();

//path đứng ở trang chủ tương ứng với thư mục public
app.use(express.static(path.join(__dirname, 'public')));

//nhận req.body
//body parser
//submit form
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//xmlHttpRequest, fetch, axios, ajax,...
app.use(express.json());

//method override
app.use(methodOverride('_method'));

//http logger
// app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
