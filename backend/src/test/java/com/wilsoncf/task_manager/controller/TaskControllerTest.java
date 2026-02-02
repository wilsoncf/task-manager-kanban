package com.wilsoncf.task_manager.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.Collections;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wilsoncf.task_manager.dto.TaskRequestDTO;
import com.wilsoncf.task_manager.dto.TaskResponseDTO;
import com.wilsoncf.task_manager.exception.TaskNotFoundException;
import com.wilsoncf.task_manager.model.Priority;
import com.wilsoncf.task_manager.model.Status;
import com.wilsoncf.task_manager.service.TaskService;

@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @MockitoBean
    private TaskService taskService;

    private TaskResponseDTO taskResponseDTO;
    private TaskRequestDTO taskRequestDTO;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        LocalDateTime now = LocalDateTime.now();
        taskResponseDTO = new TaskResponseDTO(
                1L,
                "Test Task",
                "Test Description",
                Status.TODO,
                Priority.MEDIUM,
                now.plusDays(1),
                now);
        taskRequestDTO = new TaskRequestDTO(
                "Test Task",
                "Test Description",
                Status.TODO,
                Priority.MEDIUM,
                now.plusDays(1));
    }

    @Test
    void getAllTasks_ShouldReturnListOfTasks() throws Exception {
        given(taskService.getAllTasks(null)).willReturn(Collections.singletonList(taskResponseDTO));

        mockMvc.perform(get("/api/v1/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Task"));
    }

    @Test
    void getTaskById_WhenTaskExists_ShouldReturnTask() throws Exception {
        given(taskService.getTaskById(1L)).willReturn(taskResponseDTO);

        mockMvc.perform(get("/api/v1/tasks/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void getTaskById_WhenTaskDoesNotExist_ShouldReturnNotFound() throws Exception {
        given(taskService.getTaskById(1L)).willThrow(new TaskNotFoundException("Task not found"));

        mockMvc.perform(get("/api/v1/tasks/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void createTask_WithValidRequest_ShouldReturnCreated() throws Exception {
        given(taskService.createTask(any(TaskRequestDTO.class))).willReturn(taskResponseDTO);

        mockMvc.perform(post("/api/v1/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }
    
    @Test
    void createTask_WithInvalidRequest_ShouldReturnBadRequest() throws Exception {
        TaskRequestDTO invalidRequest = new TaskRequestDTO(null, null, null, null, null);

        mockMvc.perform(post("/api/v1/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateTask_WhenTaskExists_ShouldReturnOk() throws Exception {
        given(taskService.updateTask(any(Long.class), any(TaskRequestDTO.class))).willReturn(taskResponseDTO);

        mockMvc.perform(put("/api/v1/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void deleteTask_WhenTaskExists_ShouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/v1/tasks/1"))
                .andExpect(status().isNoContent());
    }
}
