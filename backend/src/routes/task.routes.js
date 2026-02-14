import { Router } from 'express';
const router = Router();

import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controller/task.controller.js';

import { authUser } from "../middleware/index.js";

router.use(authUser);

router.get('/project/:projectId', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;