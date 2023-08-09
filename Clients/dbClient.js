import mongoose from "mongoose";
import HTTPResModel from "../Models/model_HTTPRes.js";
import * as dbModel   from "../Models/Schemas/model_MongooseSchema.js";

const defaultConnString = "mongodb://127.0.0.1:27017/secret_userDB";

const _DB_CLIENT = {

    async connectToDB(ipConnString)
    {
        let httpResp;
        try
        {
            let connectionString = ipConnString;
            if(ipConnString == null)
            {
                connectionString = defaultConnString;
            }
            console.log(connectionString);
            await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            httpResp = new HTTPResModel(200, 'Success.');
            
        }
        catch(error)
        {
            httpResp = new HTTPResModel(500,"Internal Server Error. Error :" + error.toString());
        }
        return httpResp;
    },

    async createNewUser(newEmail, newPassword)
    {
        try
        {
            const newUser =  dbModel.userModel({
                email: newEmail,
                password: newPassword,
           });
    
           await newUser.save();
        }
        catch(error)
        {
            console.log(error);
        }
    },

    ping(num1)
    {
        return num1 + 1;
    }
}

export default _DB_CLIENT;