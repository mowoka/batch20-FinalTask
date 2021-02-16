import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { AppContext } from "../../Context/globalContext";
import { API } from "../../config/api";
import SettingProfile from "../../Components/SettingProfile";
import EmailIcon from "@material-ui/icons/Email";
import WcIcon from "@material-ui/icons/Wc";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";

const Profile = () => {
  const [posts, setPosts] = useState({
    email: "",
    fullName: "",
    role: "",
    gender: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [state, dispatch] = useContext(AppContext);

  const history = useHistory();
  const { email, fullName, role, gender, phone, address, avatar } = posts;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goDetailBookPage = () => {
    history.push("/detail-book");
  };

  const GetProfile = async () => {
    try {
      setLoading(true);

      const post = await API.get("/get-user");

      setLoading(false);

      if (post.data.status == "Success") {
        dispatch({
          type: "LOAD_PROFILE",
          payload: post.data.data.user,
        });
        setPosts({
          email: post.data.data.user.email,
          fullName: post.data.data.user.fullName,
          role: post.data.data.user.role,
          gender: post.data.data.user.gender,
          phone: post.data.data.user.phone,
          address: post.data.data.user.address,
          avatar: `http://localhost:5000/uploads/${post.data.data.user.avatar}`,
        });
      }
    } catch (error) {
      console.log("Profile not Found");
    }
  };

  useEffect(() => {
    GetProfile();
  }, []);
  const UserBookList = [
    {
      id: 1,
      img: "image/beranda/serankai.png",
      alt: "buku1",
      title: "Serangkai",
      author: "Valeri Patkar",
    },
    {
      id: 2,
      img: "image/beranda/serankai.png",
      alt: "buku1",
      title: "Serangkai",
      author: "Valeri Patkar",
    },
  ];

  return (
    <>
      <div className="beranda--container-content">
        <h3 className="profile--title-name">Profile</h3>
        <div className="profile--user-description">
          <div className="user-description-menu">
            <div className="user--description">
              <div className="description--icon">
                <EmailIcon className="user-icon" />
              </div>
              <div className="description--text">
                <p>{email ? email : "set email"}</p>
                <small>Email</small>
              </div>
            </div>
            <div className="user--description">
              <div className="description--icon">
                <WcIcon className="user-icon" />
              </div>
              <div className="description--text">
                <p>{gender ? gender : "set Gender"}</p>
                <small>Gender</small>
              </div>
            </div>
            <div className="user--description">
              <div className="description--icon">
                <CallIcon className="user-icon" />
              </div>
              <div className="description--text">
                <p>{phone ? phone : "set Phone Number"}</p>
                <small>Mobile Phone</small>
              </div>
            </div>
            <div className="user--description">
              <div className="description--icon">
                <HomeIcon className="user-icon" />
              </div>
              <div className="description--text">
                <p>{address ? address : "set Address"}</p>
                <small>Address</small>
              </div>
            </div>
          </div>
          <div className="user--descriptionn-image">
            <img
              src={avatar ? avatar : "image/beranda/egi.png"}
              alt="foto-profile"
            />
            <div onClick={handleShow} className="user--description-button">
              <p>Edit profile</p>
            </div>
            <SettingProfile
              GetProfile={GetProfile}
              show={show}
              handleClose={handleClose}
              posts={posts}
              setPosts={setPosts}
              profile={profile}
            />
          </div>
        </div>
        <div className="profile--description-books">
          <h3>My List Books</h3>
        </div>
      </div>
    </>
  );
};

export default Profile;
