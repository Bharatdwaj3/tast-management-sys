/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import api from "../util/api";
import { useSelector } from "react-redux";

export default function NewStory({ type = "project" }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useSelector((state) => state.avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(`${type === "project" ? "Project" : "Task"} title is required`);
      return;
    }

    setSaving(true);
    try {
      if (type === "project") {
        await api.post("/projects", { title, description });
        navigate("/projects");
      } else {
        await api.post("/tasks", { 
          title, 
          description,
          status: "Todo",
          priority: "Medium"
        });
        navigate("/tasks");
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to create ${type}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-foreground/5 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-black">New {type === "project" ? "Project" : "Task"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder={`${type === "project" ? "Project" : "Task"} title...`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl bg-transparent border-b border-border focus:border-primary outline-none pb-2"
            required
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            className="w-full bg-card border border-border rounded-xl p-4 focus:border-primary outline-none"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-border rounded-lg hover:bg-foreground/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Creating..." : `Create ${type === "project" ? "Project" : "Task"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const CreateProject = () => <NewStory type="project" />;
export const CreateTask = () => <NewStory type="task" />;

