const Post = require("../models/Post");

class PostService {
    async getPosts() {
        const posts = await Post.find();

        return posts;
    };

    async createPost(post) {
        const createdPost = await Post.create(post);

        return createdPost;
    };

    async update(post) {
        if (!post._id) {
            throw new Error('Post not found');
        }

        const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true });

        return updatedPost;
    };

    async delete(id) {
        if (!id) {
            throw new Error('Post not found');
        }

        const post = await Post.findByIdAndDelete(id);

        return post;
    };
}

module.exports = new PostService();