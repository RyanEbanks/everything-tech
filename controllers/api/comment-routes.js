const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

//Using the post(create) to add a comment to the single comment page
router.post('/', withAuth, async(req, res) => {
    try {
        const newComment = await Comment.create({
            //req.body will print whatever is in the body in this case, body, user_id & post_id from the commentData.json
            //body would be req.body.body
            ...req.body,
            //creating the session id with the user_id
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    }catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;
