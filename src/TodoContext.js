import { createContext, useContext, useReducer, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "Go jogging",
    done: true,
  },
  {
    id: 2,
    text: "Buy a birthday gift for Lucy",
    done: false,
  },
  {
    id: 3,
    text: "Water plants",
    done: true,
  },
  {
    id: 4,
    text: "Go to grocery shopping",
    done: false,
  },
];

// 세가지 액션을 만들건데,
// CREATE
// TOGGLE - 켰다껐다하는 액션
// REMOVE
function todoReducer(state, action) {
  // useReducer에서 사용할 함수 - state와 action을 가져와서 다음 상태를 리턴해주는 함수.

  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo); // action에 todo항목을 넣어서 나중에 dispatch해줄것임.
    case "TOGGLE":
      return state.map(
        //state.map을 해서 모든 todo에 대하여 변환을 해줄건데,
        // 만약에 todo.id === action.id 이러면 todo를 업데이트 해줄거다. done값을 기존값의 반대되는걸 넣어주는거. done: !todo.done
        (todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)
      );
    case "REMOVE": // todo 모든 항목들에 대하여 todo.id !== action.id 이렇게 일치하지 않는 애들만 가져오겠다는 거.
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
