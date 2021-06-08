import express from 'express'
var adminController = require('../contorlers/admin-controller')

var route = express.Router();

route.post('/addAdmin', adminController.addAdmin);
route.post('/login', adminController.adminLogin);
//adding movies by admin
route.route('/addMovies')
    .post(adminController.adminAcces, adminController.addMovies)









    
export default route;