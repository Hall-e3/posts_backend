import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  creator: { type: String },
  tags: [String],
  selectedFile: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

export const Posts = mongoose.model("Posts", postSchema);
