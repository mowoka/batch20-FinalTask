import React, { useState, useContext } from "react";
import "./Checkout.css";
import { AppContext } from "../../Context/globalContext";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import NavbarLogin from "../../Components/NavbarLogin/NavbarLogin";
import CheckoutComponent from "../../Components/CheckoutComponent";
import CheckoutNotfication from "../../Components/CheckoutNotfication";

const Checkout = () => {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    attachment: null,
  });
  const [state, dispatch] = useContext(AppContext);
  const { carts } = state;
  const { attachment } = form;
  const price = [];
  const booksPurcahased = [];
  const history = useHistory();
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

  const onChange = (e) => {
    const updateForm = { ...form };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(updateForm);
  };

  const removeBookFromCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: {
        id,
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const booksPurcahase = JSON.stringify(booksPurcahased);
    const totalPrice = sum(price);

    try {
      const body = new FormData();

      body.append("booksPurcahased", booksPurcahase);
      body.append("totalPayment", totalPrice);
      body.append("attachment", attachment);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // if (body.epubFile == null) {
      //   setMessage("Please Upload File Epub");
      // }

      const post = await API.post("/transaction", body, config);

      const response = post.data;

      setMessage(response.message);
      handleShow();
      dispatch({
        type: "RELEASE_CART",
      });
    } catch (error) {
      console.log(error);
      console.log("Probelm pada onSubmit Checkout");
    }
  };

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="checout--container">
        <NavbarLogin />
        <div className="checkout--content-menu">
          <div className="checkout--menu-title">
            <h4>My Carts</h4>
            <p>Review Your Order</p>
          </div>
          <div className="checkout--menu-charts">
            <div className="checkout--menu-item">
              <div className="--checkout-item-col">
                {carts.length > 0 ? (
                  carts.map(
                    (book, index) => (
                      price.push(book.price),
                      booksPurcahased.push(book.id),
                      (
                        <CheckoutComponent
                          removeBookFromCart={removeBookFromCart}
                          book={book}
                          key={book.id}
                        />
                      )
                    )
                  )
                ) : (
                  <h1>Silahkan untuk order dulu</h1>
                )}
                {/* <div className="checkout-item">
                  <div className="checkout-item-content">
                    <div className="--checkout-content-img">
                      <img src="image/book-one.png" alt="ini buku" />
                    </div>
                    <div className="--checkout-content-desc">
                      <h4>My Own Private Mr.Cool</h4>
                      <small>by indah Handaco</small>
                      <p>Rp 75000</p>
                    </div>
                  </div>
                  <div className="checkout-item-icon">
                    <img src="image/trash.png" alt="trash" />
                  </div>
                </div> */}
              </div>
            </div>
            {console.log(booksPurcahased)}
            <div className="checkout--menu-payment">
              <div className="checkout-payment-desc">
                <div className="--payment-title">
                  <h4>Subtotal</h4>
                  <p>{sum(price)}</p>
                </div>
                <div className="--payment-number">
                  <h4>Qty</h4>
                  <p>{carts.length}</p>
                </div>
                <hr />
                <div className="--payment-money">
                  <h4>Total</h4>
                  <p>{sum(price)}</p>
                </div>
              </div>
              <div className="checkout--payment-action">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="checkout-action">
                    <div className="--action-image">
                      <img src="image/payment.png" alt="hand" />
                    </div>
                    <div className="--action-input">
                      <label for="upload-photo">Attache of transaction</label>
                      <input
                        onChange={(e) => onChange(e)}
                        type="file"
                        name="attachment"
                        id="upload-photo"
                      />
                    </div>
                  </div>
                  {attachment ? attachment.name : null}
                  <div className="checkout-button">
                    <input type="submit" className="btn" value="Pay" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <CheckoutNotfication show={show} handleClose={handleClose} />
      </div>
    </>
  );
};

export default Checkout;
