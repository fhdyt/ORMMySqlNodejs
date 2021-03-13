const express = require('express');
const app = express();
const UserController = require('../controllers/UserController');
const requireAuth = require('../middlewares/requireAuth');

// app.route('/:tahun').get(UserController.formLke);
// app.route('/').post(UserController.postLke);

app.get('/', requireAuth, (req,res) => {
    res.json({'message': 'ok'});
});

app.route('/user').get(UserController.getUser);

app.route('/signup').post(UserController.signup);
app.route('/signin').post(UserController.signin);
app.route('/upload').post(UserController.upload);
app.route('/update/:id').put(UserController.updateUser);

module.exports = app;