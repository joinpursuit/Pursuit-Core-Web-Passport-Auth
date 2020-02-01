const db = require('../db')

const authHelpers = require("../../auth/helpers");

const createUser = async (user) => {
  const passwordDigest = await authHelpers.hashPassword(user.password);

  const inserUserQuery = `
      INSERT INTO users (username, password_digest) 
        VALUES ($/username/, $/password/)
        RETURNING *
    `

  const newUser = await db.one(inserUserQuery, {
    username: user.username,
    password: passwordDigest
  })

  delete newUser.password_digest // Do not return the pasword_digest
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
  const users = await db.any("SELECT * FROM users")
  return users;
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserByUsername: getUserByUsername
};
