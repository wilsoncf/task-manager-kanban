package com.wilsoncf.task_manager.repository;

import com.wilsoncf.task_manager.model.Priority;
import com.wilsoncf.task_manager.model.Status;
import com.wilsoncf.task_manager.model.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void contextLoads() {
        assertThat(taskRepository).isNotNull();
    }

    @Test
    void shouldSaveAndFindTask() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("This is a test description");
        task.setStatus(Status.TODO);
        task.setPriority(Priority.LOW);
        task.setDueDate(LocalDateTime.now().plusDays(1));

        Task savedTask = taskRepository.save(task);

        assertThat(savedTask).isNotNull();
        assertThat(savedTask.getId()).isNotNull();
        assertThat(savedTask.getTitle()).isEqualTo("Test Task");

        Task foundTask = taskRepository.findById(savedTask.getId()).orElse(null);

        assertThat(foundTask).isNotNull();
        assertThat(foundTask.getTitle()).isEqualTo("Test Task");
    }
}