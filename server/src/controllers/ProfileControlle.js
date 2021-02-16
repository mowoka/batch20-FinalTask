const { User, Book } = require("../../models");

exports.editProfile = async (req, res) => {
  try {
    const cekUser = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!cekUser) {
      return res.send({
        status: "Error",
        message: `user with id ${req.user.id} Not Found`,
      });
    }

    const { gender, phone, address } = req.body;

    await User.update(
      {
        gender: gender,
        phone: phone,
        address: address,
        avatar: req.files.avatar[0].filename,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "Success",
      message: `user with id ${req.user.id} Successfully Retreived`,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!user) {
      return res.send({
        status: "Error",
        message: `Book with id ${req.user.id} Not Found`,
      });
    }

    res.send({
      status: "Success",
      message: `Book with id ${req.user.id} Successfully Retreived`,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    });
  }
};
