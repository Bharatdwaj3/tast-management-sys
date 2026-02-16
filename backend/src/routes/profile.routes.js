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


router.get('/me', authUser, getMyProfile);          
router.put('/edit', authUser, updateProfile);          
router.delete('/del', authUser, deleteMyProfile);   
router.get('/members/all', authUser, getMembers);   

router.get('/:id', getProfile);  

export default router;