module.exports = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/horror-films',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Access_Secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_Secret',
  ACCESS_TOKEN_EXP_TIME: '10s',
  REFRESH_TOKEN_EXP_TIME: '1m',
  TOKEN_TYPE: { ACCESS: 'acsess', REFRESH: 'refresh' },
};
