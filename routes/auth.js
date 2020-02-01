const express = require('express');
const router = express.Router();
const usersQueries = require('../db/queries/users');

/* GET users listing. */
router.post('/signup', async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await usersQueries.createUser(user)
    res.send({
      payload: newUser,
      msg: "New user signup success",
      err: false
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
