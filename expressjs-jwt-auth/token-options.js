require("dotenv").config();

const accessTokenExpireTime = 1 * 60 * 1000; // 5min
const refreshTokenExpireTime = 7 * 24 * 60 * 60 * 1000; // 7day;

function getAccessTokenOpts() {
  return {
    secret: process.env.ACCESS_TOKEN_SECRET,
    tokenOpts: {
      expiresIn: accessTokenExpireTime / 1000,
    },
    cookieOpts: {
      expires: accessTokenExpireTime,
    },
  };
}

function getRefreshTokenOpts() {
  return {
    secret: process.env.REFRESH_TOKEN_SECRET,
    tokenOpts: {
      expiresIn: refreshTokenExpireTime / 1000,
    },
    cookieOpts: {
      expires: refreshTokenExpireTime,
    },
  };
}

module.exports = {
  getRefreshTokenOpts,
  getAccessTokenOpts,
};
