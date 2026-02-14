import mongoose, {Schema, model} from "mongoose";

const content_Schema=new Schema({
    
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true,
        trim: true
    },
    category:{
        type:String,
        enum: ['fiction','science','art','daily','history'],
        required: true,
        trim: true
    },
    mediaType:{
        type:String,
        enum: ['video','image','audio','text'],
        default: 'text',
        trim: true
    },
     author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel', 
        required: true 
    },

    mediaUrl: { type: String, default: '' },
    cloudinaryId: { type: String, default: '' }
},{
    timestamps: true
    }
);


export default model('contentModel', content_Schema,'content');