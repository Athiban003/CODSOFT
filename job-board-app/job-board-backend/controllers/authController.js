const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(201).json({ message: "Signup successfull" });
  } catch (err) {
    console.error(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email does not exists" });
      return;
    }
    if (user.role != role) {
      res.status(404).json({ message: "Invalid access" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { signupUser, loginUser };
