const { response } = require("express");
const { User } = require("../models");
const { generateJWT } = require("../middlewares/auth");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await findUserBy({ email: email, deleted: 0 });

    if (!user) {
      return res.status(400).json({
        ok: false,
        auth: null,
        token: null,
        msg: "User with this email not found",
      });
    }

    const isValidPassword = await user.isValidPassword(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        ok: false,
        auth: null,
        token: null,
        msg: "Password is incorrect",
      });
    }

    console.log(user);

    // user = await getUserQueryById(user.id)

    // const token = await generateJWT(user);

    // res.status(200).json({
    //   ok: true,
    //   token: token,
    //   user: user,
    //   msg: "Login successful",
    // });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      token: null,
      msg: "Error authenticating",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const { user, msg } = await existUserWitEmailUsername({
      email: email,
      username: username,
    });

    if (user) {
      return res.status(404).json({
        ok: false,
        user: null,
        msg: msg,
      });
    }

    const newUser = await User.create({
      email: email,
      username: username,
      password: password,
      deleted: 0,
    });

    if (!newUser) {
      return res.status(404).json({
        ok: false,
        user: null,
        msg: "An error occurred when creating user",
      });
    }

    // const token = await generateJWT(newUser);

    // res.status(200).json({
    //   ok: true,
    //   user: newUser,
    //   token: token,
    //   msg: "User created successfully",
    // });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      token: null,
      user: null,
      msg: "Error authenticating",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  try {
    let user = {
      userId: req.userId,
      username: req.username,
      email: req.email,
      created_at: req.created_at,
    };

    const token = await generateJWT(user);

    user = await getUserQueryById(user.userId);

    res.status(200).json({
      ok: true,
      token: token,
      user: user,
      msg: "Revalidating token",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      token: null,
      user: null,
      msg: "Error revalidating token",
    });
  }
};

const existUserWitEmailUsername = async ({ email, username }) => {
  try {
    const findWithEmail = await findUserBy({ email: email, deleted: 0 });
    const findWithUsername = await findUserBy({
      username: username,
      deleted: 0,
    });

    let msg = "";

    if (findWithEmail && findWithUsername) {
      msg += "User with this email and this username already exists";

      return {
        ok: true,
        user: findWithEmail,
        msg: msg,
      };
    }

    if (findWithEmail) {
      msg += "User with this email already exists";

      return {
        ok: true,
        user: findWithEmail,
        msg: msg,
      };
    }

    if (findWithUsername) {
      msg += "User with this username already exists";

      return {
        ok: true,
        user: findWithUsername,
        msg: msg,
      };
    }

    return {
      ok: false,
      user: null,
      msg: "User not found",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      user: null,
      error: error,
    };
  }
};

const findUserBy = async (dataToSearch) => {
  try {
    const user = await User.findOne({
      where: dataToSearch,
    });
    return user;
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      user: null,
      error: error,
    };
  }
};

module.exports = { login, signup, revalidateToken };
