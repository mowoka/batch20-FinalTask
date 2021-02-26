import React from "react";

const CheckoutComponent = ({ book, removeBookFromCart }) => {
  return (
    <>
      <div key={book.id} className="checkout-item">
        <div className="checkout-item-content">
          <div className="--checkout-content-img">
            <img src={book.thumbnail} alt="ini buku" />
          </div>
          <div className="--checkout-content-desc">
            <h4>{book.title}</h4>
            <small>{book.author}</small>
            <p>Rp {book.price}</p>
          </div>
        </div>
        <div className="checkout-item-icon">
          <img
            onClick={() => removeBookFromCart(book.id)}
            src="image/trash.png"
            alt="trash"
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutComponent;
