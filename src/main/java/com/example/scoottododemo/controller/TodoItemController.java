package com.example.scoottododemo.controller;

import com.example.scoottododemo.lib.ResourceNotFoundException;
import com.example.scoottododemo.model.TodoItem;
import com.example.scoottododemo.repository.TodoItemRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoItemController {

    @Autowired
    private TodoItemRepository todoItemRepository;

    @GetMapping("/")
    public List<TodoItem> getAllTodos() {
        return todoItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoItem> getTodoById(@PathVariable(value = "id") Long todoId) throws ResourceNotFoundException {
        TodoItem todo = todoItemRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));
        return ResponseEntity.ok().body(todo);
    }

    @PostMapping("/")
    public TodoItem createTodo(@Valid @RequestBody TodoItem todo) {
        return todoItemRepository.save(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoItem> updateTodo(@PathVariable(value = "id") Long todoId,
                                               @Valid @RequestBody TodoItem todoDetails) throws ResourceNotFoundException {
        TodoItem todo = todoItemRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));

        todo.setDescription(todoDetails.getDescription());
        todo.setDueDate(todoDetails.getDueDate());
        todo.setPriority(todoDetails.getPriority());

        final TodoItem updatedTodo = todoItemRepository.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteTodo(@PathVariable(value = "id") Long todoId) throws ResourceNotFoundException {
        TodoItem todo = todoItemRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));

        todoItemRepository.delete(todo);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/search")
    public List<TodoItem> searchTodos(@RequestParam(value = "description", required = false) String description,
                                      @RequestParam(value = "priority", required = false) String priority) {
        if (description != null) {
            return todoItemRepository.findByDescriptionContaining(description);
        } else if (priority != null) {
            return todoItemRepository.findByPriority(priority);
        } else {
            return todoItemRepository.findAll();
        }
    }
}
