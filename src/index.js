const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/sortMiddleware.x');
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

//apply middleware custom
app.use(SortMiddleware);

//http logger
// app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: '<img src="/img/elevator.png" width="20px" />',
                    asc: '<img src="/img/arrow-up.png" width="20px" />',
                    desc: '<img src="/img/arrow-down.png" width="20px" />',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                };

                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`;
            }
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

//start server
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
