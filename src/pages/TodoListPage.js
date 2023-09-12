import { Tab, Tabs } from "@mui/material";
import { useRecoilState } from "recoil";

import { useTodosStatus, useTodoOptionDrawerStatus } from "../hooks";
import TodoOptionDrawer from "../components/TodoOptionDrawer";
import TodoListItem from "../components/TodoListItem";
import { TodoList__filterCompletedIndexAtom } from "../atoms";

export default function TodoList() {
  const todosStatus = useTodosStatus();
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();
  const onCompletedBtnClicked = (id) => todosStatus.toogleTodoCompletedById(id);
  const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
    TodoList__filterCompletedIndexAtom
  );

  const getFliteredTodos = () => {
    if (filterCompletedIndex == 1) {
      return todosStatus.todos.filter((todo) => !todo.completed);
    }

    if (filterCompletedIndex == 2) {
      return todosStatus.todos.filter((todo) => todo.completed);
    }

    return todosStatus.todos;
  }
  const filterTodos = getFliteredTodos();

  return (
    <>
      <TodoOptionDrawer status={todoOptionDrawerStatus} />
      <Tabs
        variant="fullWidth"
        value={filterCompletedIndex}
        onChange={(event, newValue) => setFilterCompletedIndex(newValue)}
      >
        <Tab
          label={
            <span className="flex">
              <i className="fa-solid fa-list-ul"></i>
              <span className="ml-2">전체</span>
            </span>
          }
          value={0}
        />
        <Tab
          label={
            <span className="flex">
              <i className="fa-regular fa-square"></i>
              <span className="ml-2">미완료</span>
            </span>
          }
          value={1}
        />
        <Tab
          label={
            <span className="flex">
              <i className="fa-regular fa-square-check"></i>
              <span className="ml-2">완료</span>
            </span>
          }
          value={2}
        />
      </Tabs>
      <div className="mt-4 px-4">
        <ul>
          {filterTodos.map((todo, index) => (
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
