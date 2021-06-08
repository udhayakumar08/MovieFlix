"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var movie = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    actor: {
        type: String,
    },
    genres: [
        {
            type: String
        }
    ],
    director: {
        type: String,
    },
    year: {
        type: String,
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
    },
    reviews: [
        {
            userFirstName: {
                type: String
            },
            comments: {
                type: String
            },
            stars: {
                type: String
            }
        }
    ]
    //need to checkout
});
var movieSchema = mongoose_1.default.model('movie', movie);
exports.default = movieSchema;
