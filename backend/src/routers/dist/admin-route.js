"use strict";
exports.__esModule = true;
var express_1 = require("express");
var adminController = require('../contorlers/admin-controller');
var route = express_1["default"].Router();
route.post('/addAdmin', adminController.addAdmin);
route.post('/login', adminController.adminLogin);
//adding movies by admin
route.route('/addMovies')
    .post(adminController.adminAcces, adminController.addMovies);
exports["default"] = route;
