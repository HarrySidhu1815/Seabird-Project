import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subkect: {
        type: String,
        required: true
    },
    level: {
        type: Array,
        required: true
    },
    resource: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Resource = mongoose.model('resource', resourceSchema)

export default Resource