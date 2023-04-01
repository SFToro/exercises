import { useContext } from "react";
import { CartContext } from "../context/cart";

function cartItem({ product }) {
  const { title, price, qty, id } = product;
  const { increment } = useContext(CartContext);
  return (
    <div
      style={{ border: "1px solid red", padding: "0.25rem", margin: "0.25rem" }}
    >
      <h3>{title}</h3>
      <h4>${price}</h4>
      <h5>Qty: {qty}</h5>

      <button
        style={{ color: "#000", backgroundColor: "#ccc" }}
        onClick={() => {
          increment(id);
        }}
      >
        add
      </button>
    </div>
  );
}

export default cartItem;
