import { Button, Chip } from "@mui/material";
import classNames from "classnames";

export default function TodoListItem({
  todo,
  index,
  openDrawer,
  onCompletedBtnClicked,
}) {
  return (
    <>
      <li key={todo.id} className="mt-10">
        <div className="flex gap-2">
          <Chip
            label={`번호 : ${todo.id}`}
            variant="outlined"
            className="!pt-1"
          />
          <Chip
            label={todo.regDate}
            variant="outlined"
            color="primary"
            className="!pt-1"
          />
        </div>
        <div className="flex shadow mt-4 rounded-[20px]">
          <Button
            className="w-[130px] flex-shrink-0 !items-start !rounded-[20px_0_0_20px]"
            color="inherit"
            onClick={() => onCompletedBtnClicked(todo.id)}
          >
            <span
              className={classNames(
                "text-3xl",
                "flex items-center",
                "h-[50px]",
                {
                  "text-[color:var(--mui-color-primary-main)]": todo.completed,
                },
                {
                  "text-[color:#b0b0b0]": !todo.completed,
                }
              )}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </Button>
          <div className="flex-shrink-0 w-[2px] bg-[#b0b0b0] my-5 mr-6"></div>
          <div
            className="whitespace-pre-wrap leading-relaxed
                    hover:text-[color:var(--mui-color-primary-main)] 
                    flex-grow my-5 flex items-center"
          >
            {todo.content}
          </div>
          <Button
            onClick={() => openDrawer(todo.id)}
            className="w-[130px] flex-shrink-0 !items-start !rounded-[0__20px_20px_0]"
            color="inherit"
          >
            <span className="text-xl text-[#b0b0b0] flex items-center h-[50px]">
              <i className="fa-solid fa-ellipsis"></i>
            </span>
          </Button>
        </div>
      </li>
    </>
  );
}