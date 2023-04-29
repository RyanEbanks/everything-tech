const router = require('express').Router();
const { Comment, Post, User } = require('../../models/');
const withAuth = require('../../utils/auth');

//Using the post(create) to add a comment to the single comment page
router.post('/', withAuth, async(req, res) => {
    try {
      // Check if required fields are provided
      if (!req.body.body || !req.body.post_id) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      // Check if user is authenticated
      if (!req.session.logged_in || !req.session.user_id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      // Create new comment
      const newComment = await Comment.create({
        //req.body will print whatever is in the body in this case, body, user_id & post_id from the commentData.json
        //body would be req.body.body
        body: req.body.body,
        //creating the session id with the user_id
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
  
      const post = await Post.findByPk(req.body.post_id, { include: [Comment, User] });
      res.status(200).json(post);
    } catch(err) {
      res.status(400).json(err);
    }
  });
  

module.exports = router;
