import {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { Todo } from '../../../types/Todo';
import { FilterType } from '../../../types/FilterType';
import { deleteTodos, getTodos, updateTodos } from '../../../api/todos';

export const useApp = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [isSelected, setIsSelected] = useState(true);

  const handleLoadingError = useCallback((error: string) => {
    setHasLoadingError(true);

    throw new Error(error);
  }, []);

  const handleError = useCallback(() => {
    setHasLoadingError(false);
  }, []);

  const handleChangeFilterType = useCallback((type: FilterType) => {
    setFilterType(type);
  }, []);

  const loadingTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch (error) {
        handleLoadingError('Error');
      }
    }
  }, []);

  const selectedComplete = useCallback(async (todo: Todo) => {
    try {
      await updateTodos(todo.id, !todo.completed);
      loadingTodos();
    } catch {
      setHasLoadingError(true);
    }
  }, []);

  const selectAll = useCallback(async () => {
    todos.map(async (todo) => {
      if (!todo.completed && isSelected) {
        await selectedComplete(todo);
      } else if (todo.completed && !isSelected) {
        await selectedComplete(todo);
      }
    });

    setIsSelected(!isSelected);
  }, [todos]);

  const deleteTodo = useCallback(async (todo: Todo) => {
    try {
      await deleteTodos(todo.id);
      loadingTodos();
    } catch {
      setHasLoadingError(true);
    }
  }, []);

  const deleteCompleted = useCallback(async () => {
    Promise.all(todos.map(async todo => {
      if (todo.completed) {
        try {
          await deleteTodos(todo.id);
          loadingTodos();
        } catch {
          setHasLoadingError(true);
        }
      }
    }));
  }, [todos]);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => {
      switch (filterType) {
        case FilterType.ALL:
          return todo;

        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    })
  ), [todos, filterType]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadingTodos();
    }
  }, [user]);

  return {
    todos,
    selectAll,
    deleteTodo,
    isSelected,
    filterType,
    handleError,
    loadingTodos,
    newTodoField,
    filteredTodos,
    deleteCompleted,
    hasLoadingError,
    handleChangeFilterType,
  };
};
