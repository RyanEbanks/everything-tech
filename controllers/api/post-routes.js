const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

//Using the post(create) to add a post to the single post page
router.post('/', withAuth, async(req, res) => {
    try {
        const newPost = await Post.create({
            //req.body will print whatever is in the body in this case, title, body & user_id from the postData.json
            //title would be req.body.title
            ...req.body,
            //creating the session id with the user_id
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    }catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;
