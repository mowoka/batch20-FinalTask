import React, { useState, useContext, useEffect } from "react";
import "./Transaction.css";
import TransactionComponent from "../../Components/TransactionComponent";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";

const Transaction = () => {
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState([]);
  const [state, dispatch] = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);
  const { user } = state;
  const linkImage = `http://localhost:5000/uploads/${user.avatar}`;

  const getTransactions = async () => {
    try {
      const response = await API.get("/transaction");

      setTransactions(response.data.data.transactions);
    } catch (error) {
      console.log("error get data");
    }
  };

  const GetBooks = async () => {
    try {
      const response = await API.get("/books");

      setBook(response.data.data.books);
    } catch (error) {
      console.log("Books not Found");
    }
  };

  const getUser = async () => {
    try {
      const response = await API.get("/get-admin");

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

  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const getUserId = (id, status) => {
    const findTransaction = transactions.filter(
      (transaction) => transaction.id == id
    );
    const transactionId = findTransaction[0].id;

    editTransaction(transactionId, status);
    // console.log(transaction);
    // console.log(transaction[0].id);
  };

  const editTransaction = async (id, status) => {
    try {
      const body = JSON.stringify({
        status: status,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const post = await API.patch(`/transaction/${id}`, body, config);

      const Updateresponse = post.data.data.transaction;

      console.log(Updateresponse);
      const updatedPosts = transactions.map((post) =>
        post.id == Updateresponse.id ? Updateresponse : post
      );

      setTransactions(updatedPosts);
    } catch (error) {
      console.log("fungsi edit transaction error");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getUser();
    GetBooks();
    getTransactions();

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="transaction--container">
          <div className="transaction--menu-header">
            <div className="header--menu-logo">
              <img src="image/logo.png" alt="logo" />
            </div>
            <div className="header--menu-profile">
              <img
                style={{
                  display: "inline-block",
                  position: "relative",
                  borderRadius: "50%",
                }}
                src={linkImage}
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
                      <Link to="/add-book">
                        <BookIcon
                          style={{
                            color: "#929292",
                            fontSize: "30px",
                            marginTop: "4px",
                          }}
                        />
                        <p style={{ marginLeft: "10px" }}>Add Book </p>
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
          <div className="transaction--menu-body">
            <div className="body--menu-title">
              <p>Incoming Transaction</p>
            </div>
            <div className="body--menu-table">
              <table>
                <thead>
                  <tr
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      backgroundColor: "#f2f2f2",
                      fontSize: "14px",
                      color: "#ff0000",
                    }}
                  >
                    <th>No</th>
                    <th>Users</th>
                    <th>Bukti Transfer</th>
                    <th>Book Purchase</th>
                    <th>total Payment</th>
                    <th>Status </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((data, index) => (
                    <TransactionComponent
                      index={index}
                      data={data}
                      getUserId={getUserId}
                      key={data.id}
                      book={book}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transaction;
