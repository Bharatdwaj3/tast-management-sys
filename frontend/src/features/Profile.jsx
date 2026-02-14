/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { clearUser } from "../store/avatarSlice";

import {
  User,
  Mail,
  Calendar,
  LogOut,
  Settings,
  Edit3,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Users,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../util/api";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user: avatarUser } = useSelector((state) => state.avatar);
  const { user: authUser } = useSelector((state) => state.auth);
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    if (!authUser) {
      navigate('/unauthorized');
    }
  }, [authUser, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        if (avatarUser) {
          setProfile(avatarUser);
        } else {
          const { data } = await api.get("/profile/me");
          setProfile(data);
        }
        
        const projectsRes = await api.get("/projects");
        const tasksRes = await api.get("/tasks/stats"); 
        
        setStats({
          totalProjects: projectsRes.data.length,
          totalTasks: tasksRes.data.totalTasks || 0,
          completedTasks: tasksRes.data.done || 0,
          pendingTasks: (tasksRes.data.todo || 0) + (tasksRes.data.inProgress || 0)
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setLoading(false);
      }
    };

    if (authUser) {
      fetchProfile();
    }
  }, [avatarUser, authUser]);

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
      dispatch(logout());
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitial = (name) => name ? name[0].toUpperCase() : 'U';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-lg p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl ring-4 ring-background shadow-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.fullName || profile.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                    {getInitial(profile?.userName)}
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate("/profile/edit")}
                className="absolute -bottom-3 -right-3 p-3 bg-primary rounded-xl text-white shadow-lg hover:scale-110 transition-transform"
              >
                <Edit3 size={18} />
              </button>
            </div>

            <div className="grow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                      {profile?.fullName || profile?.userName}
                    </h1>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full">
                      Member
                    </span>
                  </div>
                  <p className="text-foreground/50 text-sm mb-4">
                    @{profile?.userName}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/settings")}
                  className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                >
                  <Settings size={20} className="text-foreground/40" />
                </button>
              </div>

              {profile?.bio && (
                <p className="text-foreground/70 leading-relaxed mb-6 max-w-2xl">
                  {profile.bio}
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.totalProjects}</p>
                    <p className="text-xs text-foreground/50">Projects</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <AlertCircle size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.pendingTasks}</p>
                    <p className="text-xs text-foreground/50">Pending</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle size={18} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.completedTasks}</p>
                    <p className="text-xs text-foreground/50">Completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-foreground/5 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{stats.totalTasks}</p>
                    <p className="text-xs text-foreground/50">Total Tasks</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/projects/new")}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <Plus size={18} /> New Project
                </button>
                <button
                  onClick={() => navigate(`/profile/${profile?._id}`)}
                  className="px-6 py-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors font-semibold text-sm"
                >
                  View Public Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-1 mb-8 bg-card rounded-xl p-1.5 border border-border w-fit">
          {["Overview", "Projects", "Activity"].map((label, i) => (
            <button
              key={label}
              onClick={() => setTab(i)}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                tab === i
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {tab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-sm font-bold text-foreground/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={16} /> About
                </h4>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {profile?.bio || "No bio added yet."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-sm font-bold text-foreground/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar size={16} /> Member Since
                </h4>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Recently"}
                </p>
                <p className="text-sm text-foreground/50">
                  Managing projects and tasks
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-linear-to-br from-accent/5 to-primary/5 border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h4 className="text-sm font-bold text-foreground/40 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award size={16} /> Achievements
                </h4>
                <p className="text-2xl font-bold text-foreground mb-1">
                  Getting Started
                </p>
                <p className="text-sm text-foreground/50">
                  Complete tasks to earn badges!
                </p>
              </motion.div>
            </div>
          )}

          {tab === 1 && (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} className="text-foreground/20" />
                </div>
                <h3 className="text-xl font-bold mb-2">Your Projects</h3>
                <p className="text-foreground/50 mb-6">
                  View and manage all your projects here.
                </p>
                <button
                  onClick={() => navigate("/projects")}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm"
                >
                  Go to Projects
                </button>
              </div>
            </div>
          )}

          {tab === 2 && (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-foreground/20" />
                </div>
                <h3 className="text-xl font-bold mb-2">Recent Activity</h3>
                <p className="text-foreground/50">
                  Your task activity will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-8 py-4 bg-card border border-border rounded-xl text-primary hover:bg-primary hover:text-white transition-all font-semibold text-sm flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;