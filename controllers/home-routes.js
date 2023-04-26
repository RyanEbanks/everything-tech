const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {

  try {
    const postData = await Post.findAll({
      include: [{ all: true }],
    });

    const post = postData.map((post) => post.get({ plain: true }));
    
    if (!post || post.length === 0) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    
    // res.status(200).json("Homepage Route Working!");
    // console.log(post);
    res.render('all-posts', { post, user_id: req.session.user_id, logged_in: req.session.logged_in });
  } catch(err) {
    res.status(500).json(err);
  }
});

//Get Single Post
router.get('/user/:id', async (req, res) => {

  try{
  const userData = await User.findByPk(req.params.id, {
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['user_name']
              }
            ]
          }
        ]
      }
    ]
  });
        const user = userData.get({plain: true});
        console.log(user);
        res.render('single-post', {user, user_id: req.session.user_id, logged_in: req.session.logged_in});
    }catch(err) {
        res.status(500).json(err);
    }
});

//Get All Posts
router.get('/post', async (req, res) => {
        try {
            const postData = await Post.findAll({
              include: [
              {
                model: Post,
                through: User,
              }
              ],
            });
        
            const post = postData.map((post) => post.get({ plain: true }));
            
            if (!post || post.length === 0) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
            }
            
            console.log("post");
            // res.render('all-posts', { post, user_id: req.session.user_id, logged_in: req.session.logged_in });
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


module.exports = router;
