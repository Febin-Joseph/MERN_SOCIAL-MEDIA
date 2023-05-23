import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriends,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();


//READ
router.get('/:id', verifyToken, getUser)//GETTING USER
router.get('/:id/friends', verifyToken, getUserFriends)//GETTING USER FRIENDS


//UPDATE
router.patch('/:id/friendId', verifyToken, addRemoveFriends)//ADDING OR DELETING USER FRIENDS


export default router;