"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1["default"].Schema({
    fistName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    plan: {
        type: String
    },
    watchedList: [
        {
            WatchedMovieTitle: {
                type: String
            }
        }
    ],
    otp: {
        type: Number
    }
});
var user = mongoose_1["default"].model('user', userSchema);
exports["default"] = user;
