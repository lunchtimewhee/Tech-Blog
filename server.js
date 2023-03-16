require ('dotenv').config;
const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const bcrypt = require('bcrypt');
const mainRouter = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');




const app = express();
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRouter);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on on http://localhost:${PORT}`);
    });
});