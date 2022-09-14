const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');
const credentials = require("./jlsampleproject-firebase-adminsdk-spjvo-13c7ec3190");
admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL:"https://jlsampleproject-default-rtdb.firebaseio.com/",
    storageBucket: 'jlsampleproject.appspot.com'
});
const db = admin.database();
const bucket = getStorage().bucket();
var ref = db.ref('AdditionalInfomation');
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
router.get("/get_image1", async (req, res) => {

  // await bucket.file("image1.bmp").download({destination: './image1.bmp'});
  // Send the file to the client
  res.send('./image1.bmp')
     
   // Downloads the file
});



router.get("/test", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
router.post('/test_store', (req, res) => {
    console.log(req.body);
    const addInfoData ={
        title:req.body.title,
        content:req.body.content
    }
    ref.set({
            title: addInfoData.title,
            content: addInfoData.content
    });
    try {
        res.json({
          status: 200,
          message: "set data has successfully",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
});
router.post("/create_account", async (req, res) => {
    console.log(req.body);
    const user ={
        email:req.body.email,
        password:req.body.password
    }
    const userResponse = await admin.auth().createUser({
        email:user.email,
        password:user.password,
        emailVerified:false,
        disabled:false
    })
    res.json(userResponse);
});

module.exports = router;
