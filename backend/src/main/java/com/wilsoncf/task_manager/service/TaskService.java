package com.wilsoncf.task_manager.service;

import com.wilsoncf.task_manager.dto.TaskRequestDTO;
import com.wilsoncf.task_manager.dto.TaskResponseDTO;
import com.wilsoncf.task_manager.exception.TaskNotFoundException;
import com.wilsoncf.task_manager.model.Status;
import com.wilsoncf.task_manager.model.Task;
import com.wilsoncf.task_manager.repository.TaskRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<TaskResponseDTO> getAllTasks(Status status) {
        List<Task> tasks;
        if (status != null) {
            tasks = taskRepository.findAll().stream()
                    .filter(task -> task.getStatus() == status)
                    .collect(Collectors.toList());
        } else {
            tasks = taskRepository.findAll();
        }
        return tasks.stream()
                .map(TaskResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TaskResponseDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
        return TaskResponseDTO.fromEntity(task);
    }

    @Transactional
    public TaskResponseDTO createTask(TaskRequestDTO taskDto) {
        Task task = new Task();
        task.setTitle(taskDto.title());
        task.setDescription(taskDto.description());
        task.setStatus(Status.TODO);
        task.setPriority(taskDto.priority());
        task.setDueDate(taskDto.dueDate());
        Task savedTask = taskRepository.save(task);
        return TaskResponseDTO.fromEntity(savedTask);
    }

    @Transactional
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO taskDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

        task.setTitle(taskDto.title());
        task.setDescription(taskDto.description());
        task.setStatus(taskDto.status());
        task.setPriority(taskDto.priority());
        task.setDueDate(taskDto.dueDate());

        Task updatedTask = taskRepository.save(task);
        return TaskResponseDTO.fromEntity(updatedTask);
    }

    @Transactional
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}
