const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = require("./src/routes");

const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("API is Working");
});

// Oprekasn untuk relasi mysql
const { authenticated } = require("../server/src/middlewares/auth");
const { isUser } = require("../server/src/middlewares/cekRoleUser");

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "batch20-bookstore",
});

app.get("/api/v2/transactions", authenticated, isUser, (req, res) => {
  const sql = "SELECT * FROM transactions";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.get("/api/v2/transaction", authenticated, isUser, (req, res) => {
  const id = req.user.id;

  console.log(id);

  const sql = `SELECT * FROM transactions WHERE userId = ${id}`;
  db.query(sql, (err, result) => {
    res.send({
      status: "Success",
      message: "Data Retreived",
      result,
    });
  });
});

app.get("/api/v2/purchase-book/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM purchasebooks WHERE transactionId = ${id}`;
  // const sql = `SELECT * FROM purchasebooks`;
  db.query(sql, (err, result) => {
    res.send({
      status: "Success",
      message: "Data Retreived",
      result,
    });
  });
});

//

app.listen(port, () => {
  console.log(`Server Running port ${port}, App Ready`);
});
