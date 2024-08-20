import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
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
    private: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const Video = mongoose.model('videos', videoSchema)

export default Video