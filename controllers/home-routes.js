const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        // res.status(200).json("Homepage Route Working!")
        res.render('single-post', {user_id: req.session.user_id, logged_in: req.session.logged_in});
    } catch(err) {
        res.status(500).json(err);
    }
});

//Login Page
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', {logged_in: req.session.logged_in});
    // res.status(200).json("Login Route Working!")
});

//Signup Page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup', {logged_in: req.session.logged_in});
    // res.status(200).json("Signup Route Working!")
  });

//Get Single Post
router.get('/user/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                }
            ],
        });
        const user = userData.get({plain: true});
        console.log(user);
        res.render('single-post', {user, user_id: req.session.user_id, logged_in: req.session.logged_in});
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
