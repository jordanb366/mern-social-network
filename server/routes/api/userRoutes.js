const router = require("express").Router();

// User routes

// Routes from controller
const {
  getUsers,
  getMe,
  getSingleUser,
  createUser,
  login,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

router.route("/login").post(login);

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/me').get(authMiddleware, getMe);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/students/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
