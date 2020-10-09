import mongoose from 'mongoose';
import './env';

if (process.env.DATABASE_URL) {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log('Database connected!'))
        .catch((err: any) => console.log('Database connection error', err));
}
