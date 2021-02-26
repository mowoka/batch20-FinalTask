import React, { useState, useEffect } from "react";
import "./Landing.css";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import BooksPromo from "../../Components/BooksPromo";
import BookList from "../../Components/BookList";
import Navbar from "../../Components/Navbar/Navbar";
import Loading from "../../Components/Loading/Loading";
import Notification from "../../Components/Notifcation/Notification";

const Landing = () => {
  const [bookPromo, setBookPromo] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const message = "Please Login First Or Create New Account";

  // const history = useHistory();
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

  // const goDetailBookPage = (id) => {
  //   const bookFilter = books.filter((book) => book.id === id);

  //   // const bookId = bookFilter[0].id;
  //   // // console.log(bookFilter[0].id);
  //   // history.push(`/detail-book/${bookId}`);
  // };

  // const goDetailBookPromoPage = (id) => {
  //   const bookFilter = bookPromo.filter((book) => book.id === id);

  //   //   const bookId = bookFilter[0].id;
  //   //   // console.log(bookFilter[0].id);
  //   //   history.push(`/detail-book/${bookId}`);
  // };

  // Handel Modal Notification
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  useEffect(() => {
    GetBookPromo();
    GetBooks();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-landing">
          <div className="container--cover-page">
            <Navbar />
          </div>
          <div className="container--cover-item">
            <div className="landing--headline">
              <h3>With us, you can shop online & help </h3>
              <br />
              <h4> save your high street at the same time</h4>
            </div>
            <div onClick={handleShow} className="book--promo-container">
              {bookPromo.map((book, index) => (
                <BooksPromo handleShow={handleShow} book={book} />
              ))}
            </div>
          </div>
          <div className="list--book-title">
            <p>List Book</p>
          </div>
          <div onClick={handleShow} className="book--list-container">
            {books.map((book, index) => (
              <BookList book={book} />
            ))}
          </div>
        </div>
      )}
      <Notification show={show} handleClose={handleClose} message={message} />
    </>
  );
};

export default Landing;
