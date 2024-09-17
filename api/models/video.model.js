import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true
    },
    speakers: {
        type: Array,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Video = mongoose.model('videos', videoSchema)

export default Video