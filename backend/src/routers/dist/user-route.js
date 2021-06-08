"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../contorlers/user-controller");
var route = express_1["default"].Router();
//routing starts
//registration nd login
route.post('/registration', user_controller_1["default"].userRegistration);
route.post('/login', user_controller_1["default"].userLogin);
route.post('/otpVerification', user_controller_1["default"].otpVerification);
//adding watching history
route.post('/addToWatcedList', user_controller_1["default"].addingWatchList);
//routing Ends
exports["default"] = route;
