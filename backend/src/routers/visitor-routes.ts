import express from 'express'
var visitorController =require('../contorlers/visitor-conroller')


const route= express.Router();
//route is starting

//getting all the movies
route.get('/movies',visitorController.getAll)



//searching the movies
route.post('/movies/byName',visitorController.searchByMovies)
route.get('/movies/byGenre',visitorController.searchByGenre)
route.get('/movies/byLanguage',visitorController.GetBylanguage)

//details of particular movie
route.get('/movies/details/:id?',visitorController.MovieById)

export default route;
