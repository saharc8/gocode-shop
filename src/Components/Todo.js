function Todo({ id, title, completed, toggleCompleted }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleCompleted(id)}
      ></input>
      {title}
    </li>
  );
}

export default Todo;
