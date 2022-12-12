import React, {
  ChangeEvent, FC, useCallback, useContext, useState,
} from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { createTodos } from '../../api/todos';

interface Props {
  newTodoField: React.RefObject<HTMLInputElement>;
  loadingTodos: () => Promise<void>;
}

export const NewTodo: FC<Props> = (props) => {
  const { newTodoField, loadingTodos } = props;

  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const user = useContext(AuthContext);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const createTodo = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimTitle = title.trim();

    if (!!trimTitle && user) {
      setIsAdded(true);
      const newTodo = {
        userId: user.id,
        title,
        completed: false,
      };

      try {
        await createTodos(newTodo);
        setTitle('');
        loadingTodos();
      } catch {
        setIsError(true);
      } finally {
        setIsAdded(false);
      }
    }
  }, [title]);

  return (
    <form onSubmit={createTodo}>
      {isError ? (
        <div>
          Loading
        </div>
      ) : (
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
          disabled={isAdded}
        />
      )}
    </form>
  );
};
