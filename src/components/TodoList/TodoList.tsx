import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  onUpdate: () => void;
  onDelete: (todo: Todo) => void;
}

export const TodoList: FC<Props> = (props) => {
  const { todos, onUpdate, onDelete } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
