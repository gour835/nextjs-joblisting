import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    }

}, {timestamps: true});

const Users = mongoose.models.user || mongoose.model('user', userSchema);

export default Users;