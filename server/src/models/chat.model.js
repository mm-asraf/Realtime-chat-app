const { Schema, model } = "mongoose";

const ChatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Chat", ChatSchema);
