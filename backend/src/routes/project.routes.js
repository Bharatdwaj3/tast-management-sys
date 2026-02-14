import { Router } from 'express';
const router = Router();

import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectStats
} from '../controller/project.controller.js';

import { authUser } from "../middleware/index.js";

router.use(authUser);

router.get('/', getProjects);
router.get('/stats', getProjectStats);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;