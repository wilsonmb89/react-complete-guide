import { useContext } from "react";

import Button from "./UI/Button";

import { BACKEND_BASE_PATH, CartOrdersContext } from "../store/cart-orders-context";
import { formatCurrencyNumber } from "../utils/string";

export default function MealItem({ mealData }) {
  const { name, price, description, image } = mealData;

  const { addCartOrder } = useContext(CartOrdersContext);

  const onClickAddCartHandler = () => {
    addCartOrder(mealData);
  };

  return (
    <>
      <article>
        <img src={`${BACKEND_BASE_PATH}/${image}`} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{formatCurrencyNumber(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={onClickAddCartHandler}>Add to Cart</Button>
        </p>
      </article>
    </>
  );
}
