import React, { useState, useEffect, useContext } from "react";
import "./DetailBook.css";
import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DetailBookImg from "../../asssets/detail-cover.png";
import { AppContext } from "../../Context/globalContext";
import NavbarLogin from "../../Components/NavbarLogin/NavbarLogin";
import cart from "../../asssets/cart-btn.png";
import Loading from "../../Components/Loading/Loading";

const DetailBookPage = ({ match }) => {
  const booksList = true;
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    id: "",
    title: "",
    publicationDate: "",
    pages: "",
    ISBN: "",
    author: "",
    price: "",
    description: "",
    thumbnail: "",
  });
  const history = useHistory();
  const id = match.params.id;
  const {
    title,
    publicationDate,
    pages,
    ISBN,
    author,
    price,
    description,
    thumbnail,
  } = book;

  const [state, dispatch] = useContext(AppContext);

  const getBook = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/book/${id}`);

      setBook({
        id: response.data.data.book.id,
        title: response.data.data.book.title,
        publicationDate: response.data.data.book.publicationDate,
        pages: response.data.data.book.pages,
        ISBN: response.data.data.book.ISBN,
        author: response.data.data.book.author,
        price: response.data.data.book.price,
        description: response.data.data.book.description,
        thumbnail: `http://localhost:5000/uploads/${response.data.data.book.thumbnail}`,
      });

      setLoading(false);
    } catch (error) {
      console.log("Book  not Found");
    }
  };

  const handelAddCart = () => {
    dispatch({
      type: "ADD_CART",
      payload: book,
    });
    history.push("/home");
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="beranda-container">
          <NavbarLogin />
          <div className="beranda--container-content">
            <div className="book--detail-container">
              <div className="book--detail-title">
                <div className="detail-content-image">
                  <img
                    src={thumbnail ? thumbnail : DetailBookImg}
                    alt="gambar-buku"
                  />
                </div>
                <div className="detail-content-description">
                  <div className="content-book-title">
                    <h2>{title ? title : "tidak ada title"}</h2>
                    <p>{author ? author : null}</p>
                  </div>
                  <div className="content-book-publish">
                    <h2>Publication date</h2>
                    <p>{publicationDate ? publicationDate : null}</p>
                  </div>
                  <div className="content-book-page">
                    <h2>Pages</h2>
                    <p>{pages ? pages : null}</p>
                  </div>
                  <div className="content-book-Type">
                    <h2>ISBN</h2>
                    <p>{ISBN ? ISBN : null}</p>
                  </div>
                  <div className="content-book-price">
                    <h2>Price</h2>
                    <p>Rp. {price ? price : null}</p>
                  </div>
                </div>
              </div>
              <div className="book--detail-description">
                <div className="--detail-description-title">
                  <h2>About This Book</h2>
                </div>
                <div className="--detail-description-text">
                  <p>{description ? description : null}</p>
                </div>
              </div>
              <div className="book-detail-action">
                <div
                  className="action-adding"
                  onClick={() => handelAddCart()}
                  // className={booksList ? "a" : "active"}
                >
                  <p>Add CHART</p>
                  <img src={cart} alt="cart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBookPage;
