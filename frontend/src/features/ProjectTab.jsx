/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Edit, Trash2, Search, X, 
  FolderOpen, Clock, CheckCircle, AlertCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";
import ItemGrid from "./ItemGrid";

const ProjectTab = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
      setStats({
        total: res.data.length,
        active: res.data.length, 
        completed: 0
      });
      setLoading(false);
    } catch (err) { 
      console.log(err);
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pt-40 px-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..." 
            className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button 
          onClick={() => navigate("/projects/new")}
          className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all font-semibold text-sm shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Total Projects</p>
            <FolderOpen size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Active</p>
            <Clock size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.active}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Completed</p>
            <CheckCircle size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
      </div>

      <ItemGrid 
        items={filteredProjects}
        type="project"
        loading={loading}
        emptyMessage={searchQuery ? "No projects match your search" : "No projects yet"}
      />
    </div>
  );
};

export default ProjectTab;