import movieSchema from "../models/moviesSchema";

const searchByMovies = async (req: any, res: any) => {
    // console.log("its working");
    try {
        const SearchTitle = new RegExp(req.body.title, "i")
        let data = await movieSchema.find({ title: SearchTitle })
        res.send(data);


    } catch (err) {

    }

}

const searchByGenre = async (req: any, res: any) => {
    try {
        const searchByGenre = new RegExp(req.body.genre, "i")
        let data = await movieSchema.find({ genres: searchByGenre })
        res.send(data);


    } catch (err) {
        res.status(403).send(err)
    }
}

const getAll = async (req: any, res: any) => {
    let movies = await movieSchema.find();
    res.json(movies)
}


const MovieById = async (req: any, res: any) => {
    try {


        let movie = await movieSchema.findOne({ _id: req.params.id })
        res.send(movie)
    }
    catch (err) {
        res.status(403).send(err)
    }
}

const GetBylanguage=async(req:any,res:any)=>{
    
}


module.exports = {
    searchByMovies,
    searchByGenre,
    getAll,
    MovieById,GetBylanguage


}