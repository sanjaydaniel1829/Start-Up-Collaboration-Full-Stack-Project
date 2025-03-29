package com.startupnewbiez.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Message {
    private String content;
    private String sender;
    private LocalDateTime timestamp;
    private String type; // TEXT, IMAGE, GIF
}
