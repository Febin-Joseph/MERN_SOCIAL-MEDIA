import mongoose from "mongoose"

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            require: true
        },
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean
        },
        comments: [{
            type: String
          }]
          
    }, { timeStamp: true }
);

const Posts = mongoose.model('Post', postSchema)

export default Posts