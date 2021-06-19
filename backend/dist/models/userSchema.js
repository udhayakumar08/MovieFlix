"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    fistName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
    isPayment: {
        type: Boolean
    },
    history: [
        {
            WatchedMovieTitle: {
                type: String,
                unique: true
            }
        }
    ],
    watchLater: [{
            Movieid: {
                type: String
            }
        }],
    otp: {
        type: Number
    }
});
var user = mongoose_1.default.model('user', userSchema);
exports.default = user;
