import { useEffect, useState } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";

function ProductsDetails() {
  const { id } = useParams();
  const [productsJson, setProductsJson] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductsJson(data);
      });
  }, []);

  return (
    <div>
      <br></br>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
      </ul>
      <br></br>
      <h1>{productsJson.title}</h1>
      <br></br>
      <h2>price: {productsJson.price}$</h2>
      <br></br>
      <p>{productsJson.description}</p>
      <br></br>
      <h6> {productsJson.category}</h6>
      <br></br>
      <img style={{ width: "200px" }} src={productsJson.image}></img>
      <br></br>
      <br></br>
      <label>for more details : 0545791441</label>
      <Switch>
        <Route path="/"></Route>
      </Switch>
    </div>
  );
}

export default ProductsDetails;
