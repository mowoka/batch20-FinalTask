const { Book } = require("../../models");
const Joi = require("joi");

exports.addBook = async (req, res) => {
  try {
    const {
      title,
      publicationDate,
      pages,
      ISBN,
      author,
      price,
      description,
    } = req.body;

    // validatasi untuk input buku
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      publicationDate: Joi.string().min(4).required(),
      pages: Joi.number().integer().min(1).required(),
      ISBN: Joi.string().min(3).required(),
      author: Joi.string().min(3).required(),
      price: Joi.number().integer().min(4).required(),
      description: Joi.string().min(8).required(),
      bookAttachment: Joi.string().min(3).required(),
      thumbnail: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({
      title: title,
      publicationDate: publicationDate,
      pages: pages,
      ISBN: ISBN,
      author: author,
      price: price,
      description: description,
      bookAttachment: req.files.bookAttachment[0].filename,
      thumbnail: req.files.thumbnail[0].filename,
    });

    if (error) {
      return res.send({
        message: error.details[0].message,
      });
    }

    const cekBook = await Book.findOne({
      where: {
        title: req.body.title,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (cekBook) {
      return res.send({
        status: "Warning",
        message: "Your Book already exist",
        data: {
          book: cekBook,
        },
      });
    }

    const book = await Book.create({
      title: title,
      publicationDate: publicationDate,
      pages: pages,
      ISBN: ISBN,
      author: author,
      price: price,
      description: description,
      bookAttachment: req.files.bookAttachment[0].filename,
      thumbnail: req.files.thumbnail[0].filename,
    });

    res.send({
      status: "Success",
      message: "Book Successfully added",
      data: {
        title: book.title,
        publicationDate: book.publicationDate,
        pages: book.pages,
        ISBN: book.ISBN,
        author: book.author,
        price: book.price,
        description: book.description,
        bookAttachment: book.bookAttachment,
        thumbnail: book.thumbnail,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Successs",
      message: "Books Successfully Retreived ",
      data: {
        books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getPromoBook = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        price: 60000,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Successs",
      message: "Books Successfully Retreived ",
      data: {
        books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getDetailBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!book) {
      return res.send({
        status: "Error",
        message: `Book with id ${id} Not Found`,
      });
    }

    res.send({
      status: "Success",
      message: `Book with id ${id} Successfully Retreived`,
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
