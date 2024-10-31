const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const jwtSecret = process.env.JWT_SECRET;

exports.userRegister = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    }); 
    await newUser.save();

    return res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).send({ message: "Registration error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return res.status(401).send({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, jwtSecret);
    console.log("Generated token:", token);
    return res.status(200).send({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Login error" });
  }
};