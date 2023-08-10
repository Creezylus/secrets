import express from 'express';
import bodyParser from 'body-parser';
import _DB_CLIENT from './Clients/dbClient.js';

const app = express();
const port = 3000;
const dbClient = _DB_CLIENT;

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
    await dbClient.createNewUser(req.body.username, req.body.password);
    res.render('secrets.ejs');
});

app.post("/login", async (req,res) =>{
    
   
    const loginUserName = req.body.username;
    const loginPassword = req.body.password;
    const loginResponse = await dbClient.checkLoginCredentials(req.body.username, req.body.password);
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

