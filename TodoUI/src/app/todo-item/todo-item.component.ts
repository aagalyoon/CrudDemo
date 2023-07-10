import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoItem} from "./todo-item";
import {TodoItemService} from "./todo-item-service.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  todoItems: TodoItem[] = [];
  newTodoItem: TodoItem = new TodoItem(null, null, null);
  // @ts-ignore
  searchDescription: string;
  // @ts-ignore
  searchPriority: string;

  constructor(private todoItemService: TodoItemService) { }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoItemService.getAllTodos().subscribe(
      items => this.todoItems = items
    );
  }

  addTodoItem() {
    this.todoItemService.createTodo(this.newTodoItem).subscribe(
      item => this.todoItems.push(item)
    );
    this.newTodoItem = new TodoItem(null, null, null);
  }

  deleteTodoItem(id: number) {
    this.todoItemService.deleteTodo(id).subscribe(
      _ => this.todoItems = this.todoItems.filter(item => item.id !== id)
    );
  }

  updateTodoItem(id: number) {
    let updatedTodo = this.todoItems.find(item => item.id === id);
    if (!updatedTodo)
      return;

    updatedTodo.description = this.newTodoItem.description
    updatedTodo.dueDate = this.newTodoItem.dueDate
    updatedTodo.priority = this.newTodoItem.priority

    this.todoItemService.updateTodo(id, updatedTodo).subscribe();
  }

  searchTodos() {
    this.todoItemService.searchTodos(this.searchDescription, this.searchPriority).subscribe(
      items => this.todoItems = items
    );
  }
}
