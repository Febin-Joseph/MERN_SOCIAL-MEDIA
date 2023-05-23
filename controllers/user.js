import User from '../models/User.js';

//READ
//GETTING THE USER
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//GETTING USER FRIENDS
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);//TAKEN THE USER NEED TO TAKE THE USER'S FRIENDS

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occuption, location, picturePath }) => {
                return { _id, firstname, lastname, occuption, location, picturePath }
            }
        )
        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


//UPDATE
//ADD FRIENDS AND REMOVE FRIENDS
export const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await user.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occuption, location, picturePath }) => {
                return { _id, firstname, lastname, occuption, location, picturePath }
            }
        )
        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}