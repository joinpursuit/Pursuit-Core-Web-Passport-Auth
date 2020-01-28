var express = require("express");
var router = express.Router();
const db = require("../db/queries");
const passport = require("../auth/local");
const { loginRequired } = require("../auth/helpers");

/* GET users listing. */
router.get("/", db.getUsers);
router.post("/new", db.createUser);
router.post("/login", db.loginUser);
router.get("/isLoggedIn", db.isLoggedIn);
router.post("/logout", db.logoutUser);

module.exports = router;
