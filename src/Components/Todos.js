import Todo from "./Todo";

function Todos({ todos, toggleCompleted }) {
  return (
    <ul>
      {todos.map(({ id, title, completed }) => (
        <Todo
          key={id}
          id={id}
          title={title}
          completed={completed}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </ul>
  );
}

export default Todos;
