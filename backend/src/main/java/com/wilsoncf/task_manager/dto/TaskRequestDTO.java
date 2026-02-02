package com.wilsoncf.task_manager.dto;

import java.time.LocalDateTime;

import com.wilsoncf.task_manager.model.Priority;
import com.wilsoncf.task_manager.model.Status;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskRequestDTO(
    @NotBlank(message = "Title cannot be empty")
    String title,

    String description,

    @NotNull(message = "Status cannot be null")
    Status status,

    @NotNull(message = "Priority cannot be null")
    Priority priority,

    @NotNull(message = "Due date cannot be null")
    LocalDateTime dueDate
) {}
