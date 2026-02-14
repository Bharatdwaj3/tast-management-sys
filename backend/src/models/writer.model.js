import mongoose, {Schema, model} from "mongoose";

const writer_Schema=new mongoose.Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    bio:{
        type:String,
        required: true,
        trim: true
    },
    intrests:{
        type:[String],
        enum: ['fiction','science','art','daily'],
        trim: true
    },
    authored: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'content',  
    }],
    followers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'content' 
    }],
    following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }],

    mediaUrl: { type: String, default: '' },
    cloudinaryId: { type: String, default: '' }
},{
    timestamps: true
    }
);



export default model('writerModel', writer_Schema,'writer');