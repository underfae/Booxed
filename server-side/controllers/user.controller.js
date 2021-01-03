const mongoose = require("mongoose");
const User = mongoose.model("user");
const passport = require("passport");
const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports.registerUser = (req, res, next) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.name = req.body.name;
  user.surname = req.body.surname;
  user.password = req.body.password;
  user.points = req.body.points;
  user.liked = req.body.liked;
  user.read = req.body.read;
  user.role = req.body.role;
  user.save((error, result) => {
    if (error) {
      error.code === 11000
        ? res
            .status(422)
            .send(Object.keys(error.keyValue)[0] + " must be unique!")
        : next(error);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports.authentication = (request, response, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return response.status(400).json(error);
    else if (user)
      return response.status(200).json({ token: user.generateJwt() });
    else return response.status(404).json(info);
  })(request, response);
};

module.exports.loggedUser = (request, response, next) => {
  User.findOne({ _id: request._id }, (error, result) => {
    if (!result)
      return result
        .stat(404)
        .json({ status: false, message: "User not found!" });
    else
      return response.status(200).json({
        status: true,
        user: _.pick(result, [
          "_id",
          "username",
          "name",
          "surname",
          "email",
          "liked",
          "read",
          "points",
          "role",
        ]),
      });
  });
};

module.exports.modifyUser = (req, res) => {
  let modifiedUser = {
    points: req.body.points,
    liked: req.body.liked,
    read: req.body.read,
  };
  User.findByIdAndUpdate(
    req.params.id,
    { $set: modifiedUser },
    { new: true },
    (error, result) => {
      if (error) {
        res.status(400).send(error.errors);
      } else {
        res.status(200).send(result);
      }
    }
  );
};

module.exports.getUsers = (req, res) => {
  User.find({}, function (error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: false, message: "There is no user with given id" });
  else {
    User.findOneAndRemove({ _id: id }, function (error, post) {
      if (error) {
        res.status(500).send(error);
      } else {
        res
          .status(200)
          .json({ status: true, message: "User deleted succesfully" });
      }
    });
  }
};

module.exports.getUser = (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: false, message: "There is no user with given id" });
  else {
    User.findById({ _id: id }, function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    });
  }
};

module.exports.forgotPassword = (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.booxed@gmail.com",
        pass: "Booxed123!",
      },
    });
    const mailOptions = {
      from: "noreply.booxed@gmail.com",
      to: email,
      subject: "Reset password link",
      html: `
        <h2> Please click on this link in order to reset your password </h2>
        <p>${process.env.CLIENT_URL}/password/reset-password/${token}</p> 
      `,
    };

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: "reset password link error" });
      } else {
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            res.status(200).json({
              message: "Link sent succesfully. Please check your email",
            });
          }
        });
      }
    });
  });
};

module.exports.resetPassword = (req, res) => {
  const resetLink = req.body.resetLink;
  const newPass = req.body.newPass;

  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      (err, decodedData) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "Incorrect token or it is expired" });
        }
        User.findOne({ resetLink: resetLink }, (err, user) => {
          if (err || !user) {
            return res
              .status(400)
              .json({ error: "User with this token does not exist" });
          }
          const obj = {
            password: newPass,
          };
          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json("reset password error");
            } else {
              return res
                .status(200)
                .json({ message: "Your password has been changed" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Authentication error!" });
  }
};

module.exports.sendMessage = (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const text = req.body.text;

  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User you want to send email to does not exist" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.booxed@gmail.com",
        pass: "Booxed123!",
      },
    });

    const mailOptions = {
      from: "noreply.booxed@gmail.com",
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({
          message: "Email sent succesfully.",
        });
      }
    });
  });
};
