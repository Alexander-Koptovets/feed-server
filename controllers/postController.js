const Post = require('../models/Post');
const PostService = require('../service/postService');

class PostController {
    async getPosts(req, res) {
        try {
            const posts = await PostService.getPosts();

            return res.json(posts);
        } catch (e) {
            console.log(e);
            return res.status(400).json(e.message);
        }
    };

    async createPost(req, res) {
        try {
            const post = await PostService.createPost(req.body);

            return res.json(post);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body);

            return res.json(updatedPost);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);

            return res.json(post);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
}

module.exports = new PostController();