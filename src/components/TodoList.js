import styled from "styled-components";
import { useTodoState } from "../TodoContext";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useTodoState();
  console.log(todos);
  return (
    <>
      <TodoListBlock>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
          />
        ))}

        {/* <TodoItem text="test" done={true} />
        <TodoItem text="test2" done={true} />
        <TodoItem text="test3" done={false} />
        <TodoItem text="test4" done={false} /> */}
      </TodoListBlock>
    </>
  );
}

export default TodoList;
