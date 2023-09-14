import { Button, TextField } from "@mui/material";
import { useTodosStatus } from "../hooks";
import { useNoticeSnackbarStatus } from "../components/NoticeSnackbar";
import { useNavigate } from "react-router-dom";

export default function WritePage() {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();
  const navigate = useNavigate();

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

    const newTodoId = todosStatus.addTodo(
      form.performDate.value,
      form.content.value
    );

    noticeSnackbarStatus.open(`${newTodoId}번 할 일이 추가되었습니다.`, "info");

    form.content.value = "";
    form.content.focus();

    // 이전 경로로 돌아가기
    navigate(-1);
  };

  return (
    <>
      <form className="flex flex-1 flex-col p-10 gap-7" onSubmit={onSubmit}>
        <TextField
          type="datetime-local"
          name="performDate"
          label="언제 해야 하나요?"
          focused
        />
        <TextField
          name="content"
          label="무엇을 해야 하나요?"
          className="flex flex-1"
          InputProps={{ className: "flex-1 flex-col" }}
          inputProps={{ className: "flex-1 flex-col" }}
          multiline
        />
        <Button type="submit" variant="contained">
          <span>
            <i className="fa-solid fa-pen"></i>
          </span>
          <span>&nbsp;&nbsp;</span>
          <span>할 일 추가</span>
        </Button>
      </form>
    </>
  );
}
