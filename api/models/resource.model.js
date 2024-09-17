import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resource_link: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Resource = mongoose.model('resource', resourceSchema)

export default Resource