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
//adding watching history
route.post('/addingToHistory', user_controller_1.default.UserAccess, user_controller_1.default.addingHistory);
route.post('/watch/history', user_controller_1.default.gettingHistory);
//watch movies only by logged in user
route.route('/movies/:id?').
    post(user_controller_1.default.UserAccess, user_controller_1.default.watchMovie);
//adding public reviews by user
route.route('/movies/addReview/:id?')
    .post(user_controller_1.default.UserAccess, user_controller_1.default.addingReview);
route.route('/get/profile/details')
    .get(user_controller_1.default.UserAccess, user_controller_1.default.getProfileData);
//routing Ends
exports.default = route;
