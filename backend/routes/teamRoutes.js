const express = require('express');
const { createTeam, getTeams, getTeam, addTeamMember, removeTeamMember } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createTeam);
router.get('/', protect, getTeams);
router.get('/:id', protect, getTeam);
router.post('/:id/members', protect, addTeamMember);
router.delete('/:id/members/:memberId', protect, removeTeamMember);

module.exports = router;
