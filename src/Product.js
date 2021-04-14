const Product = ({ id, title, price, description, category, image }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt="pic" />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{price}</h6>
      </div>
    </div>
  );
};

export default Product;
