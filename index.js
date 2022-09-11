const express = require("express");
const app = express();
const product = require("./api/product");
const signup = require("./api/signup");

app.use(express.json({ extended: false }));
app.use("/api/product", product);
app.use("/api/signup", signup);
const admin = require("firebase-admin");
const credentials = require("./jlsampleproject-firebase-adminsdk-spjvo-13c7ec3190");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
