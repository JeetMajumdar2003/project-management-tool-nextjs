import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed'],
        default: 'pending'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);    // Avoid recompiling model we already have

export default Project;