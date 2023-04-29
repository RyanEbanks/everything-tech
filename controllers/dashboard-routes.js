const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log('req.session.user_id:', req.session.user_id); // added console.log statement
    const user = await User.findEmailById(req.session.user_id);
    console.log('user:', user); // added console.log statement
    const dashboardData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['email'] }],
        },
      ],
    });
    const dashboard = dashboardData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      dashboard,
      user_email: user.email, // access email property
      user_id: req.session.user_id,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
