import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            text: {
                type: String,
                required: true
            }
        }],
        hashtags: [{
            type: String,
            default: "#LiteSocial"
        }]
    }
})