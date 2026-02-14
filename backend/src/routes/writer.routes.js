import { Router } from 'express';
const router = Router();
import upload from "../services/multer.service.js";


import {
    getWriters,
  getWriter,
  updateWriterProfile,
  deleteWriter,
} from "../controller/writer.controller.js";

import {checkPermission, roleMiddleware, authUser} from "../middleware/index.js";


router.get('/',
    authUser,
    roleMiddleware(['admin','writer','reader']),
    checkPermission('view_writers'),
    getWriters);
    
router.get('/:id',
    authUser, 
    roleMiddleware(['writer','admin']), 
    checkPermission('view-self'),
    getWriter);

router.put('/profile/:id',
    authUser, 
    roleMiddleware(['admin','writer']), 
    checkPermission('update_writer'), 
    upload.single('image'), 
    updateWriterProfile);
    
router.delete('/:id',
    authUser, 
    roleMiddleware(['admin','writer']), 
    checkPermission('delete_writer'), 
    deleteWriter);

export default router;