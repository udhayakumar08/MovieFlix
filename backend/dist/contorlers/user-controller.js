"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userSchema_1 = __importDefault(require("../models/userSchema"));
var Auth = require("two-step-auth").Auth;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moviesSchema_1 = __importDefault(require("../models/moviesSchema"));
var stripe = require('stripe')('sk_test_51J13DwSCmwvfJONqexefVVvgQYLNVypxljSree6qe1lANZRqBU3RAk116Xscnret8qYbo7tjgZLno8jkjBtEnwrx00ItYEDpCr');
var userRegistration = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userSchema_1.default({
                        email: req.body.email,
                        fistName: req.body.fistName,
                        lastName: req.body.lastName,
                        phone: req.body.phone,
                        plan: req.body.plan
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.send("user registered successfully");
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log("Error" + err_1);
                res.send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userdata, otp, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.body.email })];
            case 1:
                userdata = _a.sent();
                console.log("userdata", req.body);
                if (!!userdata) return [3 /*break*/, 2];
                console.log("userdata1", req.body);
                res.status(401).send("unauthorized");
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, Auth(userdata.email, "MovieFlix by udhaya")];
            case 3:
                otp = _a.sent();
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ email: userdata.email }, { $set: { otp: otp.OTP } })];
            case 4:
                _a.sent();
                console.log(otp);
                res.status(200).send(req.body.email);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                res.status(403).send(error_1);
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var otpVerification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userMatchedData, userToken, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.body.email })];
            case 1:
                userMatchedData = _a.sent();
                if (!(userMatchedData.otp == req.body.otp)) return [3 /*break*/, 3];
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ email: userMatchedData.email }, 'asdfasdfasdfdfsk')];
            case 2:
                userToken = _a.sent();
                res.setHeader('user', userToken);
                res.status(200).send(userToken);
                console.log(userToken);
                return [3 /*break*/, 4];
            case 3:
                res.status(401).send("unauthorized");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.log("Error:" + err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var UserAccess = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedUserEmail, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("authorization");
                token = req.header('user');
                console.log("token from new header", token);
                return [4 /*yield*/, jsonwebtoken_1.default.verify(token, 'asdfasdfasdfdfsk')
                    // console.log("decoded admin data", decodedAdminEmail)
                ];
            case 1:
                decodedUserEmail = _a.sent();
                return [4 /*yield*/, userSchema_1.default.findOne({ email: decodedUserEmail.email })
                    // console.log("data", data);
                ];
            case 2:
                data = _a.sent();
                // console.log("data", data);
                try {
                    if (!data) {
                        console.log("not authorized");
                        //throw new Error()
                    }
                    console.log("data found");
                    req.userMail = decodedUserEmail.email;
                    req.firstName = data.fistName;
                    next();
                }
                catch (err) {
                    res.status(403).send(err);
                }
                return [2 /*return*/];
        }
    });
}); };
//adding to movie title to users history
var addingHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, movieData, updatedData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.userMail })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, moviesSchema_1.default.findOne({ _id: req.body.id })];
            case 2:
                movieData = _a.sent();
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ email: user.email }, { $push: { history: { WatchedMovieTitle: movieData.title } } })];
            case 3:
                updatedData = _a.sent();
                res.send(updatedData);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                res.status(403).send(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedData, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log("deleted history ", req.body.id);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.userMail })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ email: user.email }, { $pull: { history: { _id: req.body.id } } })];
            case 2:
                updatedData = _a.sent();
                res.send(updatedData);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.sendStatus(403);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//getting history
//not working
var gettingHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, list, movie, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.body.email })
                    // user.history.populate("WatchedMovieTitle",'id title')
                ];
            case 1:
                user = _a.sent();
                list = user.history;
                return [4 /*yield*/, moviesSchema_1.default.find({ _id: list.WatchedMovieTitle })];
            case 2:
                movie = _a.sent();
                console.log("id of movie", list[0].WatchedMovieTitle);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//playing a movie
var watchMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movieData, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("logged user name using middleware", req.userMail);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, moviesSchema_1.default.findOne({ _id: req.params.id })];
            case 2:
                movieData = _a.sent();
                res.json(movieData.movieUrl);
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(403).send(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//adding watch later movies
var WatchLater = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, watchLaterList, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.send("no user found login or register");
                }
                return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ email: user.email })];
            case 2:
                watchLaterList = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//adding review
var addingReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var review, movie, response, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                review = {
                    userFirstName: req.firstName,
                    comments: req.body.comments,
                    stars: req.body.stars
                };
                console.log("request body", review);
                return [4 /*yield*/, moviesSchema_1.default.findOneAndUpdate({ _id: req.params.id }, { $push: { reviews: review } })];
            case 1:
                movie = _a.sent();
                return [4 /*yield*/, moviesSchema_1.default.findOne({ _id: req.params.id })];
            case 2:
                response = _a.sent();
                res.send(response.reviews);
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                res.sendStatus(403);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//getting pro
var getProfileData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userSchema_1.default.findOne({ email: req.userMail })];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.sendStatus(403);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var makePayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                return [4 /*yield*/, stripe.customers.create({
                        email: token.email,
                        source: token.id
                    }).then(function (customer) { return stripe.charges.create({
                        amount: 499 * 100,
                        currency: "inr",
                        customer: customer.id,
                    }); }).then(function (resss) { return __awaiter(void 0, void 0, void 0, function () {
                        var err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, userSchema_1.default.findOneAndUpdate({ email: token.email }, { isPayment: true })];
                                case 1:
                                    _a.sent();
                                    res.status(200).json("true");
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_9 = _a.sent();
                                    console.log("ERROR" + err_9);
                                    res.sendStatus(403);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (error) { return console.error("ERROR" + error); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    userRegistration: userRegistration,
    userLogin: userLogin,
    otpVerification: otpVerification,
    addingHistory: addingHistory,
    deleteHistory: deleteHistory,
    watchMovie: watchMovie,
    UserAccess: UserAccess,
    addingReview: addingReview,
    getProfileData: getProfileData,
    makePayment: makePayment
};
