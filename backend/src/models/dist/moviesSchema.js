"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var movie = new mongoose_1["default"].Schema({
    title: {
        type: String
    },
    actor: {
        type: String
    },
    genres: [
        {
            type: String
        }
    ],
    director: {
        type: String
    },
    year: {
        type: String
    },
    posterUrl: {
        type: String
    },
    storyline: {
        type: String
    },
    movieUrl: {
        type: String
    },
    language: {
        type: String
    },
    likes: {
        type: Number
    }
    //need to checkout
});
var movieSchema = mongoose_1["default"].model('movie', movie);
exports["default"] = movieSchema;
