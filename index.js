const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/user');
const cors = require('cors');
const fs = require('fs-extra');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l47bs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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


  // user registration api
  app.post('/api/register', async(req, res)=> {
    console.log(req.body);
    
    res.json({ status: 'ok' })
  })




      
    

     

// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})