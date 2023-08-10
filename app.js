import express from 'express';
import bodyParser from 'body-parser';
import _DB_CLIENT from './Clients/dbClient.js';
import 'dotenv/config'
import bcrypt from 'bcrypt';

const saltRounds = 10;

const app = express();
const port = 3000;
const dbClient = _DB_CLIENT;

/* MIDDLEWARE */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

let connectionMsg = await dbClient.connectToDB();


app.get("/", (req,res) =>{
    res.render('home.ejs');
});

app.get("/login", (req,res) =>{
    res.render('login.ejs');
});

app.get("/register", (req,res) =>{
    res.render('register.ejs');
});

app.post("/register", async (req,res) =>{
    try
    {
        bcrypt.hash(req.body.password,saltRounds, async function(err, hash){
            console.log("Hash is "+ hash.toString());
            console.log("err is "+ err);
            await dbClient.createNewUser(req.body.username, hash.toString());
        });
    }
    catch(error)
    {
        console.log(error);
    }
    
    res.render('secrets.ejs');
});

app.post("/login", async (req,res) =>{
    
   
    const loginUserName = req.body.username;
    const loginPassword = req.body.password;
    const loginResponse = await dbClient.checkLoginCredentials(loginUserName, loginPassword);
    console.log(loginResponse);
     if(loginResponse.isLoginSuccessful)
     {
        res.render('secrets.ejs');
     }
     else
     {
        res.render('login.ejs');
     }
    
    
});

app.listen(port, () =>
{
    console.log("I am listening");
});

