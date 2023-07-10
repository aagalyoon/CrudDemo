package com.example.scoottododemo.repository;

import com.example.scoottododemo.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
    List<TodoItem> findByDescriptionContaining(String description);
    List<TodoItem> findByPriority(String priority);
}
