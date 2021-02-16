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
router.get("/get-user", authenticated, isUser, getUser);

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
  // uploadProof("attachment"),
  getTransactions
);
router.patch("/transaction/:id", authenticated, isAdmin, editTransaction);

module.exports = router;
