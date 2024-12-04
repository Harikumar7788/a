const jwt = require('jsonwebtoken');
const Admins = require('../Schema/user'); 

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
  
    try {
      const dbResponse = await Admins.findOne({ username });
      if (!dbResponse) {
        return res.status(400).json({ error: "Invalid user" });
      }
      if (password !== dbResponse.password) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const user = { name: username, role: dbResponse.role };
      console.log(user);
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      return res
        .status(200)
        .json({ accessToken, message: "Login successful, navigating to home..." });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).send("Server Error!");
    }
  };


  exports.register = async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const dbResponse = await Admins.findOne({ username });
      if (dbResponse) {
        return res.status(400).json({ error: "User Already Registered" });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be greater than six characters" });
      }
  
      const user = { name: username, role };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      console.log(accessToken);
  
      const newUser = new Admins({ username, password, role });
      console.log(newUser)
      await newUser.save();
  
      return res.status(200).json({ accessToken });
    } catch (error) {
      console.error("Register Error:", error);
      return res.status(500).send("Server Error!");
    }
  };