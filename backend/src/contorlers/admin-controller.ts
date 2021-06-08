import adminSchema from "../models/adminSchema";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import movieSchema from "../models/moviesSchema";

const addAdmin = async (req: any, res: any) => {

    try {

        const hashedPwd = await bcrypt.hash(req.body.password, 12);
        let admin = await adminSchema({
            email: req.body.email,
            password: hashedPwd,
            name: req.body.name
        });
        await admin.save();
        res.send("admin added successfully")

    } catch (err) {
        console.log("Error" + err)
        res.send(err)
    }
}

const adminLogin = async (req: any, res: any) => {
    try {
        var userdata = await adminSchema.findOne({ email: req.body.email })
        if (!userdata) {
            return res.status(401).json("invalid")
        }
        var validpsw = await bcrypt.compare(req.body.password, userdata.password)
        if (!validpsw) {
            return res.json("invalid")

        }
        var userToken = jwt.sign({ email: userdata.email }, 'sadlklkdsflkjjdfdsfddfas')
        res.header('admin', userToken).json(userToken);
        console.log(userToken)

    } catch (error) {
        console.log(error)
    }
}

const adminAcces = async (req: any, res: any, next: any) => {
    console.log("admin access middle ware");

    next()
    // const token = req.header('admin')
    // console.log("token from new header", token);

    // var decodedAdminEmail:any = await jwt.verify(token, 'sadlklkdsflkjjdfdsfddfas')
    // // console.log("decoded admin data", decodedAdminEmail)
    // const data = await adminSchema.findOne({ email: decodedAdminEmail.email })
    // // console.log("data", data);

    // try {
    //     if (!data) {
    //         console.log("not authorized")
    //         //throw new Error()
    //     }
    //     console.log("data found")
    //     req.adminMail = decodedAdminEmail.email;
    //     next()
    // } catch (err) {

    //     res.status(403).send(err);

    // }

}



const addMovies = async (req: any, res: any) => {
    //need to work on movie adding
    try {
        let newMovie = await movieSchema(req.body)
        newMovie.save()
        res.send(newMovie)

    }

    catch (err) {
        res.status(403).send(err)
    }

}

module.exports = {
    addAdmin,
    adminLogin,
    adminAcces,
    addMovies
}