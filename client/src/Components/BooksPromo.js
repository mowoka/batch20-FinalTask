import React from "react";
import { Card, Button } from "react-bootstrap";

const BooksPromo = ({ book, goDetailBookPromoPage }) => {
  return (
    <>
      <Card
        onClick={() => goDetailBookPromoPage(book.id)}
        style={{ width: "18rem" }}
      >
        <Card.Img
          variant="top"
          style={{ height: "200px" }}
          src={`http://localhost:5000/uploads/${book.thumbnail}`}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          {/* <Card.Text>{book.description}</Card.Text> */}
          <Card.Text>{book.price}</Card.Text>
          <Button variant="primary">ADD TO CART</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BooksPromo;
