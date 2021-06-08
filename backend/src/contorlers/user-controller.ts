import userSchema from '../models/userSchema'
import bcrypt from 'bcryptjs'
const { Auth } = require("two-step-auth")
import jwt from 'jsonwebtoken'
import movieSchema from '../models/moviesSchema'

const userRegistration = async (req: any, res: any) => {
    try {


        let user = await userSchema({
            email: req.body.email,

            fistName: req.body.fistName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            plan: req.body.plan
        });
        await user.save();
        res.send("user registered successfully")

    } catch (err) {
        console.log("Error" + err)
        res.send(err)
    }


}

const userLogin = async (req: any, res: any) => {
    try {
        var userdata = await userSchema.findOne({ email: req.body.email })
        console.log("userdata", req.body)
        if (!userdata) {
            return res.status(401).json("invalid")
        }

        const otp = await Auth(userdata.email, "ott platform")
        await userSchema.findOneAndUpdate({ email: userdata.email }, { $set: { otp: otp.OTP } })
        console.log(otp)

        res.status(200).send(req.body.email)
        //console.log(userToken)

    } catch (error) {

        console.log(error)
    }

}

const otpVerification = async (req: any, res: any) => {
    try {


        let userMatchedData = await userSchema.findOne({ email: req.body.email })
        if (userMatchedData.otp == req.body.otp) {
            //res.sendStatus(200).json("otp verification is succuessfull")
            var userToken = await jwt.sign({ email: userMatchedData.email }, 'asdfasdfasdfdfsk')
            res.setHeader('user', userToken);
            res.status(200).send(userToken)
            console.log(userToken)
        }
        else {
            res.status(401).send("unauthorized")
        }
    } catch (err) {
        console.log("Error:" + err)

    }
}




const UserAccess = async (req: any, res: any, next: any) => {
console.log("authorization");

    const token = req.header('user')
    console.log("token from new header", token);

    var decodedUserEmail: any = await jwt.verify(token, 'asdfasdfasdfdfsk')
    // console.log("decoded admin data", decodedAdminEmail)
    const data = await userSchema.findOne({ email: decodedUserEmail.email })
    // console.log("data", data);
    try {
        if (!data) {
            console.log("not authorized")
            //throw new Error()
        }
        console.log("data found")
        req.userMail = decodedUserEmail.email;
        req.firstName = data.fistName
        next()
    } catch (err) {

        res.status(403).send(err);

    }

}
//adding to movie title to users history

const addingHistory = async (req: any, res: any) => {
    try {
        let user = await userSchema.findOne({ email: req.userMail })
        let movieData = await movieSchema.findOne({ _id: req.body.id })
        let updatedData = await userSchema.findOneAndUpdate({ email: user.email }, { $push: { history: { WatchedMovieTitle: movieData.title } } })
        res.send(updatedData)
    } catch (err) {
        res.status(403).send(err)
    }
}

//getting history
//not working
const gettingHistory = async (req: any, res: any) => {
    try {
        let user = await userSchema.findOne({ email: req.body.email })
        // user.history.populate("WatchedMovieTitle",'id title')
        let list = user.history
        let movie = await movieSchema.find({ _id: list.WatchedMovieTitle })
        console.log("id of movie", list[0].WatchedMovieTitle);

        // res.send(movie)


    } catch (err) {

    }
}

//playing a movie
const watchMovie = async (req: any, res: any) => {
    console.log("logged user name using middleware", req.userMail);

    try {
        let movieData = await movieSchema.findOne({ _id: req.params.id })
        res.json(movieData.movieUrl)

    } catch (err) {
        res.status(403).send(err)
    }
}
//adding watch later movies
const WatchLater = async (req: any, res: any) => {
    try {
        let user = await userSchema.findOne({ email: req.body.email })
        if (!user) {
            res.send("no user found login or register")
        }
        let watchLaterList = await userSchema.findOneAndUpdate({ email: user.email })

    } catch {

    }
}

//adding review
const addingReview = async (req: any, res: any) => {
    try {

        let review = {
            userFirstName: req.firstName,
            comments: req.body.comments,
            stars: req.body.stars
        }
        console.log("request body", review);

        let movie = await movieSchema.findOneAndUpdate({ _id: req.params.id }, { $push: { reviews: review } })
        res.send(movie)
    } catch (err) {
        res.sendStatus(403)
    }
}

//getting pro
const getProfileData = async (req: any, res: any) => {
    try {
        let data = await userSchema.findOne({ email: req.userMail })
        res.send(data)

    } catch (err) {
        res.sendStatus(403)
    }


}
export default {
    userRegistration,
    userLogin,
    otpVerification,
    addingHistory,
    watchMovie,
    UserAccess,
    gettingHistory,
    addingReview,
    getProfileData

}