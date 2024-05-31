import { Tab, Tabs } from "@mui/material";
import { useRecoilState } from "recoil";

import { useTodosStatus, useTodoOptionDrawerStatus } from "../hooks";
import TodoOptionDrawer from "../components/TodoOptionDrawer";
import TodoListItem from "../components/TodoListItem";
import {
  TodoList__filterCompletedIndexAtom,
  TodoList__sortIndexAtom,
} from "../atoms";

export default function TodoList() {
  const todosStatus = useTodosStatus(); // Todo 목록 상태 가져오기
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus(); // Todo 옵션 드로어 상태 가져오기
  const onCompletedBtnClicked = (id) => todosStatus.toogleTodoCompletedById(id); // Todo 완료 상태 관리
  const [filterCompletedIndex, setFilterCompletedIndex] = useRecoilState(
    TodoList__filterCompletedIndexAtom
  ); // 완료 상태 index를 Recoil로 저장

  const [sortIndex, setSortIndex] = useRecoilState(TodoList__sortIndexAtom); // 정렬 index를 Recoil로 저장

  // index에 따라 할 일 목록을 필터링
  const getFliteredTodos = () => {
    // 미완료
    if (filterCompletedIndex == 1) {
      return todosStatus.todos.filter((todo) => !todo.completed);
    }

    // 완료
    if (filterCompletedIndex == 2) {
      return todosStatus.todos.filter((todo) => todo.completed);
    }

    // 그 외는 전체 Todo
    return todosStatus.todos;
  };

  const filteredTodos = getFliteredTodos();

  const getSortedTodos = () => {
    if (sortIndex == 0) {
      // 시간 오름차순
      return [...filteredTodos].sort((a, b) => {
        if (a.performDate == b.performDate) return 0;

        return a.performDate > b.performDate ? 1 : -1;
      });
    } else if (sortIndex == 1) {
      // 시간 내림차순
      return [...filteredTodos].sort((a, b) => {
        if (a.performDate == b.performDate) return 0;

        return a.performDate < b.performDate ? 1 : -1;
      });
    } else if (sortIndex == 2) {
      // 작성 오름차순
      return [...filteredTodos].sort((a, b) => {
        if (a.id == b.id) return 0;

        return a.id > b.id ? 1 : -1;
      });
    }

    return filteredTodos;
  };

  const sortedTodos = getSortedTodos();

  return (
    <>
      {/* Todo 옵션 */}
      <TodoOptionDrawer status={todoOptionDrawerStatus} />
      {/* 탭 */}
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
      {/* 정렬 탭 메뉴 */}
      <Tabs
        variant="scrollable"
        value={sortIndex}
        onChange={(event, newValue) => {
          setSortIndex(newValue);
        }}
      >
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-clock mr-2"></i>
              <span className="mr-2 whitespace-nowrap">급해요</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={0}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-regular fa-clock mr-2"></i>
              <span className="mr-2 whitespace-nowrap">널럴해요</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={1}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">작성순</span>
              <i className="fa-solid fa-sort-up relative top-[3px]"></i>
            </span>
          }
          value={2}
        />
        <Tab
          className="flex-grow !max-w-[none] px-4"
          label={
            <span className="flex items-baseline">
              <i className="fa-solid fa-pen mr-2"></i>
              <span className="mr-2 whitespace-nowrap">작성순</span>
              <i className="fa-solid fa-sort-down relative top-[-3px]"></i>
            </span>
          }
          value={3}
        />
      </Tabs>
      {/* Todo List Section */}
      <div className="px-5 pb-10 sm:px-8 sm:pb-6">
        <ul>
          {sortedTodos.map((todo, index) => (
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
