import "./App.css";
import "./style.css";
import "./components/Nav/Nav.css";
import "./components/Products/Products.css";
import "./components/Product/Product.css";
import "./components/ProductCart/ProductCart.css";
import "./components/Cart/Cart.css";
import "./components/Loading/Loading.css";
import { React } from "react";
import ProductsDetails from "./views/ProductsDetails";
import Home from "./views/Home";
import { Route, Switch } from "react-router-dom";
// import Toggle from "./Components/Toggle";
// import Todos from "./Components/Todos";

function App() {
  return (
    <>
      <Switch>
        <Route path="/products/:id">
          <ProductsDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>

    //  <Toggle />

    //  <br></br>
    // <input
    //   value={newTodo}
    //   onChange={(e) => {
    //     setNewTodo(e.target.value);
    //   }}
    //   placeholder="insert your todo"
    // ></input>
    // <button onClick={() => addTodo(newTodo)}>Add Todo</button>
    // <Todos todos={todos} toggleCompleted={toggleCompleted} />
  );

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: "throw the garbage",
  //     completed: false,
  //   },
  //   {
  //     id: 2,
  //     title: "do home work",
  //     completed: false,
  //   },
  // ]);

  // function toggleCompleted(id) {
  //   console.log(id);
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         todo.completed = !todo.completed;
  //       }
  //       return todo;
  //     })
  //   );
  // }

  // const [newTodo, setNewTodo] = useState("");

  // function addTodo(title) {
  //   if (title) {
  //     const todo = { id: todos.length + 1, title: title, completed: false };
  //     setTodos([...todos, todo]);
  //     setNewTodo("");
  //   } else alert("insert your todo");
  // }
}

export default App;
