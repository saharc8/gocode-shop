import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ProductsHandler from "../../contexts/ProductsHandler";

const Nav = ({ categories, filterByCategory, filterByRange }) => {
  const { minMax } = useContext(ProductsHandler);

  const useStyles = makeStyles({
    root: {
      width: 300,
      marginRight: 70,
      marginTop: 10,
    },
  });

  const classes = useStyles();
  const [value, setValue] = React.useState([minMax[0], minMax[1]]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterByRange(newValue);
  };

  return (
    <nav className="product-filter">
      <h1 className="store">Store</h1>

      <div className={classes.root}>
        <label>range:</label>
        {minMax[0] && (
          <Slider
            min={minMax[0]}
            max={minMax[1]}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        )}
      </div>

      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select onChange={(e) => filterByCategory(e.target.value)}>
            <option value="all categories">all categories</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>

        <div className="collection-sort">
          <label>Sort by:</label>
          <select>
            <option value="/">Featured</option>
            <option value="/">Best Selling</option>
            <option value="/">Alphabetically, A-Z</option>
            <option value="/">Alphabetically, Z-A</option>
            <option value="/">Price, low to high</option>
            <option value="/">Price, high to low</option>
            <option value="/">Date, new to old</option>
            <option value="/">Date, old to new</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
