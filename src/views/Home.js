import Nav from "../components/Nav/Nav";
import Products from "../components/Products/Products";
import Loading from "../components/Loading/Loading";
import Cart from "../components/Cart/Cart";
import { React, useEffect, useState } from "react";
import ProductsHandler from "../contexts/ProductsHandler";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function Home() {
  const [products, setProducts] = useState([]);
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [minMax, setMinMax] = useState([]);
  const [range, setRange] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        findMinMax(data);
        setLoading(false);
      });
  }, []);

  function findMinMax(products) {
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
    setRange([min, max]);
  }

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
  }

  function addToCart(id) {
    const product = products.find((product) => product.id === id);
    const productExist = boughtProducts.findIndex((i) => i.id === product.id);
    if (productExist !== -1) {
      setBoughtProducts(
        boughtProducts.map((product) => {
          if (product.id === id) {
            return { ...product, amount: product.amount + 1 };
          } else {
            return product;
          }
        })
      );
      //boughtProducts[productExist].amount++;
    } else {
      setBoughtProducts([...boughtProducts, { ...product, amount: 1 }]);
      //boughtProducts.push(product);

      // setBoughtProducts(
      //   boughtProducts.map((product) => {
      //     if (product.id === id) {
      //       return { ...product, amount: 1 };
      //     } else {
      //       return product;
      //     }
      //   })
      // );

      //boughtProducts[boughtProducts.length - 1].amount = 1;
    }
    setTotalPrice(totalPrice + product.price);
  }

  function removeFromCart(id) {
    const product = products.find((product) => product.id === id);
    const productExist = boughtProducts.findIndex((i) => i.id === product.id);
    if (productExist !== -1) {
      setTotalPrice(totalPrice - product.price);

      // setBoughtProducts(
      //   boughtProducts.map((product) => {
      //     if (product.id === id) {
      //       if (product.amount > 1) {
      //         return { ...product, amount: product.amount - 1 };
      //       } else {
      //         return setBoughtProducts(
      //           boughtProducts.filter((product) => {
      //             return product.id !== id;
      //           })
      //         );
      //       }
      //     }
      //   })
      // );

      if (boughtProducts[productExist].amount > 1) {
        boughtProducts[productExist].amount--;
      } else {
        boughtProducts.splice(productExist, 1);
      }
    } else {
      alert("product not in cart");
    }
  }

  //   const useStyles = makeStyles((theme) => ({
  //     root: {
  //       flexGrow: 1,
  //     },
  //     paper: {
  //       padding: theme.spacing(2),
  //       textAlign: "center",
  //       color: theme.palette.text.secondary,
  //     },
  //   }));

  //   const classes = useStyles();

  return (
    <>
      <ProductsHandler.Provider value={{ boughtProducts, minMax }}>
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
                //if (product.price >= range[0] && product.price <= range[1]) {
                return (
                  (product.category === category ||
                    category === "all categories") &&
                  product.price >= range[0] &&
                  product.price <= range[1]
                );
                //} else return <h1>no results</h1>;
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
      </ProductsHandler.Provider>
    </>
  );
}

export default Home;
