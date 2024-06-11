const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error getting users" });
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "error creating user" });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "error updating user" });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deletedUser = await Users.getById(req.params.id); // Get the user before deletion
    await Users.remove(req.params.id);
    res.status(200).json(deletedUser); // Respond with the deleted user object
  } catch (error) {
    res.status(500).json({ message: "error deleting user" });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "error getting posts" });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Posts.insert({
      ...req.body,
      user_id: req.params.id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "error creating post" });
  }
});

module.exports = router;
