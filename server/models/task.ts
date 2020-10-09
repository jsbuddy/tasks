import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
        enum: [1, 2, 3]
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
    }
}, { timestamps: true })

export default mongoose.model('Task', schema);
