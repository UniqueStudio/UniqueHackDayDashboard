export const jwtSecret = process.env.JWT_SECRET || 'faraway';
export const port = parseInt(process.env.PORT || '8080', 10);
export const host = process.env.HOST || '0.0.0.0';

export const mongodbPath = process.env.MONGODB_PATH || 'mongodb://10.8.125.46/hackday-dashboard';
