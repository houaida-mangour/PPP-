package com.devtiro.database.controllers;

import com.devtiro.database.domain.dto.EventDto;
import com.devtiro.database.domain.entities.EventEntity;
import com.devtiro.database.mappers.Mapper;
import com.devtiro.database.services.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class EventController {

    private EventService eventService;
    private Mapper<EventEntity, EventDto> EventMapper;

    public EventController(Mapper<EventEntity, EventDto> EventMapper, EventService eventService) {
        this.EventMapper = EventMapper;
        this.eventService = eventService;
    }

    @PutMapping(path = "/Events/{id_event}")
    public ResponseEntity<EventDto> createUpdateEvent(@PathVariable String id_event, @RequestBody EventDto eventDto) {
        EventEntity eventEntity = EventMapper.mapFrom(eventDto);
        boolean EventExists = eventService.isExists(id_event);
        EventEntity savedEventEntity = eventService.createUpdateEvent(id_event, eventEntity);
        EventDto savedUpdatedEventDto = EventMapper.mapTo(savedEventEntity);

        if(EventExists){
            return new ResponseEntity(savedUpdatedEventDto, HttpStatus.OK);
        } else {
            return new ResponseEntity(savedUpdatedEventDto, HttpStatus.CREATED);
        }
    }

    @PatchMapping(path = "/Events/{id_event}")
    public ResponseEntity<EventDto> partialUpdateEvent(
            @PathVariable("id_event") String id_event,
            @RequestBody EventDto eventDto
    ){
        if(!eventService.isExists(id_event)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        EventEntity eventEntity = EventMapper.mapFrom(eventDto);
        EventEntity updatedEventEntity = eventService.partialUpdate(id_event, eventEntity);
        return new ResponseEntity<>(
                EventMapper.mapTo(updatedEventEntity),
                HttpStatus.OK);

    }

    @GetMapping(path = "/Events")
    public List<EventDto> listEvents() {
        List<EventEntity> Events = eventService.findAll();
        return Events.stream()
                .map(EventMapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/Events/{id_event}")
    public ResponseEntity<EventDto> getEvent(@PathVariable("id_event") String id_event) {
        Optional<EventEntity> foundEvent = eventService.findOne(id_event);
        return foundEvent.map(EventEntity -> {
            EventDto eventDto = EventMapper.mapTo(EventEntity);
            return new ResponseEntity<>(eventDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping(path = "/Events/{id_event}")
    public ResponseEntity deleteEvent(@PathVariable("id_event") String id_event) {
        eventService.delete(id_event);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
