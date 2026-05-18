const User = require("../models/User");
const Subscription = require("../models/Subscription");

const {
  generateToken,
  generateVerificationToken,
  generatePasswordResetToken,
  hashToken,
} = require("../utils/tokenUtils");

const {
  sendEmailVerification,
  sendPasswordReset,
} = require("../services/emailService");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword,

      emailVerificationToken:
        hashToken(
          generateVerificationToken()
        ),

      emailVerificationExpires:
        new Date(
          Date.now() +
          24 * 60 * 60 * 1000
        ),
    });

    await user.save();

    // Send verification email
    await sendEmailVerification(
      email,
      user.emailVerificationToken
    );

    res.status(201).json({
      message:
        "User registered. Check email for verification.",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        message:
          "Please verify your email first",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    user.lastLoginAt = new Date();

    await user.save();

    const token = generateToken({
      userId: user._id,
    });

    res.json({
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const verifyEmail = async (req, res) => {
  try {

    const { token } = req.params;

    const user =
      await User.findOne({
        emailVerificationToken: token,

        emailVerificationExpires: {
          $gt: Date.now(),
        },
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid or expired token",
      });
    }

    user.isEmailVerified = true;

    user.emailVerificationToken =
      undefined;

    user.emailVerificationExpires =
      undefined;

    await user.save();

    res.json({
      message:
        "Email verified successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const requestPasswordReset = async (
  req,
  res
) => {
  try {

    const { email } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const resetToken =
      generatePasswordResetToken();

    user.passwordResetToken =
      hashToken(resetToken);

    user.passwordResetExpires =
      new Date(
        Date.now() +
        60 * 60 * 1000
      );

    await user.save();

    await sendPasswordReset(
      email,
      resetToken
    );

    res.json({
      message:
        "Password reset email sent",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const resetPassword = async (
  req,
  res
) => {
  try {

    const { token, password } =
      req.body;

    const user =
      await User.findOne({
        passwordResetToken:
          hashToken(token),

        passwordResetExpires: {
          $gt: Date.now(),
        },
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid or expired token",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        password,
        salt
      );

    user.passwordResetToken =
      undefined;

    user.passwordResetExpires =
      undefined;

    await user.save();

    res.json({
      message:
        "Password reset successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};