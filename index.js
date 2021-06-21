const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/user');
const cors = require('cors');
const fs = require('fs-extra');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l47bs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const JWT_SECRET = 'sl@%lkfj%$#34552sfofnsf34@@##$@#%$%23lfsjdflsfj slfjsldfj';

mongoose.connect('mongodb://localhost:27017/login-app-db',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('services'));
app.use(fileUpload())
const port = 5000



// client.connect(err => {
//   const jobsCollection = client.db(`${process.env.DB_NAME}`).collection("Jobs");


 //user login api                   
 app.post('/api/login', async (req, res) => {
   const {email, password} = req.body;

   const user = await User.findOne({email}).lean()

   if(!user){
     return res.json({status: "error", error: 'Invalid email/password'})
   }

   if(await bcrypt.compare(password, user.password)){
     const token = jwt.sign({
       id: user._id, 
       email: user.email
     }, 
     JWT_SECRET
   )
        return res.json({status: "ok", data: ''})
   }


     res.json({status: 'error', error: "Invalid email/password"});
 })   

  // user registration api
  app.post('/api/register', async(req, res)=> {
    console.log(req.body);

    const {name, email, password, role, companyName} = req.body;

    console.log(await bcrypt.hash(password, 10))

    try{
       const response = await User.create({
         name,
         password,
         email,
         role,
         companyName 
       })
       console.log("User created successfully", response)
    }catch(error){
      console.log(error)
      return res.json({ status: 'error' })
    }
    
    res.json({ status: 'ok' })
  })




      
    

     

// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})