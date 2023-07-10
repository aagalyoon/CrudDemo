import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoItem} from "./todo-item";

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  private apiUrl = 'http://localhost:8080/api/todos/';

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  getTodoById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.apiUrl}${id}`);
  }

  createTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: TodoItem | undefined): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}${id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }

  searchTodos(description?: string, priority?: string): Observable<TodoItem[]> {
    let params = new HttpParams();
    if (description) params = params.append('description', description);
    if (priority) params = params.append('priority', priority);

    return this.http.get<TodoItem[]>(`${this.apiUrl}search`, { params: params });
  }
}
