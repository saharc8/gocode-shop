import { useContext } from "react";
import ProductsHandler from "../../contexts/ProductsHandler";
import ProductCart from "../ProductCart/ProductCart";
import { Grid } from "@material-ui/core";

function Cart({ totalPrice, removeFromCart }) {
  const { boughtProducts } = useContext(ProductsHandler);
  return (
    <div className="cart">
      {/* <Grid
        container
        direction="row-reverse"
        justify="center"
        alignItems="center"
      > */}
      <h1>Cart</h1>
      <h2>Total Price: {totalPrice.toFixed(2)}$</h2>
      <br></br>
      <section className="boughtProducts">
        {boughtProducts.map((product) => (
          <ProductCart
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            amount={product.amount}
            removeFromCart={removeFromCart}
          />
        ))}
      </section>
      {/* </Grid> */}
    </div>
  );
}

export default Cart;
