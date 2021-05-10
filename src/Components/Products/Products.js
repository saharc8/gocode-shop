import Product from "../Product/Product";
import { Grid } from "@material-ui/core";

const Products = ({ products, addToCart }) => {
  return (
    // <Grid
    //   container
    //   direction="row-reverse"
    //   justify="center"
    //   alignItems="center"
    // >
    <section className="products">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          category={product.category}
          image={product.image}
          addToCart={addToCart}
        />
      ))}
    </section>
    // </Grid>
  );
};

export default Products;
