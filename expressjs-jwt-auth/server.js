require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { getRefreshTokenOpts, getAccessTokenOpts } = require("./token-options");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const users = [
  {
    username: "test1",
    password: "pass123",
  },
];

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = { username, password };

  users.push(newUser);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

app.post("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.clearCookie("accessToken", { httpOnly: true });
  res.clearCookie("refreshToken", { httpOnly: true });

  res.json({ message: "Logout successful" });
});

let refreshTokens = [];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = generateAccessToken({ username: user.username });
  const refreshTokenOpts = getRefreshTokenOpts();
  const refreshToken = jwt.sign(
    { username: user.username },
    refreshTokenOpts.secret,
    refreshTokenOpts.tokenOpts
  );
  refreshTokens.push(refreshToken);

  const accessTokenOpts = getAccessTokenOpts();
  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenOpts.cookieOpts.expires,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: refreshTokenOpts.cookieOpts.expires,
    httpOnly: true,
  });
  res.json({ message: "Login successful" });
});

function generateAccessToken(user) {
  const accessTokenOpts = getAccessTokenOpts();
  return jwt.sign(user, accessTokenOpts.secret, accessTokenOpts.tokenOpts);
}

app.post("/token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null)
    return res.status(401).send("Refresh token not found");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("Refresh token invalid");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Error verifying refresh token");
    const accessToken = generateAccessToken({ username: user.username });
    const accessTokenOpts = getAccessTokenOpts();
    res.cookie("accessToken", accessToken, {
      maxAge: accessTokenOpts.cookieOpts.expires,
      httpOnly: true,
    });
    res.json({ accessToken: accessToken });
  });
});

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("hello test");
});

app.get("/public", (req, res) => {
  res.send("Public endpoint");
});

app.get("/protected", authenticateToken, (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  console.log({ accessToken, protected: 1 });
  if (accessToken) {
    return res.json(users);
  }

  if (refreshToken == null)
    return res.status(401).send("Refresh token not found");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("Refresh token invalid");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Error verifying refresh token");
  });

  console.log({ loggedinUser: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
