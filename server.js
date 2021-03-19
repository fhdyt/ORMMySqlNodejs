var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

var corsOptions = {
    origin: 'http://localhost/',
    optionsSuccessStatus: 200
}
app.use(cors({ corsOptions }));

app.get('/', (req, res) => {
    var message = "Rest API Connected";
    res.status(200).json({
        status: true,
        code: 200,
        pesan: message
    });
});

var UserRouter = require('./routers/UserRouter');
app.use('/user', UserRouter);

app.listen(port);
console.log('Server API : ' + port);