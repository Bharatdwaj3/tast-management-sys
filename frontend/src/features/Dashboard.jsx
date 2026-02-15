/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FolderOpen, CheckCircle, Clock, AlertCircle,
  Plus, LayoutGrid, ListTodo 
} from "lucide-react";
import api from "../util/api";
import ItemGrid from "./ItemGrid";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  const projects = useSelector((state) => state.project.projects);
  const tasks = useSelector((state) => state.task.tasks);

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    done: 0
  });
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
         const statsRes = await api.get("/projects/stats");
        setStats(statsRes.data);
        
        const projectsRes = await api.get("/projects");
        setProjects(projectsRes.data);

        const tasksRes = await api.get("/tasks/");
        setTasks(tasksRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Total Tasks",
      value: stats.totalTasks,
      icon: ListTodo,
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      label: "Completed",
      value: stats.done,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              Dashboard
            </h1>
            <p className="text-foreground/60">
              Welcome back! Here's an overview of your projects and tasks.
            </p>
          </div>
          <button
            onClick={() => navigate("/projects/new")}
            className="px-6 py-3 bg-primary text-white rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all font-semibold text-sm shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            <Plus size={18} /> New Project
          </button>
          <button
      onClick={() => navigate("/tasks/new")}
      className="px-6 py-3 bg-secondary text-white rounded-xl flex items-center gap-2 hover:bg-secondary/90 transition-all font-semibold text-sm shadow-lg shadow-secondary/20 whitespace-nowrap"
    >
      <Plus size={18} /> New Task
    </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground/40 uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-1 mb-6 bg-card rounded-xl p-1.5 border border-border w-fit">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? "bg-primary text-white shadow-sm"
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            <FolderOpen size={16} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'tasks'
                ? "bg-primary text-white shadow-sm"
                : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            <ListTodo size={16} />
            Tasks
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'projects' ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Projects</h2>
                <button
                  onClick={() => navigate("/projects")}
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </button>
              </div>
              <ItemGrid 
                items={projects}
                type="project"
                loading={loading}
                emptyMessage="No projects yet"
              />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Tasks</h2>
                <button
                  onClick={() => navigate("/tasks")}
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </button>
              </div>
              <ItemGrid 
                items={tasks}
                type="task"
                loading={loading}
                emptyMessage="No tasks yet"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;