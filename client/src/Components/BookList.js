import React from "react";

const BookList = ({ book, goDetailBookPage }) => {
  const linkImg = `http://localhost:5000/uploads/${book.thumbnail}`;

  return (
    <>
      <div
        onClick={goDetailBookPage ? () => goDetailBookPage(book.id) : null}
        key={book.id}
        className="--list-book-box"
      >
        <div className="--list-book-image">
          <img src={linkImg} alt="image-book" />
        </div>
        <div className="--list-book-desc">
          <h4>{book.title}</h4>
          <small>by {book.author}</small>
          <h5>Rp. {book.price}</h5>
        </div>
      </div>
    </>
  );
};

export default BookList;
