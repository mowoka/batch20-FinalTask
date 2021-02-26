import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { AppContext } from "../../Context/globalContext";
import { API } from "../../config/api";
import axios from "axios";
import SettingProfile from "../../Components/SettingProfile";
import MyBookList from "../../Components/MyBookList";
import EmailIcon from "@material-ui/icons/Email";
import WcIcon from "@material-ui/icons/Wc";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import NavbarLogin from "../../Components/NavbarLogin/NavbarLogin";
import Loading from "../../Components/Loading/Loading";

const Profile = () => {
  const [posts, setPosts] = useState({
    email: "",
    fullName: "",
    role: "",
    gender: "",
    phone: "",
    address: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [state, dispatch] = useContext(AppContext);

  const history = useHistory();
  const { user } = state;
  const linkImg = `http://localhost:5000/uploads/${user.avatar}`;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Oprekan untuk dapat buku
  const [books, setBooks] = useState([]);
  const [myBook, setMyBook] = useState();
  const [IDBook, setIDBook] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const GetBooks = async () => {
    try {
      setLoading(true);

      const response = await API.get("/books");

      setBooks(response.data.data.books);
    } catch (error) {
      console.log("Books not Found");
    }
  };
  const token = localStorage.token;
  const GetTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v2/transaction`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // setBooks(response.data.data.books);
      // console.log(response.data.result[0].id);

      if (response.data.status == "Success") {
        GetPruchaseBook(response.data.result[0].id);
      }

      // IDTransactions.push(id);

      // setPurchasebook();
    } catch (error) {
      console.log("Transaction not Found");
    }
  };

  const GetPruchaseBook = async (IDTransactions) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v2/purchase-book/${IDTransactions}`
      );

      // console.log(response.data.result[0].id);
      if (response.data.status == "Success") {
        // console.log(response.data.result[0].bookId);
        setIDBook([response.data.result[0].bookId]);
        setLoading(false);
      }
    } catch (error) {
      console.log("Purcgase book not Found");
    }
  };

  const setPurchasebook = () => {
    const bookFilter = books.filter((book) => book.id == IDBook[0]);
    console.log(bookFilter);
    setMyBook(bookFilter);
    setShowBook(true);
  };

  const goDetailBookPage = (id) => {
    // console.log(bookFilter[0].id);
    history.push(`/download-book/${id}`);
  };

  useEffect(() => {
    GetBooks();
    GetTransactions();
  }, []);

  //
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavbarLogin />
          <div className="profile--container-content">
            <h3 className="profile--title-name">Profile</h3>
            <div className="profile--user-description">
              <div className="user-description-menu">
                <div className="user--description">
                  <div className="description--icon">
                    <EmailIcon className="user-icon" />
                  </div>
                  <div className="description--text">
                    <p>{user.email ? user.email : "set email"}</p>
                    <small>Email</small>
                  </div>
                </div>
                <div className="user--description">
                  <div className="description--icon">
                    <WcIcon className="user-icon" />
                  </div>
                  <div className="description--text">
                    <p>{user.gender ? user.gender : "set Gender"}</p>
                    <small>Gender</small>
                  </div>
                </div>
                <div className="user--description">
                  <div className="description--icon">
                    <CallIcon className="user-icon" />
                  </div>
                  <div className="description--text">
                    <p>{user.phone ? user.phone : "set Phone Number"}</p>
                    <small>Mobile Phone</small>
                  </div>
                </div>
                <div className="user--description">
                  <div className="description--icon">
                    <HomeIcon className="user-icon" />
                  </div>
                  <div className="description--text">
                    <p>{user.address ? user.address : "set Address"}</p>
                    <small>Address</small>
                  </div>
                </div>
              </div>
              <div className="user--descriptionn-image">
                <img
                  src={linkImg ? linkImg : "image/beranda/egi.png"}
                  alt="foto-profile"
                />
                <div onClick={handleShow} className="user--description-button">
                  <p>Edit profile</p>
                </div>
                <SettingProfile
                  show={show}
                  handleClose={handleClose}
                  posts={posts}
                  setPosts={setPosts}
                  profile={profile}
                />
              </div>
            </div>
            <div className="profile--description-books">
              {myBook < 1 ? (
                <h1>Silahkan beli buku</h1>
              ) : (
                <h3 style={{ cursor: "pointer" }} onClick={setPurchasebook}>
                  My Books
                </h3>
              )}
              {showBook ? (
                <div className="--book-list-box">
                  {myBook.map((book, index) => (
                    <MyBookList
                      book={book}
                      goDetailBookPage={goDetailBookPage}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
