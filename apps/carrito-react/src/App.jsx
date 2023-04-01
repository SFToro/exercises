import { useState, useContext } from "react";
import "./App.css";
import Product from "./components/Product";
import Filters from "./components/Filters";
import CartItem from "./components/CartItem";

import { products } from "./mocks/products.json";
import { useFilters } from "./hooks/useFilters";
import { CartContext } from "./context/cart";

function App() {
  const { filteredProducts } = useFilters(products);
  const [carroDisplay, setCarroDisplay] = useState(true);

  const { cartList, resetCart } = useContext(CartContext);

  return (
    <>
      <div className="flex">
        <main className="shopping">
          <header>
            <h1>Mock store</h1>
            <button
              onClick={() => {
                setCarroDisplay(!carroDisplay);
              }}
            >
              Carro
            </button>
          </header>
          <Filters />
          <section className="product-list">
            {filteredProducts.map((product) => {
              return <Product key={product.id} product={product}></Product>;
            })}
          </section>
        </main>
        <aside
          className="carro"
          style={{ display: carroDisplay ? "block" : "none" }}
        >
          <h3>Carro</h3>
          <button
            style={{ color: "#000", backgroundColor: "#ccc" }}
            onClick={resetCart}
          >
            reset
          </button>
          {cartList.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
        </aside>
      </div>
    </>
  );
}

export default App;
