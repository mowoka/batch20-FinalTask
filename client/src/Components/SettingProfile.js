import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { API } from "../config/api";

const SettingProfile = ({
  show,
  handleClose,
  GetProfile,
  posts,
  profile,
  setPosts,
}) => {
  const [message, setMessage] = useState("");

  const { email, fullName, role, gender, phone, address, avatar } = posts;

  const onChange = (e) => {
    const updateForm = { ...posts };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setPosts(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("gender", gender);
      body.append("noHp", phone);
      body.append("alamat", address);
      body.append("avatar", avatar);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const post = await API.patch("/profile", body, config);

      const response = post.data;

      setMessage(response.status);

      if (post.data.status === "Success") {
        GetProfile();
        setPosts({
          ...post,
          avatar: `http://localhost:5000/uploads/${post.data.data.user.avatar}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              placeholder="Male / Female"
              className="form-control mt-5"
              name="gender"
              onChange={(e) => onChange(e)}
              value={gender}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control mt-3"
              name="noHp"
              value={phone}
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder="Addresss"
              className="form-control mt-3"
              name="alamat"
              value={address}
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
