import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({

    email: String,
    password: String,
    
});

const userModel = new mongoose.model('User', userSchema);

export {userSchema, userModel};