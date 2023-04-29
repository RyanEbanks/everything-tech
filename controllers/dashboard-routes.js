const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        console.log('dashboard route hit'); // Add this line
        const dashboardData = await Post.findAll({
            include: [
              {
                model: User,
              },
              {
                model: Comment,
                include: [
                  {
                    model: User,
                    attributes: ['email']
                  }
                ]
              }
            ],
            where: {
              email: req.session.user_email
            }
          });
          
        
        const dashboard = dashboardData.map((post) => post.get({ plain: true }));
    
        if (!dashboard || dashboard.length === 0) {
          res.status(404).json({ message: 'This user currently has no posts' });
          return;
        }
    
        res.render('dashboard', { dashboard, user_id: req.session.id, logged_in: req.session.logged_in });
        console.log('\n\nreq.session being logged in', req.session.logged_in, '\n\n');
        console.log('email:', req.session.user_email);
      } catch(err) {
        res.status(500).json(err);
      }
  });

module.exports = router;
