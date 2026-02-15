import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, FolderOpen, ListTodo, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="text-3xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Scribe
              </h3>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">
              Task Management System.<br />
              Organize projects. Track tasks. Deliver results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
           
            <div>
              <h4 className="text-primary font-semibold mb-4 uppercase tracking-wide text-sm">
                Product
              </h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
                <li><Link to="/tasks" className="hover:text-primary transition-colors">Tasks</Link></li>
                <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-4 uppercase tracking-wide text-sm">
                Resources
              </h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link to="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
                <li><Link to="/support" className="hover:text-primary transition-colors">Support</Link></li>
                <li><Link to="/api" className="hover:text-primary transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-4 uppercase tracking-wide text-sm">
                Company
              </h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>
            © {currentYear} Scribe Task Manager. All rights reserved.
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <span>Made with focus in India</span>
            
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;