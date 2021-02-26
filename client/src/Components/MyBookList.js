import React from "react";

const MyBookList = ({ book, goDetailBookPage }) => {
  const linkImg = `http://localhost:5000/uploads/${book.thumbnail}`;

  return (
    <>
      <div key={book.id} className="--Mylist-book-box">
        <div className="--Mylist-book-image">
          <img src={linkImg} alt="image-book" />
        </div>
        <div className="--Mylist-book-desc">
          <h4>{book.title}</h4>
          <small>by {book.author}</small>
        </div>
        <button
          onClick={() => goDetailBookPage(book.id)}
          className="btn --Mylist-download"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default MyBookList;
