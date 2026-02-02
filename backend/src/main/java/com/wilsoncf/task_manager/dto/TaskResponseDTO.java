package com.wilsoncf.task_manager.dto;

import java.time.LocalDateTime;

import com.wilsoncf.task_manager.model.Priority;
import com.wilsoncf.task_manager.model.Status;
import com.wilsoncf.task_manager.model.Task;

public record TaskResponseDTO(
    Long id,
    String title,
    String description,
    Status status,
    Priority priority,
    LocalDateTime dueDate,
    LocalDateTime createdAt
) {
    public static TaskResponseDTO fromEntity(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getCreatedAt());
    }
}
