import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500
    },
    status: {
        type: String,
        enum: ['Todo', 'In Progress', 'Done'],
        default: 'Todo'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projectModel',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    }
}, {
    timestamps: true
});

export default model('taskModel', taskSchema, 'tasks');