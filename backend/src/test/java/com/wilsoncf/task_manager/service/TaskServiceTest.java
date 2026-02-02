package com.wilsoncf.task_manager.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.wilsoncf.task_manager.dto.TaskRequestDTO;
import com.wilsoncf.task_manager.dto.TaskResponseDTO;
import com.wilsoncf.task_manager.exception.TaskNotFoundException;
import com.wilsoncf.task_manager.model.Priority;
import com.wilsoncf.task_manager.model.Status;
import com.wilsoncf.task_manager.model.Task;
import com.wilsoncf.task_manager.repository.TaskRepository;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task;
    private TaskRequestDTO taskRequestDTO;

    @BeforeEach
    void setUp() {
        task = new Task();
        task.setId(1L);
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setStatus(Status.TODO);
        task.setPriority(Priority.MEDIUM);
        task.setDueDate(LocalDateTime.now().plusDays(1));
        task.setCreatedAt(LocalDateTime.now());

        taskRequestDTO = new TaskRequestDTO(
                "Test Task",
                "Test Description",
                Status.TODO,
                Priority.MEDIUM,
                LocalDateTime.now().plusDays(1));
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() {
        when(taskRepository.findAll()).thenReturn(Collections.singletonList(task));

        List<TaskResponseDTO> tasks = taskService.getAllTasks(null);

        assertThat(tasks).hasSize(1);
        assertThat(tasks.get(0).title()).isEqualTo("Test Task");
    }

    @Test
    void getTaskById_WhenTaskExists_ShouldReturnTask() {
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskResponseDTO foundTask = taskService.getTaskById(1L);

        assertThat(foundTask).isNotNull();
        assertThat(foundTask.title()).isEqualTo("Test Task");
    }

    @Test
    void getTaskById_WhenTaskDoesNotExist_ShouldThrowException() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> {
            taskService.getTaskById(1L);
        });
    }

    @Test
    void createTask_ShouldReturnCreatedTask() {
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponseDTO createdTask = taskService.createTask(taskRequestDTO);

        assertThat(createdTask).isNotNull();
        assertThat(createdTask.title()).isEqualTo("Test Task");
    }

    @Test
    void updateTask_WhenTaskExists_ShouldReturnUpdatedTask() {
        TaskRequestDTO updatedDto = new TaskRequestDTO(
                "Updated Title",
                "Updated Description",
                Status.DOING,
                Priority.HIGH,
                LocalDateTime.now().plusDays(2));

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskResponseDTO updatedTask = taskService.updateTask(1L, updatedDto);

        assertThat(updatedTask).isNotNull();
        assertThat(updatedTask.title()).isEqualTo("Updated Title");
        assertThat(updatedTask.status()).isEqualTo(Status.DOING);
    }

    @Test
    void updateTask_WhenTaskDoesNotExist_ShouldThrowException() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> {
            taskService.updateTask(1L, taskRequestDTO);
        });
    }

    @Test
    void deleteTask_WhenTaskExists_ShouldDeleteTask() {
        when(taskRepository.existsById(1L)).thenReturn(true);
        taskService.deleteTask(1L);

    }

    @Test
    void deleteTask_WhenTaskDoesNotExist_ShouldThrowException() {
        when(taskRepository.existsById(1L)).thenReturn(false);

        assertThrows(TaskNotFoundException.class, () -> {
            taskService.deleteTask(1L);
        });
    }
}
