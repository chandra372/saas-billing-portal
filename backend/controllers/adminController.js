const User = require("../models/User");
const Subscription = require("../models/Subscription");

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getAllSubscriptions = async (
  req,
  res
) => {
  try {

    const subscriptions =
      await Subscription.find()
        .populate("user", "name email");

    res.json(subscriptions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAllUsers,
  getAllSubscriptions,
  deleteUser,
};