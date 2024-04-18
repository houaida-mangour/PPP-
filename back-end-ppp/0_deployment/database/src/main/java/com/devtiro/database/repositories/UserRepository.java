package com.devtiro.database.repositories;

import com.devtiro.database.domain.entities.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    Iterable<UserEntity> ageLessThan(int age);

    @Query("SELECT a from UserEntity a where a.age > ?1")
    Iterable<UserEntity> findAuthorsWithAgeGreaterThan(int age);
}
