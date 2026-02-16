/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ItemGrid } from "../features/index";
import { Filter, TrendingUp, Clock, Star, FolderOpen, ListTodo } from "lucide-react";
import api from "../util/api";

export default function Explore() {

  const [selectedType, setSelectedType] = useState('projects'); 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let endpoint = selectedType === 'projects' ? '/projects' : '/tasks/recent';
        const res = await api.get(endpoint);
        
        let filteredData = res.data;
        
        if (selectedFilter === 'recent') {
          filteredData = filteredData.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (selectedFilter === 'featured') {
          filteredData = filteredData.filter(item => item.featured);
        }
        
        setItems(filteredData);
      } catch (err) {
        console.error(`Failed to fetch ${selectedType}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedType, selectedFilter]);


  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'fiction', label: 'Fiction' },
    { id: 'technology', label: 'Technology' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'business', label: 'Business' },
    { id: 'science', label: 'Science' },
     { id: 'history', label: 'history' }
  ];

  const filters = [
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pt-24 pb-16">
        <div className="max-w-350 mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
              Explore Stories
            </h1>
            <p className="text-foreground/60 text-lg">
              Discover amazing content from writers around the world
            </p>
          </motion.div>
        </div>

        <div className="max-w-350 mx-auto px-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground/50 shrink-0">
                <Filter size={16} />
                <span>Sort by:</span>
              </div>
              <div className="flex gap-2">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                        selectedFilter === filter.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'bg-card border border-border text-foreground/70 hover:border-primary hover:text-primary'
                      }`}
                    >
                      <Icon size={14} />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-secondary/10 border border-secondary text-secondary'
                      : 'bg-card border border-border text-foreground/70 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6">
          <ItemGrid 
            items={items}
            type={selectedType === 'projects' ? 'project' : 'task'}
            limit={20}
            loading={loading}
            emptyMessage={`No ${selectedType} found`}
          />
        </div>
      </div>
    </main>
  );
}