export class TodoItem {
  // @ts-ignore
  id: number;
  description: string;
  dueDate: string;
  priority: string;

  constructor(description: any, dueDate: any, priority: any) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
