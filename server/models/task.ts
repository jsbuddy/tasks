import mongoose, { Document, Schema, Types } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    completed: {
        type: Boolean,
        default: false
    },
    due: {
        type: Date,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export interface Task {
    name: string;
    priority: number;
    completed: boolean;
    due: Date;
    project: Types.ObjectId;
    user: Types.ObjectId;
}

interface TaskBaseDocument extends Task, Document {
}

export interface TaskDocument extends TaskBaseDocument { }

export default mongoose.model<TaskDocument>('Task', schema);
