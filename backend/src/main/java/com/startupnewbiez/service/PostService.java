package com.startupnewbiez.service;

import com.startupnewbiez.model.Post;
import com.startupnewbiez.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getPostsByUser(String userId) {
        return postRepository.findByAuthorId(userId);
    }

    public Post updatePost(String postId, Post post) {
        return postRepository.save(post);
    }

    public void deletePost(String postId) {
        postRepository.deleteById(postId);
    }
}
