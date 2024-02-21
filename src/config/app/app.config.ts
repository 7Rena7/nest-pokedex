export const EnvConfiguration = () => ({
  environment: process.env.APP_ENV || 'development',
  mongoUri: process.env.MONGO_CONNECTION_STRING || '',
  port: process.env.PORT || 9001,
});
