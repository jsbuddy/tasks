import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export default mongoose.model('Project', schema);
