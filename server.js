const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Routers
const userRoutes = require('./routers/userRouters');
const transactionRoutes = require('./routers/transactionRoutes');

// Initiate app
const app = express();

// Middleware
const middlewares = [
    morgan('dev'),
    cors(),
    bodyParser.urlencoded({extended: false}),
    bodyParser.json(),
    passport.initialize(),
];
require('./passport')(passport)
app.use(middlewares);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome To Our Backend Application'
    })
});

//const MONGODB_URI = "mongodb://admin:admin@.localhost:27017/money-management-app?authSource=admin&w=1";
// const MONGODB_URI = 'mongodb+srv://pavel007:pavel007@cluster0.klx6f.mongodb.net/money-management-app?retryWrites=true&w=majority';
const MONGODB_URI = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.klx6f.mongodb.net/money-management-app?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8080

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database Connected...');
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
        });
    })
    .catch(e => {
        console.log(e)
    });