import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

export const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "persistAtomTodos",
});

export const { persistAtom: persistAtomLastTodoId } = recoilPersist({
  key: "persistAtomLastTodoId",
});

export const { persistAtom: persistAtomCommon } = recoilPersist({
  key: "persistAtomCommon"
});

export const todosAtom = atom({
  key: "app/todosAtom",
  default: [],
  effects_UNSTABLE: [persistAtomTodos],
});

export const lastTodoIdAtom = atom({
  key: "app/lastTodoIdAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomLastTodoId],
});

export const TodoList__filterCompletedIndexAtom = atom({
  key: "app/TodoList__filterCompletedIndexAtom",
  default: 0,
  effects_UNSTABLE: [persistAtomCommon]
});