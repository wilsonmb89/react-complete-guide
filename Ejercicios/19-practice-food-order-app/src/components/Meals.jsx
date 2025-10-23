import { useEffect, useState } from "react";

import MealItem from "./MealItem";

import { BACKEND_BASE_PATH } from "../store/cart-orders-context";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BACKEND_BASE_PATH}/meals`).catch(
        () => []
      );

      if (!response.ok) {
        return;
      }

      const mealsFetched = await response.json();
      setMeals(mealsFetched);
    })();
  }, []);

  return (
    <ul id="meals">
      {meals.map((mealData) => (
        <li key={mealData.id} className="meal-item">
          <MealItem mealData={mealData} />
        </li>
      ))}
    </ul>
  );
}
