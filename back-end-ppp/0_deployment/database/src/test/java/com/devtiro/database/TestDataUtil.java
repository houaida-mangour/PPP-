package com.devtiro.database;

import com.devtiro.database.domain.dto.UserDto;
import com.devtiro.database.domain.dto.EventDto;
import com.devtiro.database.domain.entities.UserEntity;
import com.devtiro.database.domain.entities.EventEntity;

public final class TestDataUtil {
    private TestDataUtil(){
    }

    public static UserEntity createTestAuthorEntityA() {
        return UserEntity.builder()
                .id(1L)
                .name("Abigail Rose")
                .age(80)
                .build();
    }

    public static UserDto createTestAuthorDtoA() {
        return UserDto.builder()
                .id(1L)
                .name("Abigail Rose")
                .age(80)
                .build();
    }

    public static UserEntity createTestAuthorB() {
        return UserEntity.builder()
                .id(2L)
                .name("Thomas Cronin")
                .age(44)
                .build();
    }

    public static UserEntity createTestAuthorC() {
        return UserEntity.builder()
                .id(3L)
                .name("Jesse A Casey")
                .age(24)
                .build();
    }

    public static EventEntity createTestBookEntityA(final UserEntity userEntity) {
        return EventEntity.builder()
                .isbn("978-1-2345-6789-0")
                .title("The Shadow in the Attic")
                .userEntity(userEntity)
                .build();
    }

    public static EventDto createTestBookDtoA(final UserDto userDto) {
        return EventDto.builder()
                .isbn("978-1-2345-6789-0")
                .title("The Shadow in the Attic")
                .author(userDto)
                .build();
    }

    public static EventEntity createTestBookB(final UserEntity userEntity) {
        return EventEntity.builder()
                .isbn("978-1-2345-6789-1")
                .title("Beyond the Horizon")
                .userEntity(userEntity)
                .build();
    }

    public static EventEntity createTestBookC(final UserEntity userEntity) {
        return EventEntity.builder()
                .isbn("978-1-2345-6789-2")
                .title("The Last Ember")
                .userEntity(userEntity)
                .build();
    }
}
