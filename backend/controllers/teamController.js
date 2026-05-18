const Team = require('../models/Team');
const User = require('../models/User');

const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { userId } = req.user;

    const team = new Team({
      name,
      description,
      owner: userId,
      members: [{ user: userId, role: 'owner' }],
    });

    await team.save();

    const user = await User.findById(userId);
    user.teams.push(team._id);
    user.activeTeam = team._id;
    await user.save();

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeams = async (req, res) => {
  try {
    const { userId } = req.user;
    const teams = await Team.find({
      $or: [{ owner: userId }, { 'members.user': userId }],
    }).populate('members.user', 'name email');

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members.user', 'name email');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTeamMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    const { id } = req.params;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Add invite if user doesn't exist
      team.invites.push({
        email,
        role,
        invitedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    } else {
      team.members.push({ user: user._id, role });
      user.teams.push(team._id);
      await user.save();
    }

    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeTeamMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    team.members = team.members.filter((m) => m.user.toString() !== memberId);
    await team.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  addTeamMember,
  removeTeamMember,
};
