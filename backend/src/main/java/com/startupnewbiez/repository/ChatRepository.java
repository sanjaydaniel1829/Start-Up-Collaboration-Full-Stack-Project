package com.startupnewbiez.repository;

import com.startupnewbiez.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
    List<Chat> findByParticipantIdsContaining(String userId);
}
