const express = require("express");
const router = express.Router();

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {
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
router.post("/signup", async (req, res) => {
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
