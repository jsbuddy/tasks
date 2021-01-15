import mongoose, { Document, Schema, Types } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deadline: {
        type: Date,
        required: false,
    }
}, { timestamps: true })

export interface Project {
    name: string,
    user: Types.ObjectId,
    deadline: Date
}

interface ProjectBaseDocument extends Project, Document {
}

export interface ProjectDocument extends ProjectBaseDocument {
    completedTasksCount?: number,
    pendingTasksCount?: number
}

schema.virtual('completedTasksCount', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'project',
    count: true,
    match: { completed: true }
})

schema.virtual('pendingTasksCount', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'project',
    count: true,
    match: { completed: false }
})

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export default mongoose.model<ProjectDocument>('Project', schema);
