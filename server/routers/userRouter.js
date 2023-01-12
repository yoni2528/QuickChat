const express = require("express");
const userContoller = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(userContoller.signup);
router.route("/login").post(userContoller.login);

router.use(userContoller.protect);

router
  .route("/image")
  .post(
    userContoller.deleteCurrentImage,
    userContoller.uploadImage,
    userContoller.changeUserImage
  );

router
  .route("/")
  .get(userContoller.getAllUsers)
  .patch(userContoller.updateUserDetails);
router.route("/me").get(userContoller.getMe);

module.exports = router;
