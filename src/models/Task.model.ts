import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);    // Avoid recompiling model we already have

export default Task;