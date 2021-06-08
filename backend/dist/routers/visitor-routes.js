"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var visitorController = require('../contorlers/visitor-conroller');
var route = express_1.default.Router();
//route is starting
//getting all the movies
route.get('/movies', visitorController.getAll);
//searching the movies
route.post('/movies/byName', visitorController.searchByMovies);
route.get('/movies/byGenre', visitorController.searchByGenre);
route.get('/movies/byLanguage', visitorController.GetBylanguage);
//details of particular movie
route.get('/movies/details/:id?', visitorController.MovieById);
exports.default = route;
