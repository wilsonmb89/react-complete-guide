import { useCartProducts } from '../../hooks/useCartProducts';
import Card from '../UI/Card';

import classes from './ProductItem.module.css';

const ProductItem = ({ item }) => {
  const { title, price, description } = item;
  const { addItem } = useCartProducts();  

  const onAddCartItemClickHandler = () => {
    addItem(item);
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={onAddCartItemClickHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
