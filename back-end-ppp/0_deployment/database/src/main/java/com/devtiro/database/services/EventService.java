package com.devtiro.database.services;

import com.devtiro.database.domain.entities.EventEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface EventService {

    EventEntity createUpdateEvent(String id_event, EventEntity user);

    List<EventEntity> findAll();

    Page<EventEntity> findAll(Pageable pageable);

    Optional<EventEntity> findOne(String id_event);

    boolean isExists(String id_event);

    EventEntity partialUpdate(String id_event, EventEntity eventEntity);

    void delete(String id_event);


}
