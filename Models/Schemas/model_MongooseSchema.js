import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import 'dotenv/config'

const userSchema =  new mongoose.Schema({

    email: String,
    password: String,
    
});
userSchema.plugin(encrypt, {secret: process.env.DB_SECRET, encryptedFields: ['password']});
const userModel = new mongoose.model('User', userSchema);

export {userSchema, userModel};