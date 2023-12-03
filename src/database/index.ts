import mongoose from 'mongoose';
import { IStartup, IJob, IStudent, Startup, Job, Student } from './models';

mongoose.connection.once('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB Connection Error:', err));
mongoose.connection.on('timeout', () => console.error('MongoDB connection timeout'));
mongoose.connection.on('reconnecting', () => console.log('Reconnecting to MongoDB'));
mongoose.connection.on('reconnected', () => console.log('Reconnected to MongoDB'));
mongoose.connection.on('reconnectFailed', () => console.error('All reconnection attempts failed'));

export { mongoose as mongoConnecter, IStartup, IJob, IStudent, Startup, Job, Student };
