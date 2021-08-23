import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <>
      <TodoListBlock>
        <TodoItem text="test" done={true} />
        <TodoItem text="test2" done={true} />
        <TodoItem text="test3" done={true} />
        <TodoItem text="test4" done={true} />
      </TodoListBlock>
    </>
  );
}

export default TodoList;
