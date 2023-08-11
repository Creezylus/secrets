import mongoose from "mongoose";
import HTTPResModel from "../Models/model_HTTPRes.js";
import * as dbModel   from "../Models/Schemas/model_MongooseSchema.js";
import 'dotenv/config'
import bcrypt from 'bcrypt';

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
        let httpResp;
        try
        {
            const newUser =  dbModel.userModel({
                email: newEmail,
                password: newPassword,
           });
    
           await newUser.save();

           httpResp = new HTTPResModel(200,"Success. Added user with email" + newEmail);
        }
        catch(error)
        {
            console.log(error);
            httpResp = new HTTPResModel(500,"Internal Server Error. Error: " + error);
        }

        return httpResp;
    },

    async checkLoginCredentials(loginUsername, loginPassword)
    {
        let httpResp;
        var success = 1;

        let dbUser = await dbModel.userModel.findOne({email:loginUsername});
        if(dbModel == null)
        {
            httpResp = new HTTPResModel(401, "Unauthorized. No user registered with " + loginUsername);
            success = 0;
        }
        
        if(success) 
        { 
            let resp = await bcrypt.compare(loginPassword, dbUser.password)
            if(resp == false) 
            {
                console.log('false resdp is '+resp);
                success = 0;
                httpResp = new HTTPResModel(401, "Unauthorized. No user registered with " + loginUsername);
            }
        }
        
        if(success == 1)
        {
            httpResp = new HTTPResModel(200,"Success. Login successful");
        }

        const response = {
            http: httpResp,
            isLoginSuccessful: success,
        }

        return response;
    },

    ping(num1)
    {
        return num1 + 1;
    }
}

export default _DB_CLIENT;