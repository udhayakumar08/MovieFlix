import express from 'express'
import userController from '../contorlers/user-controller'

const route = express.Router();
//routing starts

//registration nd login
route.post('/registration', userController.userRegistration);
route.post('/login', userController.userLogin)
route.post('/otpVerification', userController.otpVerification);

//adding watching history and clear particular watch history
route.post('/addingToHistory', userController.UserAccess, userController.addingHistory)
route.post('/removeFromHistory',userController.UserAccess,userController.deleteHistory)
//route.post('/watch/history', userController.gettingHistory)
//watch movies only by logged in user
route.route('/movies/:id?').
    post(userController.UserAccess, userController.watchMovie)

//adding public reviews by user

route.route('/movies/addReview/:id?')
    .post(userController.UserAccess, userController.addingReview)

route.route('/get/profile/details')
    .get(userController.UserAccess, userController.getProfileData)
    //make a payment to stripe gateway
    route.post('/payment',userController.makePayment)
//routing Ends


export default route;