const jwt = require("jsonwebtoken");

function formatDate(date) {
  const year = date.getFullYear();
  // Add 1 to month since it's zero-indexed
  const month = date.getMonth() + 1;
  const day = date.getDate() - 1;

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

function generateAccessToken(username) {
  return jwt.sign(
    username,
    process.env.TOKEN_SECRET /*, { expiresIn: "10h" }*/
  );
}

module.exports = { formatDate, generateAccessToken };
