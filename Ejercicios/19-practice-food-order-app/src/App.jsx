import Header from "./components/Header";
import Meals from "./components/Meals";

import CartOrdersContextProvider from "./store/cart-orders-context";
import ModalContextPovider from "./store/modal-context";

function App() {
  return (
    <CartOrdersContextProvider>
      <ModalContextPovider>
        <Header />
        <Meals />
      </ModalContextPovider>
    </CartOrdersContextProvider>
  );
}

export default App;
