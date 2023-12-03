export const CONFIG = {
  PORT: process.env.PORT || 3000,
  SUPER_USER_CODE: process.env.SUPER_USER_CODE,
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'your-secret-key',
};
