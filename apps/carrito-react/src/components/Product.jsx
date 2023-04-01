import { CartContext } from "../context/cart";
import { useContext } from "react";

function Product({ product }) {
  const { title, description, thumbnail, id } = product;
  const { addToCart, cartList, isInCart } = useContext(CartContext);

  // function isInCart(idx) {
  //   cartList.some((item) => {
  //     item.id === idx;
  //   });
  // }

  return (
    <article className="product">
      <h3>{title}</h3>
      <p>{description}</p>

      {!isInCart(id) && (
        <button
          onClick={() => {
            addToCart(product);
          }}
          style={{ color: "#000", backgroundColor: "#ccc" }}
        >
          Al carro
        </button>
      )}
      <img src={thumbnail} alt={description} />
    </article>
  );
}

export default Product;
