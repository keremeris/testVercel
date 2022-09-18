
const { response } = require("express");
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { getStorage } = require('firebase-admin/storage');
const credentials = require("./jlsampleproject-firebase-adminsdk-spjvo-13c7ec3190");
const axios = require('axios');
admin.initializeApp({
   credential: admin.credential.cert(credentials),
    databaseURL:"https://jlsampleproject-default-rtdb.firebaseio.com/",
    storageBucket: 'jlsampleproject.appspot.com'
});
const db = admin.database();
const bucket = getStorage().bucket();
var addinfo_ref = db.ref('AdditionalInfomation');
var interation_ref = db.ref('Iteration');


router.get("/download_img", async (req, res) => {
  const path = req.query.path ;
  const defPath = "./"+path + ".png" ;
  console.log(path);
  console.log(defPath);
  await bucket.file(path).download({destination: defPath});
  res.download(defPath)
});
router.get("/get_iteration", async (req, res) => {

  interation_ref.once("value", function(snapshot) {
    console.log(snapshot.val().iteration);
    res.send(snapshot.val().iteration)
  });
 
});
router.get("/get_addinfo_title", async (req, res) => {
  console.log(req.body);
  addinfo_ref.child("head").once("value", function(snapshot) {
    console.log(snapshot.val().content);
    res.send(snapshot.val().content)
  });
 
});
router.get("/get_addinfo_contents", async (req, res) => {
  console.log(req.body);
  addinfo_ref.child("content").once("value", function(snapshot) {
    console.log(snapshot.val().content);
    res.send(snapshot.val().content)
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
    addinfo_ref.set({
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
