const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        res.status(200).json("Homepage Route Working!")
        // res.render('homepage', {user_id: req.session.user_id, logged_in: req.session.logged_in});
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
