import { Router } from 'express';
const router = Router();

import {
    getProfile,
    getMyProfile,
    updateProfile,
    deleteMyProfile,
    getMembers
} from '../controller/profile.controller.js';

import { authUser } from "../middleware/index.js";

router.get('/:id', getProfile);  

router.get('/me', authUser, getMyProfile);          
router.put('/me', authUser, updateProfile);          
router.delete('/me', authUser, deleteMyProfile);   
router.get('/members/all', authUser, getMembers);   

export default router;