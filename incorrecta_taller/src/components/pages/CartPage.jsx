import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

function CartPage() {
  const {
    cart,
    cartTotal,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const handleCheckout = () => {
    alert(
      `Compra realizada por $${cartTotal.toLocaleString("es-AR")}`
    );

    clearCart();
  };

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <p className="cart-eyebrow">Tu compra</p>

          <h1>Carrito</h1>

          <p className="cart-empty-message">
            Todavía no agregaste productos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <header className="cart-header">
        <p className="cart-eyebrow">
          Tu compra
        </p>

        <h1>Carrito</h1>

        <p className="cart-intro">
          Revisá los productos antes de finalizar la compra.
        </p>
      </header>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((product) => (
            <article
              className="cart-item"
              key={product.id}
            >
              <div className="cart-item-image-wrapper">
                <img
                  className="cart-item-image"
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="cart-item-info">
                <p className="cart-item-category">
                  {product.category}
                </p>

                <h2 className="cart-item-name">
                  {product.name}
                </h2>

                <p className="cart-item-price">
                  Precio unitario: $
                  {product.price.toLocaleString("es-AR")}
                </p>

                <p className="cart-item-stock">
                  Stock disponible: {product.quantity}
                </p>

                <div className="cart-item-controls">
                  <div
                    className="cart-quantity"
                    aria-label={`Cantidad de ${product.name}`}
                  >
                    <button
                      type="button"
                      className="cart-quantity-button"
                      aria-label="Disminuir cantidad"
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      −
                    </button>

                    <span className="cart-quantity-value">
                      {product.quantityCart}
                    </span>

                    <button
                      type="button"
                      className="cart-quantity-button"
                      aria-label="Aumentar cantidad"
                      disabled={
                        product.quantityCart >=
                        product.quantity
                      }
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="cart-item-subtotal">
                <span>Subtotal</span>

                <strong>
                  $
                  {(
                    product.price *
                    product.quantityCart
                  ).toLocaleString("es-AR")}
                </strong>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="cart-summary-eyebrow">
            Resumen
          </p>

          <h2>Resumen de compra</h2>

          <div className="cart-summary-row">
            <span>Productos</span>
            <span>{cart.length}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>

            <strong>
              ${cartTotal.toLocaleString("es-AR")}
            </strong>
          </div>

          <button
            type="button"
            className="cart-checkout-button"
            onClick={handleCheckout}
          >
            Finalizar compra
          </button>

          <button
            type="button"
            className="cart-clear-button"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;