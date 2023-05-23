import Posts from '../models/Posts.js';
import User from '../models/User.js';

//CREATING A NEW POST STRUCTURE IN DB
export const createPosts = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.boy;
        const user = await User.findById(userId);
        const newPost = new Posts({
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();//SAVING THE NEW POST IN DB

        const post = await Posts.find();//TAKING ALL THE POSTS
        res.status(201).json(post)//PASSING IT TO THE FRONT END

    } catch (error) {
        res.status(404).json({ err: error.message })
    }
}


//READ
//GETTING ALL THE POSTS
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Posts.find();
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
}

//GETTING ALL THE USER'S SEPARATE POSTS
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Posts.find({ userId })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
}


//UPDATE
//UPDATING LIKES
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Posts.findById(id);//FINDING ALL THE POSTS IN THE DB
        const isLiked = await post.likes.get(userId);//IF ANY USER LIKED GET THE USER'S USER ID 

        if(isLiked) {
            post.likes.delete(userId);//DELETE LIKE IF ALREADY LIKES 
        } else {
            post.likes.set(userId, true);//ELSE ADD LIKE IF DOES NOT EXIST
        }

        const updatedPost = await Posts.findByIdAndUpdate(//UPDATING THE POSTS IN THE DB
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(isLiked)//PASSING THE UPDATAED POSTS AS RESPONSE
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
}