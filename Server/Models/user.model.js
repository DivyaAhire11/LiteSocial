import { Schema, model } from "mongoose";


const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   userName: {
      type: String,
      required: true,
      unique: true
   },
   userInfo: {
      bio: {
         type: String,
         default: "User of LiteSocial"
      },
      location: {
         type: String
      },
      userProfile: {
         type: String,
         default:"https://preview.redd.it/instagram-default-user-profile-pic-flip-flops-v0-clnilflfeg4d1.jpg?width=230&format=pjpg&auto=webp&s=e5c920f218f52a77c28abc5175c8db29dfa0d219"
      }
   },
   posts:[{
      type:Schema.Types.ObjectId,
      ref:"Posts"
   }]
})

const User = model("User", userSchema)
export default User