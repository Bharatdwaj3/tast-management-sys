import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, LayoutDashboard, FolderOpen, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUser, clearUser } from '../store/avatarSlice';
import api from '../util/api';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.avatar);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (localStorage.getItem('accessToken') || document.cookie.includes('accessToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
      dispatch(clearUser());
      setIsMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getInitial = (name) => name ? name[0].toUpperCase() : 'U';

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="text-2xl font-black tracking-tight text-foreground hover:text-primary transition-colors"
          >
            TaskFlow
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/dashboard" 
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link 
              to="/projects" 
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
            >
              <FolderOpen size={16} />
              Projects
            </Link>
            <Link 
              to="/tasks" 
              className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
            >
              <ListTodo size={16} />
              Tasks
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - you can implement project/task search later */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-xl hover:border-primary/30 transition-colors group">
              <Search size={18} className="text-foreground/40 group-hover:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none w-48"
              />
            </div>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="sm:hidden p-2 hover:bg-foreground/5 rounded-lg transition-colors"
            >
              <Search size={20} className="text-foreground/60" />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-foreground/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-background font-bold text-sm text-primary">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.userName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitial(user.userName)
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-semibold text-foreground">
                    {user.userName}
                  </span>
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-border bg-foreground/[0.02]">
                          <p className="font-semibold text-foreground text-sm">{user.fullName || user.userName}</p>
                          <p className="text-xs text-foreground/50">@{user.userName}</p>
                        </div>

                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors"
                          >
                            <User size={16} />
                            My Profile
                          </Link>
                          
                          <Link
                            to="/projects/new"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors md:hidden"
                          >
                            <FolderOpen size={16} />
                            New Project
                          </Link>
                          
                          <Link
                            to="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors md:hidden"
                          >
                            <LayoutDashboard size={16} />
                            Dashboard
                          </Link>
                          
                          <Link
                            to="/projects"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors md:hidden"
                          >
                            <FolderOpen size={16} />
                            Projects
                          </Link>
                          
                          <Link
                            to="/tasks"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors md:hidden"
                          >
                            <ListTodo size={16} />
                            Tasks
                          </Link>
                        </div>

                        <div className="border-t border-border py-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-primary/5 transition-colors w-full"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-semibold text-sm shadow-lg shadow-primary/20"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-foreground/5 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-foreground/60" />
              ) : (
                <Menu size={24} className="text-foreground/60" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden pb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-foreground/5 border border-border rounded-xl">
                <Search size={18} className="text-foreground/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none flex-grow"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 hover:bg-foreground/5 rounded transition-colors"
                >
                  <X size={16} className="text-foreground/40" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && !user && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border py-4 overflow-hidden"
            >
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors rounded-lg"
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors rounded-lg"
              >
                Projects
              </Link>
              <Link
                to="/tasks"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-foreground/70 hover:bg-foreground/5 hover:text-primary transition-colors rounded-lg"
              >
                Tasks
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;