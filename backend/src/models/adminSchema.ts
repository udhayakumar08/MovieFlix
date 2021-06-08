import mongoose from 'mongoose'




const adminSchema: any = new mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const admin: any = mongoose.model('admin', adminSchema)
export default admin;