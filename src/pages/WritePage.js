import { TextField } from "@mui/material";

export default function WritePage() {
  return (
    <>
      <div className="flex flex-1 flex-col p-10 gap-7">
        <TextField type="datetime-local" label="언제 해야 하나요?" focused />
        <TextField
          label="무엇을 해야 하나요?"
          className="flex flex-1"
          InputProps={{ className: "bg-blue-500 flex-1 flex-col" }}
          inputProps={{ className: "!bg-pink-500 flex-1 flex-col" }}
          multiline
        />
      </div>
    </>
  );
}
