import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

interface Props {
  todos: Todo[];
  filterType: FilterType;
  onDeleteCompleted: () => void;
  onChangeFilterType: (type: FilterType) => void;
}

export const Footer: FC<Props> = (props) => {
  const {
    todos,
    filterType,
    onDeleteCompleted,
    onChangeFilterType,
  } = props;

  const todoLength = todos.filter((todo) => todo.completed).length;
  const filterTypeValues = Object.values(FilterType);
  const completedTodos = todos.some((todo) => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todoLength} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterTypeValues.map(type => (
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className={cn('filter__link', {
              selected: filterType === type,
            })}
            onClick={() => onChangeFilterType(type)}
          >
            {type}
          </a>
        ))}
      </nav>

      {completedTodos && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={onDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
