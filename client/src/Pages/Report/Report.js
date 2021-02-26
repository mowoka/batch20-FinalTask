import React, { useState, useContext, useEffect } from "react";
import { API } from "../../config/api";
import "./Report.css";
import { AppContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";

const Report = () => {
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);
  const { user } = state;
  const linkImage = `http://localhost:5000/uploads/${user.avatar}`;

  const [status, setStatus] = useState({
    Approved: [],
    Pending: [],
    Cancel: [],
  });
  const [harga, setHarga] = useState({
    uang: [],
  });

  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);

  useEffect(() => {
    getTransactions();
  }, []);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/transaction");

      setIsLoading(false);

      //   console.log(response.data.status);
      if (response.data.status == "Successs") {
        setTransactions(response.data.data.transactions);
      }
    } catch (error) {
      console.log("error get data");
    }
  };

  // sum
  const sum = (input) => {
    if (toString.call(input) !== "[object Array]") return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += Number(input[i]);
    }
    return total;
  };

  const handleTransaction = () => {
    transactions.map((transaction, index) => {
      console.log(transaction.totalPayment);
      if (transaction.status == "Approved") {
        setStatus((prevState) => ({
          ...prevState,
          Approved: [...prevState.Approved, transaction],
        }));
        setHarga((prevState) => ({
          ...prevState,
          uang: [...prevState.uang, transaction.totalPayment],
        }));
      } else if (transaction.status == "Pending") {
        setStatus((prevState) => ({
          ...prevState,
          Pending: [...prevState.Pending, transaction],
        }));
      } else {
        setStatus((prevState) => ({
          ...prevState,
          Cancel: [...prevState.Cancel, transaction],
        }));
      }
    });
  };

  useEffect(() => {
    handleTransaction();
  }, [transactions]);

  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }

  const totalPendapatan = convertToRupiah(sum(harga.uang));

  return (
    <>
      <div className="transaction--container">
        <div className="transaction--menu-header">
          <div className="header--menu-logo">
            <img src="image/logo.png" alt="logo" />
          </div>
          {console.log(harga.uang)}
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
        <div className="report-container">
          <div className="report--headline">
            <h3>Laporan Penjualan</h3>
            <p>WaysBook</p>
          </div>
          <div className="report--description">
            <div className="report--total">
              <h3>Total Transaction Buku</h3>
              <p>{transactions.length} Pcs</p>
            </div>
            <div className="report--Approved">
              <h3>Status Approved</h3>
              <p>{status.Approved.length} Pcs</p>
            </div>
            <div className="report--Pending">
              <h3>Status Pending</h3>
              <p>{status.Pending.length} Pcs</p>
            </div>
            <div className="report--Cancel">
              <h3>Status Cancel</h3>
              <p>{status.Cancel.length} Pcs</p>
            </div>
          </div>
          <div className="report--info">
            <div className="--info-penjualan">
              <h3>Total Penjualan</h3>
              <p>{totalPendapatan}</p>
            </div>
            <div className="--info-peluang">
              <h3>Peluang Penambahan Pendapatan</h3>
              <p>{status.Pending.length} Pcs</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
