const { Schema, Types } = require("mongoose");

// Reaction schema only
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formattedDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

function formattedDate(createdAt) {
  const date = new Date(createdAt);

  return date.toDateString();
}

module.exports = reactionSchema;
