const express = require('express');

const router = express.Router();

const { createPost, getPosts, deleteMany } = require('../controllers/post.controller');

router.post('/', createPost);

router.get('/', getPosts);

router.delete('/', deleteMany);


module.exports = router;