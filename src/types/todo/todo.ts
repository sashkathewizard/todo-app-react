import { TodoStatus } from "../../utils/enums/status.enum";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
