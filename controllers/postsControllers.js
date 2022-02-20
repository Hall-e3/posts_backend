import createErrors from "http-errors";
import mongoose from "mongoose";
import { Posts } from "../models/postModel.js";
export const getPosts = async (req, res, next) => {
  const posts = await Posts.find();
  res.send(posts);
};

export const getPost = async (req, res, next) => {
  const { post_id } = req.params;
  console.log(post_id);
  if (!mongoose.Types.ObjectId.isValid(post_id))
    next(createErrors.NotFound(`No entry with id ${post_id} exists`));
  await Posts.findById(post_id)
    .then((post) => {
      console.log(post);
      res.send(post);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

export const createPost = async (req, res, next) => {
  //   console.log(req.body);
  await Posts.create(req.body)
    .then((createdPost) => {
      //   console.log(createdPost);
      res.send({ createdPost, message: "Post was created successfully" });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

export const updatePost = async (req, res, next) => {
  const { post_id } = req.params;
  const body = req.body;
  if (!mongoose.Types.ObjectId.isValid(post_id))
    next(
      createErrors.NotFound(
        `Current post with this ${post_id} does not exist for update`
      )
    );

  await Posts.findByIdAndUpdate(post_id, body, { new: true })
    .then((updatedPost) => {
      //   console.log(updatedPost);
      res.send({
        updatedPost,
        message: "Post was updated successfully",
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

export const deletePost = async (req, res, next) => {
  const { post_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(post_id))
    next(
      createErrors.NotFound(
        `Current post with this ${post_id} does not exist for update`
      )
    );

  await Posts.findByIdAndRemove(post_id)
    .then(() => {
      res.send("Post was deleted successfully");
    })
    .catch((error) => next(error));
};
