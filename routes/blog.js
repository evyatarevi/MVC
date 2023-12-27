const express = require('express');

const postControllers = require('../controllers/post-controllers');


const router = express.Router();


router.get('/', postControllers.getHome); //important: we don't execute it, instead, we just at point it. Express.js should execute it for us whenever we got an incoming request.

router.get('/admin', postControllers.getAdmin);

router.get('/posts/:id/edit', postControllers.getPostItem);

router.post('/posts', postControllers.createPost);

router.post('/posts/:id/edit', postControllers.updatePost);

router.post('/posts/:id/delete', postControllers.deletePost);


module.exports = router;
