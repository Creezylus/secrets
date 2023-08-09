import mongoose from "mongoose";
import HTTPResModel from "../Models/model_HTTPRes.js";

const defaultConnString = "mongodb://127.0.0.1:27017/secretsDB";

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
            mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            httpResp = new HTTPResModel(200, 'Success.');
            
        }
        catch(error)
        {
            httpResp = new HTTPResModel(500,"Internal Server Error. Error :" + error.toString());
        }
        return httpResp;

    },
    ping(num1)
    {
        return num1 + 1;
    }
}

export default _DB_CLIENT;