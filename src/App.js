import "./App.css";
import "./style.css";
import "./Components/Nav/Nav.css";
import "./Components/Products/Products.css";
import "./Components/Product/Product.css";
import "./Components/ProductCart/ProductCart.css";
import "./Components/Cart/Cart.css";
import "./Components/Loading/Loading.css";
import Nav from "./Components/Nav/Nav";
import Products from "./Components/Products/Products";
import { React, useEffect, useState } from "react";
import ProductsHandler from "./contexts/ProductsHandler";
import Loading from "./Components/Loading/Loading";
import Cart from "./Components/Cart/Cart";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProductsDetails from "./views/ProductsDetails";
import { Route, Switch } from "react-router-dom";
// import Toggle from "./Components/Toggle";
// import Todos from "./Components/Todos";

function App() {
  const [products, setProducts] = useState([]);
  const [boughtProducts, setboughtProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [minMax, setMinMax] = useState([]);
  const [range, setRange] = useState([]);
  const [rangeFlg, setRangeFlg] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        //findMinMax();
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    findMinMax();
  }, [products]);

  // useEffect(async () => {
  //   findMinMax();
  //   setLoading(true); //1
  //   const res = await fetch("https://fakestoreapi.com/products"); // 2
  //   const data = res.json();
  //   setProducts(data);
  //   setLoading(false); // 3
  // }, []);

  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});

  const categories = Object.keys(groupBy(products, "category"));

  const [category, setCategory] = useState("all categories");

  function filterByCategory(category) {
    setCategory(category);
  }

  function filterByRange(range) {
    setRange(range);
    setRangeFlg(true);
  }

  function findMinMax() {
    let min = 99999999;
    let max = 0;
    for (let product of products) {
      if (product.price < min) {
        min = product.price;
      }
      if (product.price > max) {
        max = product.price;
      }
    }
    setMinMax([min, max]);
  }

  function addToCart(id) {
    const product = products.find((product) => product.id === id);
    const productExist = boughtProducts.findIndex((i) => i.id === product.id);
    if (productExist !== -1) {
      //setboughtProducts(boughtProducts[productExist].amount++);
      boughtProducts[productExist].amount++;
    } else {
      //setboughtProducts([...boughtProducts, product]);
      boughtProducts.push(product);
      //setboughtProducts((boughtProducts[boughtProducts.length - 1].amount = 1));
      boughtProducts[boughtProducts.length - 1].amount = 1;
    }
    setTotalPrice(totalPrice + product.price);
  }

  function removeFromCart(id) {
    const product = products.find((product) => product.id === id);
    const productExist = boughtProducts.findIndex((i) => i.id === product.id);
    if (productExist !== -1) {
      setTotalPrice(totalPrice - product.price);
      if (boughtProducts[productExist].amount > 1) {
        boughtProducts[productExist].amount--;
      } else {
        boughtProducts.splice(productExist, 1);
      }
    } else {
      alert("product not in cart");
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ProductsHandler.Provider value={{ boughtProducts, products, minMax }}>
        {/* <ul>
        <li>
          <Link to="/products">products</Link>
        </li>
        <li>
          <Link to="/">home</Link>
        </li>
      </ul> */}
        <Switch>
          <Route path="/products/:id">
            <ProductsDetails />
          </Route>
          <Route path="/">
            {loading ? (
              <Loading />
            ) : (
              <div>
                <Nav
                  categories={categories}
                  filterByCategory={filterByCategory}
                  filterByRange={filterByRange}
                />
                {/* <Grid item xs={9}> */}
                {/* <Paper className={classes.paper}>xs=9</Paper> */}
                <Products
                  products={products.filter((product) => {
                    if (!rangeFlg) {
                      return (
                        (product.category === category ||
                          category === "all categories") &&
                        product.price >= minMax[0] &&
                        product.price <= minMax[1]
                      );
                    } else {
                      return (
                        (product.category === category ||
                          category === "all categories") &&
                        product.price >= range[0] &&
                        product.price <= range[1]
                      );
                    }
                  })}
                  addToCart={addToCart}
                />
                {/* </Grid> */}
                {/* <Grid item xs={3}> */}
                {/* <Paper className={classes.paper}>xs=3</Paper> */}
                <Cart totalPrice={totalPrice} removeFromCart={removeFromCart} />
                {/* </Grid> */}
              </div>
            )}
          </Route>
        </Switch>
      </ProductsHandler.Provider>
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
