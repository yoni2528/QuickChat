const path = require("path");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const multer = require("multer");

const SharpMulter = require("sharp-multer");

const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const CustomeError = require("../utils/errorHandler");

const signToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET);
  return token;
};

const verifyToken = async (token) => {
  const verifyId = await jwt.verify(token, process.env.JWT_SECRET);
  return verifyId;
};

const comparePassowrd = async (typedPass, dbPass) => {
  const isCorrect = await bcrypt.compare(typedPass, dbPass);
  return isCorrect;
};

exports.signup = catchAsync(async (req, res) => {
  const userObj = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(userObj);
  const token = await signToken(user.id);

  res.status(200).json({
    status: "succed",
    message: "You have succesfully signed up!",
    token,
    user: { id: user.id, nickName: user.nickName, token },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email)
    throw new CustomeError(
      "Authentication Error",
      "Invalid login credentials, Please check your email and password and try again"
    );

  const currUser = await User.findOne({ email: email }).select("+password");

  if (!currUser)
    throw new CustomeError(
      "Authentication Error",
      "Invalid login credentials, Please check your email and password and try again"
    );

  const isVerfied = await comparePassowrd(password, currUser.password);

  if (!isVerfied)
    throw new CustomeError(
      "Authentication Error",
      "Invalid login credentials, Please check your email and password and try again"
    );

  const token = await signToken(currUser.id);

  res.status(200).json({
    status: "succed",
    message: "You have succesfuuly logged in to website",
    user: {
      id: currUser.id,
      nickName: currUser.nickName,
      token,
      image: currUser.image,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization)
    throw new CustomeError(
      "Token Error",
      "Invalid or expired token. Please login again or contact support for assistance."
    );

  const token = req.headers.authorization.replace("Bearer ", "").toString();

  if (!token)
    throw new CustomeError(
      "Token Error",
      "Invalid or expired token. Please login again or contact support for assistance."
    );

  const { id } = await verifyToken(token);

  const user = await User.findOne({ _id: id });

  if (!user)
    throw new CustomeError(
      "Token Error",
      "Invalid or expired token. Please login again or contact support for assistance."
    );

  req.user = user;

  next();
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select("-password -__v");

  res.status(200).json({
    status: "Succed",
    users,
  });
});

const storage = SharpMulter({
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}`);
  },

  destination: (req, file, callback) => callback(null, "./public"),
  imageOptions: {
    fileFormat: "jpg",
    quality: 80,
    resize: { width: 500, height: 500 },
  },
});
const upload = multer({ storage });

exports.uploadImage = upload.single("image");

exports.deleteCurrentImage = catchAsync(async (req, res, next) => {
  const currImage = await User.findById(req.user.id);

  const { image } = currImage;

  if (image.includes("avatar")) return next();

  const filePath = `${image}`;

  fs.unlink(path.join("public", filePath), (err) => {
    try {
      if (!err) return;
      throw new Error(err.message);
    } catch (error) {
      console.log(error);
    }
  });
  next();
});

exports.changeUserImage = catchAsync(async (req, res, next) => {
  await User.findById(req.user.id);

  const filePath = `${req.file.filename}`;
  const newfilePath = `${Date.now()}.jpg`;

  fs.rename(path.join("public", filePath), path.join("public", newfilePath), (err) => {
    console.log(err);
  });

  const newData = await User.findByIdAndUpdate(
    req.user.id,
    {
      image: newfilePath,
    },
    { new: true }
  );

  res.status(200).json({
    status: "Succed",
    data: newData,
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "Succed",
    user: { id: user.id, nickName: user.nickName, image: user.image },
  });
});

exports.updateUserDetails = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Succed",
    user: { id: user.id, nickName: user.nickName, image: user.image },
  });
});
