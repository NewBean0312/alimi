import { Button, TextField } from "@mui/material";
import { useTodosStatus } from "../hooks";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();

  const todo = todosStatus.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    if (form.performDate.value.length == 0) {
      alert("날짜를 입력해주세요.");
      form.performDate.focus();

      return;
    }

    if (form.content.value.length == 0) {
      alert("내용을 입력해주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosStatus.modifyTodoById(
      todo.id,
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarStatus.open(`${todo.id}번 할 일이 수정되었습니다.`);

    // 이전 경로로 돌아가기
    navigate(-1);
  };

  // regDate의 날짜를 문자로 변경
  const regDateForInput = todo.performDate.substr(0, 16).replace(" ", "T");

  return (
    <>
      <form
        className="flex flex-1 flex-col gap-7 p-6 sm:p-8"
        onSubmit={onSubmit}
      >
        {/* 날짜 입력 영역 */}
        <TextField
          type="datetime-local"
          name="performDate"
          label="언제 해야 하나요?"
          focused
          defaultValue={regDateForInput}
        />
        {/* 내용 입력 영역 */}
        <TextField
          name="content"
          label="무엇을 해야 하나요?"
          className="flex flex-1"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1 flex-col" }}
          multiline
          defaultValue={todo.content}
        />
        <Button type="submit" variant="contained">
          <span>
            <i className="fa-solid fa-pen"></i>
          </span>
          <span>&nbsp;&nbsp;</span>
          <span>할 일 수정</span>
        </Button>
      </form>
    </>
  );
}
