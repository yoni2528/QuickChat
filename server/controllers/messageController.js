const catchAsync = require("../utils/catchAsync");
const Message = require("../models/messageModel");

const CustomeError = require("../utils/errorHandler");

exports.createMessage = catchAsync(async (req, res) => {
  if (!req.body.message)
    throw new CustomeError(
      "Chat Error",
      "We're sorry, but there seems to be a problem with the chat service. Please try again later or contact support for assistance"
    );

  const newMessage = await Message.create(req.body);

  res.status(200).json({
    status: "Succed",
    system: "You succefully added sent new message",
    newMessage,
  });
});

exports.getMessages = catchAsync(async (req, res) => {
  const message = await Message.find({ from: req.user._id });

  res.status(200).json({
    status: "Succed",
    system: "You succefully added sent new message",
    message,
  });
});

exports.getUserMessages = catchAsync(async (req, res) => {
  const messages = await Message.find({
    $or: [{ from: req.params.id }, { to: req.params.id }],
  }).exec();

  res.status(200).json({
    status: "Succed",
    message: "You succefully connected to user",
    messages,
  });
});

exports.updateReadUserMessages = catchAsync(async (req, res) => {
  await Message.updateMany(
    { from: req.params.id, to: req.user.id },
    { read: true },
    { new: true }
  ).exec();

  const messages = await Message.find({
    $or: [{ from: req.params.id }, { to: req.params.id }],
  }).exec();

  res.status(200).json({
    status: "Succed",
    message: "You succefully connected to user",
    messages,
  });
});
