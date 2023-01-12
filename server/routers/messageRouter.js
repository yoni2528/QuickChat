const express = require("express");
const messageController = require("../controllers/messageController");
const userContoller = require("../controllers/userController");

const router = express.Router();

router.use(userContoller.protect);

router
  .route("/")
  .post(messageController.createMessage)
  .get(messageController.getMessages);
router
  .route("/:id")
  .get(messageController.getUserMessages)
  .patch(messageController.updateReadUserMessages);

module.exports = router;
