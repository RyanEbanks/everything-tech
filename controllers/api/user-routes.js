const router = require('express').Router();
const { User } = require('../../models');

//Creates a new user from the signup page; currently, a 'bad request' alert will appear if the specified email address already exists in the database
router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //Logs a user in from the login page
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      console.log('\n\nUSER DATA:  ', userData);
      console.log("\n\nEmail: ", req.body.email);
      console.log("\n\nPassword: ", req.body.password);

      //Checks for a valid email address in the database
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log('\n\nIS PASSWORD VALID: ', validPassword);
  
      //Checks for a valid password in the database
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      //Saves the user ID and enables functions with the withAuth argument to run
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        console.log('\n\nUSER DATA ID:  ', req.session.id)

        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      console.log('\n\nLOGIN ERROR: ', err);
      res.status(400).json(err);
    }
  });
  
  //Logs out a logged in user from a button on the main page
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
module.exports = router;
