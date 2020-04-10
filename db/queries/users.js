const db = require('../db')

const authHelpers = require("../../auth/helpers");

const createUser = async (user) => {
  const passwordDigest = await authHelpers.hashPassword(user.password);

  const insertUserQuery = `
      INSERT INTO users (username, password_digest) 
        VALUES ($/username/, $/password/)
        RETURNING *
    `

  const newUser = await db.one(insertUserQuery, {
    username: user.username,
    password: passwordDigest
  })

  delete newUser.password_digest // Do not return the password_digest.
  return newUser
}

const getUserByUsername = async (username) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE username = $1", username)
    return user;
  } catch (err) {
    // User not found by the given username
    if (err.message === "No data returned from the query") {
      return null
    }
  }
}

const getAllUsers = async () => {
  // Do not do SELECT * because it will contain the users password_digest. 
  // Instead select only what is needed.
  const users = await db.any("SELECT id, username FROM users")
  return users;
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserByUsername: getUserByUsername
};
