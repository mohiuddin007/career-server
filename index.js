const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l47bs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.static('services'));
app.use(fileUpload())
const port = 5000



client.connect(err => {
  const jobsCollection = client.db(`${process.env.DB_NAME}`).collection("Jobs");

    //Post services data with Image by Admin
    app.post('/jobs', (req, res) => {
      const file = req.files.file;
      const title = req.body.title;
      const description = req.body.description;
       const newImage = file.data;
       const encImage = newImage.toString('base64');
        
        var image = {
          contentType: file.mimetype,
          size: file.size,
          img: Buffer.from(encImage, 'base64')
        };

        // servicesCollection.insertOne({title, description, image})
        // .then(result => {
        //     res.send(result.insertedCount > 0);
        // })
   })

      // Get all services and Show in Home page
      app.get('/jobs', (req, res) => {
        jobsCollection.find({})
        .toArray((err, documents) => {
          res.send(documents);
        })
       })
    
       //Post Customer's Order Data
      //  app.post('/addNewOrder', (req, res) => {
      //    const newOrder = req.body;
      //    OrderCollection.insertOne(newOrder)
      //    .then(result => {
      //      res.send(result.insertedCount > 0)
      //    })
      //  })

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})