'use strict';


const requestUtils = require('./requestUtils'),
  controllers = require('./controllers'),
  config = require('./utils').config,
  express = require('express'),
  jwt = require('express-jwt'),
  auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});



const { usersController, statisticsController, boxesController, sensorsController, profile, authentication, users } = controllers;

const initRoutes = function initRoutes (server) {
  // the ones matching first are used
  // case is ignored

  // attach a function for user parameters
  server.use(requestUtils.initUserParams);

  // attach a function to validate boxId and sensorId parameters
  // check parmeters for possible box Id parameters
  // everything of the like
  // 'boxId', 'boxid', 'senseBoxIds', 'senseBoxId'
  // can be used
  server.use(requestUtils.validateIdParams);

  // GET
  server.get({ path: config.basePath, version: '0.0.1' }, boxesController.findAllBoxes);
  server.get({ path: `${config.basePath}/:boxId`, version: '0.0.1' }, boxesController.findBox);
  server.get({ path: `${config.basePath}/:boxId/sensors`, version: '0.0.1' }, boxesController.getMeasurements);
  server.get({ path: `${config.basePath}/:boxId/data/:sensorId`, version: '0.0.1' }, boxesController.getData);
  server.get({ path: `${config.basePath}/data`, version: '0.1.0' }, boxesController.getDataMulti);
  server.get({ path: `${config.basePath}/:boxId/:sensorId/submitMeasurement/:value`, version: '0.0.1' }, boxesController.postNewMeasurement);

  server.get({ path: '/stats', version: '0.1.0' }, statisticsController.getStatistics);
  server.get({ path: `${config.statisticsPath}/idw` }, statisticsController.getIdw);

  // POST
  server.post({ path: config.basePath, version: '0.0.1' }, boxesController.postNewBox);
  server.post({ path: `${config.basePath}/:boxId/:sensorId`, version: '0.0.1' }, boxesController.postNewMeasurement);
  server.post({ path: `${config.basePath}/:boxId/data`, version: '0.1.0' }, boxesController.postNewMeasurements);
  server.post({ path: `${config.basePath}/data`, version: '0.1.0' }, boxesController.getDataMulti);

  // Secured (needs authorization through apikey)

  // attach a function to secured requests to validate api key and box id
  server.use(requestUtils.validateAuthenticationRequest);

  // GET
  server.get({ path: `${config.userPath}/:boxId`, version: '0.0.1' }, usersController.validApiKey);
  server.get({ path: `${config.basePath}/:boxId/script`, version: '0.1.0' }, boxesController.getScript);

  // PUT
  server.put({ path: `${config.basePath}/:boxId`, version: '0.1.0' }, boxesController.updateBox);

  // DELETE
  server.del({ path: `${config.basePath}/:boxId`, version: '0.1.0' }, boxesController.deleteBox);
  server.del({ path: `${config.basePath}/:boxId/:sensorId/measurements`, version: '0.0.1' }, sensorsController.deleteSensorData);
};

// Usermanagement
const initRoutesUM = function initRoutesUM (server) {
	//GET Profile
	server.get('/profile', auth, profile.profileRead);
	//POST Profile
	server.post('/users/:_id', auth, users.profileUpdate);
	server.post('/users/delete/:_id', auth, users.profileDelete);
	//PUT Profile
	server.put('/users/image', auth, users.profileImage);
	server.post('/game', auth, users.savePoints);

// authentication POST
	server.post('/register', authentication.register);
	server.post('/login', authentication.login);
	server.post('/logout', authentication.logout);
};


module.exports = initRoutes;
module.exports = initRoutesUM;

