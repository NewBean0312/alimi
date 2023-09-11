import { useTodosStatus, useTodoOptionDrawerStatus } from "../hooks";
import TodoOptionDrawer from "../components/TodoOptionDrawer";
import TodoListItem from "../components/TodoListItem";

export default function TodoList() {
  const todosStatus = useTodosStatus();
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();
  const onCompletedBtnClicked = (id) => todosStatus.toogleTodoCompletedById(id);

  return (
    <>
      <TodoOptionDrawer status={todoOptionDrawerStatus} />
      <div className="mt-4 px-4">
        <ul>
          {todosStatus.todos.map((todo, index) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              index={index}
              openDrawer={todoOptionDrawerStatus.open}
              onCompletedBtnClicked={onCompletedBtnClicked}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
