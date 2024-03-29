import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* REGISTER USER */
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNo,
      password,
      // location,
      // paymentDetail
    } = req.body;

    console.log(req.body);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      phoneNo: phoneNo,
      password: passwordHash,
      // location,
      // paymentDetail
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    console.log(user.firstName + " " + user.lastName, " logined Successfully");
    console.log(token, user);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
