// User controller code will go here
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user by the params UserId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("followers")
      .populate("following")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            }),
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  async getMe({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json(foundUser);
  },
  // create a new user
  // createUser(req, res) {
  //   const user = User.create(req.body);
  //   const token = signToken(user)
  //     .then((user) => res.json({ token, user }))
  //     .catch((err) => res.status(500).json(err));
  // },
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  //login user
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }
    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // Update a user by its userID from params
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user),
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by its params userId, delete any thought associated
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } }),
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" }),
      )
      .catch((err) => res.status(500).json(err));
  },

  // Follow: userId follows friendId (keeps route names for compatibility)
  addFriend(req, res) {
    const followerId = req.params.userId; // the user performing the follow
    const followingId = req.params.friendId; // the user being followed
    Promise.all([
      // Add followingId to followerId's following array
      User.findOneAndUpdate(
        { _id: followerId },
        { $addToSet: { following: followingId } },
        { runValidators: true, new: true },
      ),
      // Add followerId to followingId's followers array
      User.findOneAndUpdate(
        { _id: followingId },
        { $addToSet: { followers: followerId } },
        { runValidators: true, new: true },
      ),
    ])
      .then(([follower, following]) => {
        if (!follower || !following) {
          return res
            .status(404)
            .json({ message: "One or both users not found :(" });
        }
        res.json({ follower, following });
      })
      .catch((err) => res.status(500).json(err));
  },
  // Unfollow: userId unfollows friendId
  removeFriend(req, res) {
    const followerId = req.params.userId;
    const followingId = req.params.friendId;

    Promise.all([
      User.findOneAndUpdate(
        { _id: followerId },
        { $pull: { following: followingId } },
        { runValidators: true, new: true },
      ),
      User.findOneAndUpdate(
        { _id: followingId },
        { $pull: { followers: followerId } },
        { runValidators: true, new: true },
      ),
    ])
      .then(([follower, followed]) =>
        !follower || !followed
          ? res.status(404).json({ message: "User not found" })
          : res.json({ follower, followed }),
      )
      .catch((err) => res.status(500).json(err));
  },
};
