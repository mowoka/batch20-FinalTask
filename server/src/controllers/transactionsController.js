const { Transaction, User } = require("../../models");

const Joi = require("joi");

exports.addTransaction = async (req, res) => {
  try {
    const { booksPurcahased, totalPayment, status } = req.body;
    // validatasi untuk input Transcation
    const schema = Joi.object({
      userId: Joi.number().integer().min(1).required(),
      attachment: Joi.string().min(5).required(),
      totalPayment: Joi.number().integer().min(3).required(),
    });

    const { error } = schema.validate({
      userId: req.user.id,
      attachment: req.files.attachment[0].filename,
      totalPayment: totalPayment,
    });

    if (error) {
      return res.send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      attachment: req.files.attachment[0].filename,
      totalPayment: totalPayment,
      booksPurcahased: booksPurcahased,
      status: "Pending",
    });

    res.send({
      status: "Success",
      message: "Transaction Successfully added",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "role", "email"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "Successs",
      message: "Transactions Successfully Retreived ",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const findTransaction = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (!findTransaction) {
      return res.send({
        status: "Success",
        message: `Book with id ${id} Not Found`,
      });
    }

    await Transaction.update(req.body, {
      where: {
        id,
      },
    });

    const transaction = await Transaction.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "role", "email"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      message: `Transcation with id ${id} Successfully Update`,
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
