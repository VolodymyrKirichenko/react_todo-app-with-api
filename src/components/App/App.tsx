import { FC } from 'react';
import { NewTodo } from '../NewTodo/NewTodo';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Footer } from '../Footer/Footer';
import { TodoList } from '../TodoList/TodoList';
import { SelectedButton } from '../Buttons/SelectedButton';
import { useApp } from './hooks/useApp';

export const App: FC = () => {
  const {
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
  } = useApp();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <SelectedButton
            isSelected={isSelected}
            onSelectAll={selectAll}
          />

          <NewTodo
            loadingTodos={loadingTodos}
            newTodoField={newTodoField}
          />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onUpdate={loadingTodos}
            />

            <Footer
              todos={todos}
              filterType={filterType}
              onDeleteCompleted={deleteCompleted}
              onChangeFilterType={handleChangeFilterType}
            />
          </>
        )}
      </div>

      <ErrorMessage
        isError={hasLoadingError}
        onCloseError={handleError}
      />
    </div>
  );
};
