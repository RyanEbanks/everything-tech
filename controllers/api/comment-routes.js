const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

//Using the post(create) to add a comment to the single comment page
router.post('/', withAuth, async(req, res) => {
    try {
        const newComment = await Comment.create({
            //req.body will print whatever is in the body in this case, body, user_id & post_id from the commentData.json
            //body would be req.body.body
            body: req.body.body,
            //creating the session id with the user_id
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            id: null
        });

        const post = await Post.findByPk(req.body.post_id, { include: [Comment, User] });
        res.status(200).json(post);
    }catch(err) {
        res.status(400).json(err);
    }
});


module.exports = router;
