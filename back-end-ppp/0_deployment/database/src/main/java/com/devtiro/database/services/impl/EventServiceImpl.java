package com.devtiro.database.services.impl;

import com.devtiro.database.domain.entities.EventEntity;
import com.devtiro.database.repositories.EventRepository;
import com.devtiro.database.services.EventService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class EventServiceImpl implements EventService {

    private EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public EventEntity createUpdateEvent(String id_event, EventEntity user) {
        user.setId_event(id_event);
        return eventRepository.save(user);
    }

    @Override
    public List<EventEntity> findAll() {
        return StreamSupport
                .stream(
                        eventRepository.findAll().spliterator(),
                        false)
                .collect(Collectors.toList());
    }

    @Override
    public Page<EventEntity> findAll(Pageable pageable) {
        return eventRepository.findAll(pageable);
    }

    @Override
    public Optional<EventEntity> findOne(String id_event) {
        return eventRepository.findById(id_event);
    }

    @Override
    public boolean isExists(String id_event) {
        return eventRepository.existsById(id_event);
    }

    @Override
    public EventEntity partialUpdate(String id_event, EventEntity eventEntity) {
        eventEntity.setId_event(id_event);

        return eventRepository.findById(id_event).map(existinguser -> {
            Optional.ofNullable(eventEntity.getTitle()).ifPresent(existinguser::setTitle);
            return eventRepository.save(existinguser);
        }).orElseThrow(() -> new RuntimeException("user does not exist"));
    }

    @Override
    public void delete(String id_event) {
        eventRepository.deleteById(id_event);
    }
}
