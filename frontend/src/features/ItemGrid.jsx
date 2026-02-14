/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Clock, Tag, ArrowRight, 
  FolderOpen, CheckCircle, AlertCircle,
  Calendar, Flag
} from 'lucide-react';

const ItemGrid = ({ 
  items = [], 
  type = 'project', 
  onItemClick,
  limit = 20,
  loading = false,
  emptyMessage = "No items found",
  customCard 
}) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      navigate(`/${type}s/${item._id}`);
    }
  };

  const statusColors = {
    'Todo': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Done': 'bg-green-500/10 text-green-500 border-green-500/20'
  };

  const priorityColors = {
    'Low': 'bg-gray-500/10 text-gray-500',
    'Medium': 'bg-orange-500/10 text-orange-500',
    'High': 'bg-red-500/10 text-red-500'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="w-full max-w-350 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-xl h-75 animate-pulse">
              <div className="h-32 bg-foreground/5 rounded-t-xl" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-foreground/5 rounded w-3/4" />
                <div className="h-3 bg-foreground/5 rounded w-1/2" />
                <div className="h-3 bg-foreground/5 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-4">
          {type === 'project' ? (
            <FolderOpen size={32} className="text-foreground/20" />
          ) : (
            <CheckCircle size={32} className="text-foreground/20" />
          )}
        </div>
        <h3 className="text-lg font-bold mb-2">{emptyMessage}</h3>
        <p className="text-foreground/50 text-sm">
          Get started by creating your first {type}.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-350 mx-auto">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr"
      >
        {items.slice(0, limit).map((item, index) => (
          <motion.article 
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-card border border-border rounded-xl group cursor-pointer flex flex-col h-full hover:border-primary/50 transition-all"
            onClick={() => handleClick(item)}
          >
            {customCard ? (
              customCard(item)
            ) : (
              <>
                <div className={`p-5 border-b border-border ${
                  type === 'project' 
                    ? 'bg-gradient-to-r from-primary/5 to-transparent' 
                    : `bg-gradient-to-r ${
                        item.priority === 'High' ? 'from-red-500/5' :
                        item.priority === 'Medium' ? 'from-orange-500/5' :
                        'from-gray-500/5'
                      } to-transparent`
                }`}>
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.title || 'Untitled'}
                    </h3>
                    
                    {type === 'task' && item.status && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        statusColors[item.status] || 'bg-foreground/10 text-foreground/60'
                      }`}>
                        {item.status}
                      </span>
                    )}
                  </div>

                  {type === 'task' && item.priority && (
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                        priorityColors[item.priority] || 'bg-foreground/10 text-foreground/60'
                      }`}>
                        <Flag size={10} />
                        {item.priority} Priority
                      </span>
                    </div>
                  )}
                </div>

              
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {item.description || `No description available for this ${type}.`}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-background flex-shrink-0">
                          {type === 'project' ? (
                            <FolderOpen size={12} className="text-primary" />
                          ) : (
                            <User size={12} className="text-primary" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-foreground/70 truncate">
                          {type === 'project' 
                            ? item.owner?.fullName || 'Owner'
                            : item.assignedTo?.fullName || 'Unassigned'}
                        </span>
                      </div>

                      <ArrowRight 
                        size={16} 
                        className="text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" 
                      />
                    </div>

                    <div className="flex items-center gap-3 text-xs text-foreground/40">
                      {type === 'task' && item.dueDate && (
                        <>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={11} />
                            <span>Due {formatDate(item.dueDate)}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-foreground/20" />
                        </>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
};

export default ItemGrid;