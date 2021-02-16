const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(8).required(),
      fullName: Joi.string().min(3).required(),
    });

    const { error } = schema.validate({
      email: email,
      password: password,
      fullName: fullName,
    });

    if (error) {
      return res.send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const cekEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (cekEmail) {
      return res.send({
        status: "Warning",
        message: "Email Already Register",
      });
    }

    const hassedStrength = 10;
    const hassedPassword = await bcrypt.hash(password, hassedStrength);

    await User.create({
      ...req.body,
      password: hassedPassword,
      role: "User",
    });

    const user = User.findOne({
      where: {
        email,
      },
    });

    // untuk Secret Key
    const secretKey = "Mokaz-Dev";

    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    const getUser = await User.findOne({
      where: {
        email,
      },
    });

    res.send({
      status: "Success",
      message: "Register Success",
      data: {
        email: getUser.email,
        fullName: getUser.fullName,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate({
      email: email,
      password: password,
    });

    if (error) {
      return res.send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.send({
        status: "Error",
        message: "Your Credential is not valid",
      });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.send({
        status: "Error",
        message: "Your Credential is not valid",
      });
    }

    // Untuk Secret Keynya
    const secretKey = "Mokaz-Dev";
    const token = jwt.sign(
      {
        id: user.id,
      },
      secretKey
    );

    res.send({
      status: "Success",
      message: "Login Success",
      data: {
        user: {
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          token,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.cekAuth = async (req, res) => {
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
        message: "User Not Found",
      });
    }

    res.send({
      status: "Success",
      message: "User Valid",
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
