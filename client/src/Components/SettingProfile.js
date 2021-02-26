import React, { useState, useContext, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { API } from "../config/api";
import { AppContext } from "../Context/globalContext";

const SettingProfile = ({ show, handleClose }) => {
  const [message, setMessage] = useState("");
  const [state, dispatch] = useContext(AppContext);

  const [formProfile, setFormProfile] = useState({
    gender: "",
    phone: "",
    address: "",
    avatar: null,
  });

  const { gender, phone, address, avatar } = formProfile;

  const onChange = (e) => {
    const updateForm = { ...formProfile };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormProfile(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("gender", gender);
      body.append("phone", phone);
      body.append("address", address);
      body.append("avatar", avatar);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const post = await API.patch("/profile", body, config);

      const response = post.data;

      setMessage(response.status);

      if (response.status == "Success") {
        dispatch({
          type: "UPDATE_PROFILE",
          payload: response.data.user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormProfile({
      gender: state.user.gender,
      phone: state.user.phone,
      address: state.user.address,
      avatar: null,
    });
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h3
            style={{
              textAlign: "center",
              fontWeight: "700px",
            }}
          >
            Editing Profile
          </h3>
          <div
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {message ? message : null}
          </div>
          <Form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder={gender ? gender : "Male / Female"}
              className="form-control mt-5"
              name="gender"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder={phone ? phone : "Phone Number"}
              className="form-control mt-3"
              name="phone"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder={address ? address : "Addresss"}
              className="form-control mt-3"
              name="address"
              onChange={(e) => onChange(e)}
            />
            <input
              type="file"
              className="form-control mt-3"
              name="avatar"
              onChange={(e) => onChange(e)}
            />
            <input
              type="submit"
              className="btn btn-primary mt-4"
              value="Update Profile"
            />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SettingProfile;
