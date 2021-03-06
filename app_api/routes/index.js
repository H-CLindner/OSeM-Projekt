var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlUser = require('../controllers/users');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/users/:_id', auth, ctrlUser.profileUpdate);
router.post('/users/delete/:_id', auth, ctrlUser.profileDelete);
router.put('/users/image', auth, ctrlUser.profileImage);
router.get('/game/:points', auth, ctrlUser.savePoints);
router.get('/allProfiles', ctrlUser.allProfiles);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/logout', ctrlAuth.logout);


module.exports = router;
