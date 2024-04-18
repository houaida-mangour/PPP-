package com.devtiro.database.repositories;

import com.devtiro.database.domain.entities.EventEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends CrudRepository<EventEntity, String>,
        PagingAndSortingRepository<EventEntity, String> {
}
