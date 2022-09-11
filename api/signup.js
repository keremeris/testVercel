const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");

const credentials = require("../jlsampleproject-firebase-adminsdk-spjvo-13c7ec3190.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});
router.post("/", async (req, res) => {
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