import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Addbok.css";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";

const AddBook = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const { user } = state;
  const linkImage = `http://localhost:5000/uploads/${user.avatar}`;

  const [formBook, setFormBook] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    ISBN: "",
    author: "",
    price: "",
    description: "",
    bookAttachment: null,
    thumbnail: null,
  });

  const {
    title,
    publicationDate,
    pages,
    ISBN,
    author,
    price,
    description,
    bookAttachment,
    thumbnail,
  } = formBook;

  const onChange = (e) => {
    const updateForm = { ...formBook };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormBook(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", title);
      body.append("publicationDate", publicationDate);
      body.append("pages", pages);
      body.append("ISBN", ISBN);
      body.append("author", author);
      body.append("price", price);
      body.append("description", description);
      body.append("bookAttachment", bookAttachment);
      body.append("thumbnail", thumbnail);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // if (body.epubFile == null) {
      //   setMessage("Please Upload File Epub");
      // }

      const post = await API.post("/book", body, config);

      const response = post.data;

      setMessage(response.message);

      if (response.status == "Success") {
        setFormBook({
          title: "",
          publicationDate: "",
          pages: "",
          ISBN: "",
          author: "",
          price: "",
          description: "",
          bookAttachment: "",
          thumbnail: "",
        });
      }
    } catch (error) {
      console.log(error);
      console.log("Probelm pada onSubmit AddBook");
    }
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);

  return (
    <div className="addbook--menu-container">
      <div className="transaction--menu-header">
        <div className="header--menu-logo">
          <img src="image/logo.png" alt="wow-logo" />
        </div>
        <div className="header--menu-profile">
          <img
            style={{
              display: "inline-block",
              position: "relative",
              borderRadius: "50%",
            }}
            src={linkImage ? linkImage : "image/beranda/admin-icon.png"}
            alt="admin-avatar"
            onClick={handleShowDropDownProfile}
          />
          {showDropDownProfile ? (
            <div className="dropdown--menu-profile">
              <div className="dropdown--poligon">
                <img src="image/action-icon-2.png" alt="arrow" />
              </div>
              <div className="dropdown--menu-list">
                <div className="dropdown--addbook">
                  <Link to="/transactions">
                    <BookIcon
                      style={{
                        color: "#929292",
                        fontSize: "30px",
                        marginTop: "4px",
                      }}
                    />
                    <p style={{ marginLeft: "10px" }}>Transaction </p>
                  </Link>
                </div>
                <div className="dropdown--logout">
                  <Link onClick={handleLogout} to="/">
                    <ExitToAppIcon
                      className="text-deactive"
                      style={{
                        fontSize: "30px",
                        marginTop: "4px",
                      }}
                    />
                    <p style={{ marginLeft: "10px" }}>Logout</p>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="addbook--menu-body">
        <div className="addbook--body-title">
          <p>Add Book</p>
        </div>
        <div className="addbook--message">
          {message ? (
            <div
              className={
                message === "Book Successfully added"
                  ? "--bg-green"
                  : "--bg-red"
              }
            >
              {message}
            </div>
          ) : null}
        </div>
        <div className="addbook--body-form">
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder="Title"
              className="form-control form-body-input"
              name="title"
              onChange={(e) => onChange(e)}
              value={title}
            />
            <input
              type="date"
              placeholder="Publication Date"
              className="form-control form-body-input"
              name="publicationDate"
              onChange={(e) => onChange(e)}
              value={publicationDate}
            />
            <input
              type="text"
              placeholder="Pages"
              className="form-control form-body-input"
              name="pages"
              onChange={(e) => onChange(e)}
              value={pages}
            />
            <input
              type="text"
              placeholder="ISBN"
              className="form-control form-body-input"
              name="ISBN"
              onChange={(e) => onChange(e)}
              value={ISBN}
            />
            <input
              type="text"
              placeholder="Author"
              className="form-control form-body-input"
              name="author"
              onChange={(e) => onChange(e)}
              value={author}
            />
            <input
              type="number"
              placeholder="Price"
              className="form-control form-body-input"
              name="price"
              onChange={(e) => onChange(e)}
              value={price}
            />
            <input
              type="text"
              placeholder="About This Book"
              className="form-control form-body-input-about"
              name="description"
              onChange={(e) => onChange(e)}
              value={description}
            />
            <label
              style={{ marginTop: "30px" }}
              for="bookAttachment-btn"
              className="form-body-file"
            >
              <p>Attact Boook File</p>
              {/* <img src="image/beranda/attact-icon-2.png" alt="attac-icon" /> */}
            </label>
            <input
              type="file"
              id="bookAttachment-btn"
              onChange={(e) => onChange(e)}
              name="bookAttachment"
            />
            <input
              type="file"
              id="thumbnail-btn"
              onChange={(e) => onChange(e)}
              name="thumbnail"
            />
            <label
              style={{ marginTop: "30px" }}
              for="thumbnail-btn"
              className="form-body-file"
            >
              <p>Attact Thumbnail File</p>
              {/* <img src="image/beranda/attact-icon-2.png" alt="attac-icon" /> */}
            </label>
            <div className="mb-3" style={{ height: "20px" }}>
              {bookAttachment ? bookAttachment.name : null}
              {thumbnail ? thumbnail.name : null}
            </div>
            <div className="form-body-submit">
              <input type="submit" value="Add Book" className="submit-btn" />
              {/* <img src="image/beranda/addbook.png" alt="addbook" /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
