import mongoose from 'mongoose';

mongoose.connection.once('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB Connection Error:', err));
mongoose.connection.on('timeout', () => console.error('MongoDB connection timeout'));
mongoose.connection.on('reconnecting', () => console.warn('Reconnecting to MongoDB'));
mongoose.connection.on('reconnected', () => console.warn('Reconnected to MongoDB'));
mongoose.connection.on('reconnectFailed', () => console.error('All MongoDB reconnection attempts failed'));

export { mongoose as mongoConnector };
