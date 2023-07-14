// var express = require('express');
// const { response } = require('../app');
// var router = express.Router();
// var MongoClient=require('mongodb').MongoClient
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.post('/submit',function(req,res){
// console.log(req.body)

// MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client)
//  {
// if (err) {
//   console.log("Connection error:", err);
// } else {
//   console.log("DB connected successfully");
// }
// })
// res.send("oky")
// })
// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { MongoClient } = require('mongodb');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/submit', async function(req, res) {
//   console.log(req.body);

//   try {
//     const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
//     console.log("DB connected successfully");
//     client.db('rimitproject').collection('rmp').insertOne(req.body)
//     // Perform necessary database operations here

//     client.close();
//     res.send("OK");
//   } catch (err) {
//     console.log("Connection error:", err);
//     res.status(500).send("Error connecting to the database");
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { MongoClient } = require('mongodb');

// router.get('detailso', function(req, res, next) {
//   res.render('details', { title: 'Express' });
// });

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/submit', async function(req, res) {
//   console.log(req.body);

//   try {
//     const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
//     console.log("DB connected successfully");
//     const data = req.body;
//     student={
//       name:data.name,
//       rollno:data.rollno,
//       mobile:data.mobno,
//       clsid:data.clsid,
      
//     }

//     cls={
//       std:data.standerd,
//       division:data.div
//     }


//     await client.db('rimitproject').collection('Student').insertOne(student); // Move this line inside the try block
//     await client.db('rimitproject').collection('Division').insertOne(cls);
//     client.close();
//     res.redirect(detailso);
//   } catch (err) {
//     console.log("Connection error:", err);
//     res.status(500).send("Error connecting to the database");
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');



router.get('/details', function(req, res, next) {
  res.render('details', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', async function(req, res) {
  console.log(req.body);

  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    console.log("DB connected successfully");
    const data = req.body;
    const student = {
      name: data.name,
      rollno: data.rollno,
      mobile: data.mobno,
      clsid: data.clsid,
    };

    const cls = {
      std: data.standerd,
      division: data.div,
    };

    await client.db('rimitproject').collection('Student').insertOne(student);
    await client.db('rimitproject').collection('Division').insertOne(cls);
    client.close();
    res.redirect('/details');
  } catch (err) {
    console.log("Connection error:", err);
    res.status(500).send("Error connecting to the database");
  }
});



router.get('/details', async function(req, res, next) {
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    console.log("DB connected successfully");
    const db = client.db('rimitproject');
    const students = await db.collection('Student').find().toArray();
    const divisions = await db.collection('Division').find().toArray();
    client.close();

    console.log("Retrieved students:", students);
    console.log("Retrieved divisions:", divisions);

    res.render('details', { title: 'Details', students: students, divisions: divisions });
  } catch (err) {
    console.log("Connection error:", err);
    res.status(500).send("Error connecting to the database");
  }
});


module.exports = router;

