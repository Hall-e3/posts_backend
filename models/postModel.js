import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
