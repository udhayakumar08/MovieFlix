import mongoose from 'mongoose'


const movie = new mongoose.Schema({
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
    reviews:[
        {
            userFirstName:{
                type:String
            },
            comments:{
                type:String
            },
            stars:{
                type:String

            }
        }
    ]



    //need to checkout
})

const movieSchema: any = mongoose.model('movie', movie);

export default movieSchema;