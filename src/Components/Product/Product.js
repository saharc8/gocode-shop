import { Link } from "react-router-dom";

const Product = ({ id, title, price, image, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt="pic" />
      </div>
      <div className="product-info">
        <Link to={`/products/${id}`}>
          <h5>{title}</h5>
        </Link>
        <br></br>
        <h6>{price}$</h6>
        <br></br>
        <button onClick={() => addToCart(id)} className="plus-button">
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
