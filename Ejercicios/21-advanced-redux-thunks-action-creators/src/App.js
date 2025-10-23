import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { fetchProductsCart } from "./store/cart-orders-store";
import { fetchProductsData } from "./store/products-store";

function App() {
  const isCardVisible = useSelector(
    (state) => state.cartOrdersState.isCardVisible
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsCart());
    dispatch(fetchProductsData());
  }, [dispatch]);

  return (
    <Layout>
      <Notification />
      {isCardVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
