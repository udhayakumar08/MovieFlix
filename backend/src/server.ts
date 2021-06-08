
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from 'dotenv';
import admin from './routers/admin-route'
import user from './routers/user-route'
import visitor from './routers/visitor-routes'
env.config();



const app = express();



const startConfig = async () => {
    await app.use(cors())
    await app.use(express.json());

}



const startServer = async () => {
    await startConfig();

    console.log("initializeing db connection");

    mongoose.connection.once('open', function () {
        console.log("connect ion established")
    })
    await mongoose.connect(`mongodb+srv://OTT_user:${process.env.DB_PASSWORD}@cluster0.tjcyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connection is done");


    // app.on('error', (error: any) => console.log('server error', error.message))
    // console.log("port", process.env.PORT)
    app.listen(process.env.PORT, () => {

        console.log(`server is running 5000`)
    })
    app.use('/api/admin', admin)
    app.use('/api/user',user)
    app.use('/api/visitor',visitor)


}

startServer()
    .then(() => console.log("server started on 5000"))
    .catch((error) => console.log("errpr starting", error.message)
    )