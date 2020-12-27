import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: false,
    }
}, { timestamps: true })

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

export default mongoose.model('Project', schema);
