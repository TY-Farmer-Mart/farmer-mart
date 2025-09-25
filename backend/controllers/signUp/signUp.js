const User = require("../../models/users/users.js");
const signUp = async (req, res) => {
  const { id, email, password } = req.body;
  console.log("reqData", email, password);

  try {
    const isUserExist = await User.findOne({ email });
    console.log("isUserExist", isUserExist);
    if (isUserExist) {
      res.send({ status: 200, message: "User has already existed" });
    } else {
      await User.insertOne({ id, email, password });
      res.send("sign up successful");
    }
  } catch (err) {
    res.send({
      status: 400,
      message: err,
    });
    console.log("error in signup", err);
  }
};

module.exports = { signUp };
