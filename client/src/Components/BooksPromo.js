import React from "react";

const BooksPromo = ({ book, goDetailBookPromoPage }) => {
  const linkImg = `http://localhost:5000/uploads/${book.thumbnail}`;

  return (
    <>
      <div key={book.id} className="--promo-book-box">
        <div className="--promo-book-image">
          <img src={linkImg} alt="image-book" />
        </div>
        <div className="--promo-book-desc">
          <h4>{book.title}</h4>
          <small>by {book.author}</small>
          <p>"{book.description}"</p>
          <h5>Rp. {book.price}</h5>
          <button
            onClick={
              goDetailBookPromoPage
                ? () => goDetailBookPromoPage(book.id)
                : null
            }
          >
            ADD TO CHART
          </button>
        </div>
      </div>
    </>
  );
};

export default BooksPromo;
