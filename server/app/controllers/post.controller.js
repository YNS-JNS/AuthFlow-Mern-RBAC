const db = require("../models");
const PostModel = db.post;

exports.createPost = (req, res) => {
    const newPost = new PostModel({ ...req.body });

    newPost.save()
        .then(
            post => {

                if (!post) {
                    return res.status(400).json({ message: "Failed! Post not created!" })
                }

                res.status(201).json({
                    status: 201,
                    message: "Post created successfully!",
                    post
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to create post!",
                    error
                });
            }
        );
};

exports.getPosts = (req, res) => {

    PostModel.find()
        .then(
            posts => {

                if (!posts || posts.length === 0) {
                    return res.status(400).json({ message: "Failed! Posts not found!" })
                }

                res.status(200).json({
                    status: 200,
                    message: "Get Posts successfully!",
                    totalPosts: posts.length,
                    posts
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    status: 500,
                    message: "Failed to get posts!",
                    error
                });
            }
        );
};

exports.deleteMany = (req, res) => {

    PostModel.deleteMany()
      .then(
        posts => {
            if (!posts) {
                return res.status(400).json({ message: "Failed! Posts not deleted!" })
            }
            res.status(200).json({
                status: 200,
                message: "Posts deleted successfully!",
                posts
            });
        }
      )
      .catch(
        error => {
            res.status(500).json({
                status: 500,
                message: "Failed to delete posts!",
                error
            });
        }
      );
}