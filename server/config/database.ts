import mongoose from 'mongoose';
import './env';
import debug from '../config/debug';

if (process.env.DATABASE_URL) {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => debug.log('Database connected!'))
        .catch((err: any) => debug.error('Database connection error', err));
}
