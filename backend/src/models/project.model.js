import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    }
}, {
    timestamps: true
});

export default model('projectModel', projectSchema, 'projects');