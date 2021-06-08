import { ObjectId } from "mongodb";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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


    history: [
        {
        
            WatchedMovieTitle: {
                type: String,
                unique:true
                
            }
        }
    ],



    watchLater: [{
        Movieid:{
            type:String
        }
    }]
    ,
    otp: {
        type: Number
    }


})
const user: any = mongoose.model('user', userSchema)
export default user;