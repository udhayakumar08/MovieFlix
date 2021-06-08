"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var adminController = require('../contorlers/admin-controller');
var route = express_1.default.Router();
route.post('/addAdmin', adminController.addAdmin);
route.post('/login', adminController.adminLogin);
//adding movies by admin
route.route('/addMovies')
    .post(adminController.adminAcces, adminController.addMovies);
exports.default = route;
