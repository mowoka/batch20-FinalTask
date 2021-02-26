const express = require("express");
const router = express.Router();

// Get Middlewares
const { authenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/cekRoleAdmin");
const { isUser } = require("../middlewares/cekRoleUser");
const { uploadBook } = require("../middlewares/uploadBook");
const { uploadProfile } = require("../middlewares/uploadProfile");
const { uploadProof } = require("../middlewares/uploadProof");
// Get Controllers
const { register, login, cekAuth } = require("../controllers/registerLogin");
const {
  addBook,
  getBook,
  getPromoBook,
  getDetailBook,
} = require("../controllers/bookController");
const { editProfile, getUser } = require("../controllers/ProfileControlle");
const {
  addTransaction,
  getTransactions,
  editTransaction,
  getTrasactionUser,
} = require("../controllers/transactionsController");
// Declaire Routes
// User
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authenticated, cekAuth);

// profile
router.patch(
  "/profile",
  authenticated,
  isUser,
  uploadProfile("avatar"),
  editProfile
);
router.patch(
  "/profile-admin",
  authenticated,
  isAdmin,
  uploadProfile("avatar"),
  editProfile
);
router.get("/get-user", authenticated, isUser, getUser);
router.get("/get-admin", authenticated, isAdmin, getUser);

// Books
router.post(
  "/book",
  authenticated,
  isAdmin,
  uploadBook("bookAttachment", "thumbnail"),
  addBook
);
router.get("/books", getBook);
router.get("/promo-books", getPromoBook);
router.get("/book/:id", authenticated, isUser, getDetailBook);

// transactions
router.post(
  "/transaction",
  authenticated,
  isUser,
  uploadProof("attachment"),
  addTransaction
);
router.get(
  "/transaction",
  authenticated,
  isAdmin,
  // uploadProof("attachment"),
  getTransactions
);
router.patch("/transaction/:id", authenticated, isAdmin, editTransaction);

module.exports = router;
