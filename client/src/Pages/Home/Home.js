import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import BooksPromo from "../../Components/BooksPromo";
import BookList from "../../Components/BookList";
import NavbarLogin from "../../Components/NavbarLogin/NavbarLogin";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const [bookPromo, setBookPromo] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(AppContext);
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

  const getUser = async () => {
    try {
      setLoading(true);

      const response = await API.get("/get-user");

      setLoading(false);

      if (response.data.status == "Success") {
        dispatch({
          type: "USER_LOADED",
          payload: response.data.data.user,
        });
      }
    } catch (error) {
      console.log("Error Get Profile User");
    }
  };

  const goDetailBookPage = (id) => {
    const bookFilter = books.filter((book) => book.id === id);

    const bookId = bookFilter[0].id;
    // console.log(bookFilter[0].id);
    history.push(`/book-page/${bookId}`);
  };

  const goDetailBookPromoPage = (id) => {
    const bookFilter = bookPromo.filter((book) => book.id === id);

    const bookId = bookFilter[0].id;
    // console.log(bookFilter[0].id);
    history.push(`/book-page/${bookId}`);
  };

  useEffect(() => {
    GetBookPromo();
    GetBooks();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-landing">
          <div className="container--cover-page">
            <NavbarLogin />
          </div>
          <div className="container--cover-item">
            <div className="landing--headline">
              <h3>With us, you can shop online & help </h3>
              <br />
              <h4> save your high street at the same time</h4>
            </div>
            <div className="book--promo-container">
              {bookPromo.map((book, index) => (
                <BooksPromo
                  goDetailBookPromoPage={goDetailBookPromoPage}
                  book={book}
                />
              ))}
            </div>
          </div>
          <div className="list--book-title">
            <p>List Book</p>
          </div>
          <div className="book--list-container">
            {books.map((book, index) => (
              <BookList goDetailBookPage={goDetailBookPage} book={book} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
