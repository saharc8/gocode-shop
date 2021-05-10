const ProductCart = ({ id, title, price, image, amount, removeFromCart }) => {
  return (
    <div className="product-card-c">
      <div className="product-image-c">
        <img src={image} alt="pic" />
      </div>
      <div className="product-info-c">
        <h5>{title}</h5>
        <br></br>
        <h6>{price}$</h6>
        <br></br>
        <h4>amount: {amount}</h4>
        <br></br>
        <button onClick={() => removeFromCart(id)} className="minus-button">
          -
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
