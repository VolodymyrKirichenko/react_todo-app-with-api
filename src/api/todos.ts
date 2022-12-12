import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = async (userId: number) => {
  return await client.get<Todo[]>(`/todos?userId=${userId}`) || null;
};

export const createTodos = async (todo: Omit<Todo, 'id'>) => {
  const { userId, completed, title } = todo;

  return client.post<Todo[]>('/todos', {
    userId, completed, title,
  });
};

export const deleteTodos = async (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodos = async (todoId: number, completed: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed });
};
