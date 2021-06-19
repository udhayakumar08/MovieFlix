"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../contorlers/user-controller"));
var route = express_1.default.Router();
//routing starts
//registration nd login
route.post('/registration', user_controller_1.default.userRegistration);
route.post('/login', user_controller_1.default.userLogin);
route.post('/otpVerification', user_controller_1.default.otpVerification);
//adding watching history and clear particular watch history
route.post('/addingToHistory', user_controller_1.default.UserAccess, user_controller_1.default.addingHistory);
route.post('/removeFromHistory', user_controller_1.default.UserAccess, user_controller_1.default.deleteHistory);
//route.post('/watch/history', userController.gettingHistory)
//watch movies only by logged in user
route.route('/movies/:id?').
    post(user_controller_1.default.UserAccess, user_controller_1.default.watchMovie);
//adding public reviews by user
route.route('/movies/addReview/:id?')
    .post(user_controller_1.default.UserAccess, user_controller_1.default.addingReview);
route.route('/get/profile/details')
    .get(user_controller_1.default.UserAccess, user_controller_1.default.getProfileData);
//make a payment to stripe gateway
route.post('/payment', user_controller_1.default.makePayment);
//routing Ends
exports.default = route;
