const router = require("express").Router();

// Thought routes

// Routes from controller
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
  getReaction,
} = require("../../controllers/thoughtController.js");

// /api/users
router.route("/").get(getThoughts).post(createThought);

// /api/users
router.route("/reactions").get(getReaction);

// /api/users/:thought
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
