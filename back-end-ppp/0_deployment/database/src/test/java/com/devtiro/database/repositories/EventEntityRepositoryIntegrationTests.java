package com.devtiro.database.repositories;

import com.devtiro.database.TestDataUtil;
import com.devtiro.database.domain.entities.UserEntity;
import com.devtiro.database.domain.entities.EventEntity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class EventEntityRepositoryIntegrationTests {

    private EventRepository underTest;

    @Autowired
    public EventEntityRepositoryIntegrationTests(EventRepository underTest) {
        this.underTest = underTest;
    }

    @Test
    public void testThatBookCanBeCreatedAndRecalled() {
        UserEntity userEntity = TestDataUtil.createTestAuthorEntityA();
        EventEntity eventEntity = TestDataUtil.createTestBookEntityA(userEntity);
        underTest.save(eventEntity);
        Optional<EventEntity> result = underTest.findById(eventEntity.getIsbn());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(eventEntity);
    }

    @Test
    public void testThatMultipleBooksCanBeCreatedAndRecalled() {
        UserEntity userEntity = TestDataUtil.createTestAuthorEntityA();

        EventEntity eventEntityA = TestDataUtil.createTestBookEntityA(userEntity);
        underTest.save(eventEntityA);

        EventEntity eventEntityB = TestDataUtil.createTestBookB(userEntity);
        underTest.save(eventEntityB);

        EventEntity eventEntityC = TestDataUtil.createTestBookC(userEntity);
        underTest.save(eventEntityC);

        Iterable<EventEntity> result = underTest.findAll();
        assertThat(result)
                .hasSize(3)
                .containsExactly(eventEntityA, eventEntityB, eventEntityC);
    }

    @Test
    public void testThatBookCanBeUpdated() {
        UserEntity userEntity = TestDataUtil.createTestAuthorEntityA();

        EventEntity eventEntityA = TestDataUtil.createTestBookEntityA(userEntity);
        underTest.save(eventEntityA);

        eventEntityA.setTitle("UPDATED");
        underTest.save(eventEntityA);

        Optional<EventEntity> result = underTest.findById(eventEntityA.getIsbn());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(eventEntityA);
    }

    @Test
    public void testThatBookCanBeDeleted() {
        UserEntity userEntity = TestDataUtil.createTestAuthorEntityA();

        EventEntity eventEntityA = TestDataUtil.createTestBookEntityA(userEntity);
        underTest.save(eventEntityA);

        underTest.deleteById(eventEntityA.getIsbn());

        Optional<EventEntity> result = underTest.findById(eventEntityA.getIsbn());
        assertThat(result).isEmpty();
    }
}
