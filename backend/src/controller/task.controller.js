import mongoose from "mongoose";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

const getTasks = async (req, res) => {
  try {
    const userProjects = await Project.find({ owner: req.user.id }).select('_id');

    if (userProjects.length === 0) {
      return res.status(200).json([]); 
    }

    const projectIds = userProjects.map(p => p._id);
    let query = Task.find({ project: { $in: projectIds } })
      .populate('assignedTo', 'fullName userName avatar')
      .populate('project', 'title') 
      .sort({ createdAt: -1 });

    const limit = parseInt(req.query.limit) || 0;
    if (limit > 0) {
      query = query.limit(limit);
    }

    const tasks = await query;

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Cannot get tasks:", error);
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id)
            .populate('project', 'title owner')
            .populate('assignedTo', 'fullName userName avatar');

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findOne({ 
            _id: task.project._id, 
            owner: req.user.id 
        });

        if (!project) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error("Cannot get task:", error);
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
       console.log("Creating task with data:", req.body); 
        const { title, description, status, priority, dueDate, projectId, assignedTo } = req.body;

        if (!title || !projectId) {
            return res.status(400).json({ 
                message: "Task title and project ID are required" 
            });
        }

        const project = await Project.findOne({ 
            _id: projectId, 
            owner: req.user.id 
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const task = new Task({
            title,
            description,
            status: status || 'Todo',
            priority: priority || 'Medium',
            dueDate,
            project: projectId,
            assignedTo: assignedTo || null
        });

        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate('assignedTo', 'fullName userName avatar');

        res.status(201).json(populatedTask);
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const task = await Task.find({ project: projectId })
      .populate('assignedTo', 'fullName userName avatar')
      .populate('project', 'title')
      .sort({ createdAt: -1 });

    const project = await Project.findOne({
      _id: projectId,
      owner: req.user.id
    });

    if (!project) {
      return res.status(403).json({ message: "Not authorized to view this project's tasks" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Cannot get tasks by project:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, dueDate, assignedTo } = req.body;

        const task = await Task.findById(id).populate('project');

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findOne({ 
            _id: task.project._id, 
            owner: req.user.id 
        });

        if (!project) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updates = {};
        if (title) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status) updates.status = status;
        if (priority) updates.priority = priority;
        if (dueDate !== undefined) updates.dueDate = dueDate;
        if (assignedTo !== undefined) updates.assignedTo = assignedTo;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        ).populate('assignedTo', 'fullName userName avatar');

        res.json(updatedTask);
    } catch (error) {
        console.error("Update task error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id).populate('project');

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findOne({ 
            _id: task.project._id, 
            owner: req.user.id 
        });

        if (!project) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Task.findByIdAndDelete(id);

        res.status(200).json({ 
            message: "Task deleted successfully" 
        });
    } catch (error) {
        console.error("Delete task error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getTaskStats = async (req, res) => {
  try {
    const userProjects = await Project.find({ owner: req.user.id }).select('_id');

    if (userProjects.length === 0) {
      return res.status(200).json({ totalTasks: 0, todo: 0, inProgress: 0, done: 0 });
    }

    const projectIds = userProjects.map(p => p._id);

    const stats = await Task.aggregate([
      { $match: { project: { $in: projectIds } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const result = { totalTasks: 0, todo: 0, inProgress: 0, done: 0 };
    stats.forEach(s => {
      if (s._id === 'Todo') result.todo = s.count;
      if (s._id === 'In Progress') result.inProgress = s.count;
      if (s._id === 'Done') result.done = s.count;
      result.totalTasks += s.count;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Cannot get task stats:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
    getTasks,
    getTask,
    getTaskStats,
    createTask,
    updateTask,
    deleteTask,
    getTasksByProject
};