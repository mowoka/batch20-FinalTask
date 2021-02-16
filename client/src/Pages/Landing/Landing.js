import React, { useState, useEffect } from "react";
import "./Landing.css";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import BooksPromo from "../../Components/BooksPromo";
import BookList from "../../Components/BookList";

const Landing = () => {
  const [bookPromo, setBookPromo] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const GetBookPromo = async () => {
    try {
      setLoading(true);

      const response = await API.get("/promo-books");

      setLoading(false);
      setBookPromo(response.data.data.books);
    } catch (error) {
      console.log("Books not Found");
    }
  };

  const GetBooks = async () => {
    try {
      setLoading(true);

      const response = await API.get("/books");

      setLoading(false);
      setBooks(response.data.data.books);
    } catch (error) {
      console.log("Books not Found");
    }
  };

  const goDetailBookPage = (id) => {
    const bookFilter = books.filter((book) => book.id === id);

    const bookId = bookFilter[0].id;
    // console.log(bookFilter[0].id);
    history.push(`/detail-book/${bookId}`);
  };

  const goDetailBookPromoPage = (id) => {
    const bookFilter = bookPromo.filter((book) => book.id === id);

    const bookId = bookFilter[0].id;
    // console.log(bookFilter[0].id);
    history.push(`/detail-book/${bookId}`);
  };

  useEffect(() => {
    GetBookPromo();
    GetBooks();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="container-landing">
          <div className="book--container-cover">
            {bookPromo.map((book, index) => (
              <BooksPromo
                goDetailBookPromoPage={goDetailBookPromoPage}
                book={book}
              />
            ))}
          </div>
          <div className="book--container-list">
            {books.map((book, index) => (
              <BookList goDetailBookPage={goDetailBookPage} book={book} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
