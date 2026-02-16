/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import api from "../util/api";
import { useSelector, useDispatch } from "react-redux"; 

export default function ProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const { user } = useSelector((state) => state.auth); 

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get("/profile/me"); 
        const profile = response.data;
        
        setFullName(profile.fullName || "");
        setUserName(profile.userName || "");
      } catch (err) {
        console.error("Failed to load profile:", err);
        alert("Could not load profile for editing");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isOpen, onClose]);

  const canSubmit = fullName.trim() && userName.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving || !canSubmit) return;

    try {
      setSaving(true);
      const updates = { fullName, userName };
      const response = await api.put("/profile/edit", updates); 
      alert("Profile updated successfully!");
      onClose();
      window.location.reload(); 
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-background w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-foreground/60" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="userName" className="block text-sm font-semibold mb-2">
              Username
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          <p className="text-xs text-foreground/50 text-center">
            Only full name and username can be changed at this time.
          </p>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold text-sm hover:bg-foreground/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !canSubmit}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                saving || !canSubmit
                  ? "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
              }`}
            >
              {saving && <Loader2 size={18} className="animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
              {!saving && <Save size={18} />}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}