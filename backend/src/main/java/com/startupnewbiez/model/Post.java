package com.startupnewbiez.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String imageUrl;
    private LocalDateTime timestamp;

    @ManyToOne
    private User author;

    @ElementCollection
    private List<String> likes;

    @ElementCollection
    private List<String> comments;
}
