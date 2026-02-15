/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Flag,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import api from "../util/api";

const ItemDetails = ({ 
  type = 'project', 
  fetchItem,
  onDelete,
  onEdit,
  customSections 
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (fetchItem) {
          data = await fetchItem(id);
        } else {
          const res = await api.get(`/${type}s/${id}`);
          data = res.data;
        }
        setItem(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate(`/${type}s`, { replace: true });
      }
    };
    fetchData();
  }, [id, type, navigate, fetchItem]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (onDelete) {
          await onDelete(id);
        } else {
          await api.delete(`/${type}s/${id}`);
        }
        navigate(`/${type}s`);
      } catch (err) {
        console.error(`Failed to delete ${type}:`, err);
      }
    }
  };

  const statusColors = {
    'Todo': 'bg-yellow-500/10 text-yellow-500',
    'In Progress': 'bg-blue-500/10 text-blue-500',
    'Done': 'bg-green-500/10 text-green-500'
  };

  const priorityColors = {
    'Low': 'bg-gray-500/10 text-gray-500',
    'Medium': 'bg-orange-500/10 text-orange-500',
    'High': 'bg-red-500/10 text-red-500'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-semibold text-foreground/70 hover:text-primary hover:border-primary transition-all mb-6"
        >
          <ArrowLeft size={16} /> Back to {type}s
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
        >
          <div className={`p-8 md:p-12 border-b border-border ${
            type === 'project' 
              ? 'bg-gradient-to-r from-primary/5 to-transparent'
              : item?.priority === 'High' ? 'bg-gradient-to-r from-red-500/5 to-transparent' :
                item?.priority === 'Medium' ? 'bg-gradient-to-r from-orange-500/5 to-transparent' :
                'bg-gradient-to-r from-gray-500/5 to-transparent'
          }`}>
            {type === 'task' && (
              <div className="flex gap-3 mb-6">
                {item?.status && (
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[item.status]}`}>
                    <CheckCircle size={12} />
                    {item.status}
                  </span>
                )}
                {item?.priority && (
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${priorityColors[item.priority]}`}>
                    <Flag size={12} />
                    {item.priority} Priority
                  </span>
                )}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-6">
              {item?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-card">
                  <User size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {type === 'project' 
                      ? item?.owner?.fullName || 'Owner'
                      : item?.assignedTo?.fullName || 'Unassigned'}
                  </p>
                  <p className="text-xs text-foreground/40">
                    {type === 'project' ? 'Project Owner' : 'Assigned To'}
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-border" />

              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>
                  Created {new Date(item?.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {type === 'task' && item?.dueDate && (
                <>
                  <div className="w-px h-8 bg-border" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>
                      Due {new Date(item.dueDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => onEdit ? onEdit(item) : navigate(`/${type}s/${id}/edit`)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary bg-primary/10 text-primary hover:bg-primary/20 transition-all text-sm font-medium"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-medium"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-lg leading-relaxed text-foreground/80">
              {item?.description || `No description provided for this ${type}.`}
            </p>
          </div>

          {customSections && customSections(item)}
        </motion.article>
      </div>
    </div>
  );
};

export const ProjectDetails = () => <ItemDetails type="project" />;
export const TaskDetails = () => <ItemDetails type="task" />;

export default ItemDetails;