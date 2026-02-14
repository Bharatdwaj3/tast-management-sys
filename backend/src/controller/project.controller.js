import mongoose from "mongoose";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id })
            .populate('owner', 'fullName userName avatar')
            .sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.error("Cannot get projects:", error);
        res.status(500).json({ message: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        const project = await Project.findOne({ 
            _id: id, 
            owner: req.user.id 
        }).populate('owner', 'fullName userName avatar');

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const tasks = await Task.find({ project: id })
            .populate('assignedTo', 'fullName userName avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            project,
            tasks
        });
    } catch (error) {
        console.error("Cannot get project:", error);
        res.status(500).json({ message: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ 
                message: "Project title is required" 
            });
        }

        const project = new Project({
            title,
            description,
            owner: req.user.id
        });

        await project.save();

        res.status(201).json(project);
    } catch (error) {
        console.error("Create project error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updates = {};
        if (title) updates.title = title;
        if (description !== undefined) updates.description = description;

        const project = await Project.findOneAndUpdate(
            { _id: id, owner: req.user.id },
            updates,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        console.error("Update project error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.deleteMany({ project: id });
        const project = await Project.findOneAndDelete({ 
            _id: id, 
            owner: req.user.id 
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ 
            message: "Project and all associated tasks deleted successfully" 
        });
    } catch (error) {
        console.error("Delete project error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getProjectStats = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id });
        const taskStats = await Task.aggregate([
            {
                $match: {
                    project: { $in: projects.map(p => p._id) }
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        const stats = {
            totalProjects: projects.length,
            totalTasks: 0,
            todo: 0,
            inProgress: 0,
            done: 0
        };

        taskStats.forEach(stat => {
            if (stat._id === 'Todo') stats.todo = stat.count;
            if (stat._id === 'In Progress') stats.inProgress = stat.count;
            if (stat._id === 'Done') stats.done = stat.count;
        });

        stats.totalTasks = stats.todo + stats.inProgress + stats.done;

        res.status(200).json(stats);
    } catch (error) {
        console.error("Get stats error:", error);
        res.status(500).json({ message: error.message });
    }
};

export {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectStats
};