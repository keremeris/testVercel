const express = require("express");
const app = express();
const product = require("./api/product");

app.use(express.json({ extended: false }));
app.use("/api/product", product);

const admin = require("firebase-admin");
const credentials = require("./jlsampleproject-firebase-adminsdk-spjvo-13c7ec3190");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.post('/signup',async(req,res)=>{
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
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
