import "./App.css";
import "./style.css";
import "./Components/Nav/Nav.css";
import "./Components/Products/Products.css";
import "./Components/Product/Product.css";
import Nav from "./Components/Nav/Nav";
import Products from "./Components/Products/Products";
import { useEffect, useState } from "react";
// import Toggle from "./Components/Toggle";
// import Todos from "./Components/Todos";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});

  const categories = Object.keys(groupBy(products, "category"));

  const [category, setCategory] = useState("all categories");

  function filterPage(category) {
    setCategory(category);
  }

  return (
    <>
      <Nav categories={categories} filterPage={filterPage} />
      <Products
        products={products.filter((product) => {
          return product.category === category || category === "all categories";
        })}
      />
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
