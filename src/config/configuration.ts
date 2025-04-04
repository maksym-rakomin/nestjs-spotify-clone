export default () => ({
  NODE_ENV: process.env.NODE_ENV,

  port: parseInt(process.env.PORT || '3000'),
  secret: process.env.SECRET,

  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT || '5432'),
  dbName: process.env.DB_NAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});
