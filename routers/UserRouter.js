const express = require('express');
const app = express();
const UserController = require('../controllers/UserController');
const requireAuth = require('../middlewares/requireAuth');

app.get('/', requireAuth, (req, res) => {
    res.json({ 'message': 'ok' });
});

app.route('/user').get(requireAuth, UserController.getUser);
app.route('/signup').post(UserController.signup);
app.route('/signin').post(UserController.signin);
app.route('/upload').post(UserController.upload);
app.route('/update/:id').put(UserController.updateUser);
app.route('/tambah-pendidikan/:id').post(UserController.tambahPendidikan);

module.exports = app;