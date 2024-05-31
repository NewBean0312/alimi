import { useNoticeSnackbarStatus } from "./NoticeSnackbar";
import { useTodosStatus } from "../hooks";
import { SwipeableDrawer, List, ListItem, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TodoOptionDrawer({ status }) {
  const noticeSnackbarStatus = useNoticeSnackbarStatus(); // NoticeSnackbar 상태 가져오기
  const todosStatus = useTodosStatus(); // Todo 상태 가져오기

  // Todo 삭제 함수
  const removeTodo = () => {
    // 삭제 여부를 대화상자로 표시
    // 거부 시, 창 닫기
    if (window.confirm(`${status.todoId}번 할 일을 삭제하겠습니까?`) == false) {
      status.close();
      return;
    }

    todosStatus.removeTodoById(status.todoId); // Todo 삭제
    status.close();
    noticeSnackbarStatus.open(`${todo.id}번 할 일이 삭제되었습니다.`, "info"); // NoticeSnackbar 출력
  };

  const todo = todosStatus.findTodoById(status.todoId); // Todo 번호 찾기

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={status.opened}
        onClose={status.close}
      >
        <List className="!py-0">
          {/* Todo에 대한 정보를 표시 */}
          <ListItem className="!pt-6 !p-5">
            <span className="text-[color:var(--mui-color-primary-main)]">
              {todo?.id}번
            </span>
            <span>&nbsp;</span>
            <span>할일에 대해서</span>
          </ListItem>
          <Divider />
          {/* 클릭 시, removeTodo 함수 호출 */}
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            onClick={removeTodo}
          >
            <i className="fa-solid fa-trash-can"></i>
            &nbsp;
            <span>삭제</span>
          </ListItem>
          {/* 클릭 시, 수정(edit) 페이지로 이동 */}
          <ListItem
            className="!pt-6 !p-5 !items-baseline"
            button
            component={NavLink}
            to={`/edit/${todo?.id}`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            &nbsp;
            <span>수정</span>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}
