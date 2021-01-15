import mongoose, { HookNextFunction, Schema } from 'mongoose';
import bcrypt from 'bcryptjs'
import { Document } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export interface User {
    name: string,
    email: string,
    password: string
}

interface UserBaseDocument extends User, Document {
}

export interface UserDocument extends UserBaseDocument {
    comparePasswords(password: string): boolean
}

schema.pre<UserDocument>('save', async function (next: HookNextFunction) {
    if (!this.isModified('password')) return next()
    const password = await bcrypt.hash(this.password, 10);
    this.password = password;
    next();
})

schema.methods.comparePasswords = function (password: string) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model<UserDocument>('User', schema);
