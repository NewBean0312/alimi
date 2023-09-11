import TodosEmpty from "../components/TodosEmpty";
import { useTodosStatus } from "../hooks";
import TodoListPage from "./TodoListPage";

export default function MainPage() {
  const todosStatus = useTodosStatus();
  const todosEmpty = todosStatus.todos.lenght == 0;

  if (todosEmpty) {
    return <TodosEmpty />;
  }

  return (
    <>
      <TodoListPage />
    </>
  );
}
