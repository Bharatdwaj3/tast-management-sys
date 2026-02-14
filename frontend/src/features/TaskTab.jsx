/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Edit, Trash2, Search, X, 
  ListTodo, Clock, CheckCircle, AlertCircle, Flag
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";
import ItemGrid from "./ItemGrid";

const TaskTab = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/recent?limit=50");
      setTasks(res.data);
      
      const todo = res.data.filter(t => t.status === 'Todo').length;
      const inProgress = res.data.filter(t => t.status === 'In Progress').length;
      const done = res.data.filter(t => t.status === 'Done').length;
      
      setStats({
        total: res.data.length,
        todo,
        inProgress,
        done
      });
      setLoading(false);
    } catch (err) { 
      console.log(err);
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..." 
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
          onClick={() => navigate("/tasks/new")}
          className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all font-semibold text-sm shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Total Tasks</p>
            <ListTodo size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">To Do</p>
            <AlertCircle size={16} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">{stats.todo}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">In Progress</p>
            <Clock size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.inProgress}</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Completed</p>
            <CheckCircle size={16} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{stats.done}</p>
        </div>
      </div>

      <ItemGrid 
        items={filteredTasks}
        type="task"
        loading={loading}
        emptyMessage={searchQuery ? "No tasks match your search" : "No tasks yet"}
      />
    </div>
  );
};

export default TaskTab;