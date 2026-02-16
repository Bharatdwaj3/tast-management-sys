/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import api from "../util/api";
import { useSelector } from "react-redux";

export default function NewStory({ type = "project" }) {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [status, setStatus] = useState("Todo");           
  const [priority, setPriority] = useState("Medium");     
  const [dueDate, setDueDate] = useState("");
  
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  const { user } = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (!isEditing) return;

    const fetchItem = async () => {
      try {
        const endpoint = type === "project" ? `/projects/${id}` : `/tasks/${id}`;
        const response = await api.get(endpoint);
        const item = type === "project" ? response.data.project : response.data;
        
        setTitle(item.title || "");
        setDescription(item.description || "");
        
        
        if (type === "task") {
          setStatus(item.status || "Todo");
          setPriority(item.priority || "Medium");
          setDueDate(item.dueDate ? item.dueDate.split('T')[0] : "");
          setSelectedProjectId(item.project?._id || item.project || "");
        }
      } catch (err) {
        console.error("Failed to load item:", err);
        alert(`Could not load ${type} for editing`);
        navigate(`/${type}s`);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, isEditing, type, navigate]);


  useEffect(() => {
    if (type !== "task") return;

    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await api.get("/projects");
        setProjects(response.data || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
        alert("Could not load your projects");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [type]);

  const canSubmit = 
    title.trim() && 
    (type !== "task" || selectedProjectId.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!canSubmit) return;

    setSaving(true);
    try {
      if (isEditing) {
        const endpoint = type === "project" ? `/projects/${id}` : `/tasks/${id}`;
        const payload = type === "project" 
          ? { title, description }
          : { title, description, status, priority, dueDate: dueDate || undefined };
        
        await api.put(endpoint, payload);
        navigate(`/${type}s`);
      } else {
        if (type === "project") {
          await api.post("/projects", { title, description });
          navigate("/projects");
        } else {
          await api.post("/tasks", { 
            title, 
            description,
            projectId: selectedProjectId, 
            status,                         
            priority,                       
            dueDate: dueDate || undefined   
          });
          navigate("/tasks");
        }
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to ${isEditing ? "update" : "create"} ${type}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingProjects) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary" />
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  const noProjects = type === "task" && projects.length === 0 && !isEditing;

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-foreground/5 rounded-lg border border-border">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black">
            {isEditing ? "Edit" : "New"} {type === "project" ? "Project" : "Task"}
          </h1>
        </div>

        {noProjects && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
            <p className="text-yellow-600 font-semibold">Create a project first before adding tasks.</p>
            <button
              onClick={() => navigate("/projects/new")}
              className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Create Project
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-8">
          
          <div>
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              {type === "project" ? "Project" : "Task"} Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder={`Enter ${type} title...`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

         
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              placeholder={`Describe the ${type}...`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          
          {type === "task" && (
            <>
              
               <div>
                <label htmlFor="project" className="block text-sm font-semibold mb-2">
                  Project *
                </label>
                <select
                  id="project"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                  disabled={isEditing} 
                >
                  <option value="" disabled>
                    Select a project
                  </option>
                  {projects.map((proj) => (
                    <option key={proj._id} value={proj._id}>
                      {proj.title}
                    </option>
                  ))}
                </select>
                {isEditing && (
                  <p className="text-xs text-foreground/50 mt-1">
                    Project cannot be changed when editing
                  </p>
                )}
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                
                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-semibold mb-2">
                  Due Date (Optional)
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </>
          )}

          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold text-sm hover:bg-foreground/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !canSubmit || noProjects}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                saving || !canSubmit || noProjects
                  ? "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
              }`}
            >
              {saving && <Loader2 size={18} className="animate-spin" />}
              {saving 
                ? `${isEditing ? "Saving..." : "Creating..."}` 
                : isEditing ? "Save Changes" : `Create ${type === "project" ? "Project" : "Task"}`}
              {!saving && <Save size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const CreateProject = () => <NewStory type="project" />;
export const CreateTask = () => <NewStory type="task" />;