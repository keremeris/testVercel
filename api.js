
const { response } = require("express");
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
router.post("/img", async (req, res) => {
  console.log(req.params);
  response.send(req.params);
  /*var fileRef = bucket.file('image1.bmp');
  
  fileRef.exists().then(function(data) {
    console.log("File in database exists ");
  });
  const config = {
    action: 'read',
    
    // A timestamp when this link will expire
    expires: '01-01-2026',
  };
  // Get the link to that file
  fileRef.getSignedUrl(config, function(err, url) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(url)
    console.log("Url is : " + url);  
  });*/

});

router.get("/get_image1", async (req, res) => {
  var fileRef = bucket.file('image1.bmp');
  
  fileRef.exists().then(function(data) {
    console.log("File in database exists ");
  });
  const config = {
    action: 'read',
    
    // A timestamp when this link will expire
    expires: '01-01-2026',
  };
  // Get the link to that file
  fileRef.getSignedUrl(config, function(err, url) {
    if (err) {
      console.error(err);
      return;
    }
    res.send(url)
    console.log("Url is : " + url);  
  });

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
    rootRef.set({
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
/*router.post("/create_account", async (req, res) => {
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
});*/

module.exports = router;
