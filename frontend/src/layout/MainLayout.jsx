import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, FolderOpen, ListTodo, TrendingUp, Users } from 'lucide-react';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-white pt-32 pb-32 md:pb-64">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center px-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          Tasks<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400">
            organized.
          </span><br />
          <span className="text-white/90">Projects</span> delivered.
        </h1>

        <p className="mt-10 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
          The simplest way to manage projects, track tasks, and collaborate with your team.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-teal-600 to-indigo-600 rounded-full font-bold text-xl hover:scale-105 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/projects/new"
            className="inline-flex items-center px-10 py-5 border-2 border-teal-500/50 text-teal-400 rounded-full font-bold text-xl hover:bg-teal-950/40 hover:border-teal-400 transition-all duration-300"
          >
            Create Project →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto mt-32 md:mt-48 px-6">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
          Everything You Need
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            {
              name: "Projects",
              icon: FolderOpen,
              desc: "Organize your work into projects. Keep everything in one place.",
              color: "from-blue-400 to-cyan-400"
            },
            {
              name: "Tasks",
              icon: ListTodo,
              desc: "Break down projects into manageable tasks. Track progress easily.",
              color: "from-teal-400 to-emerald-400"
            },
            {
              name: "Team Collaboration",
              icon: Users,
              desc: "Assign tasks to team members. Work together seamlessly.",
              color: "from-purple-400 to-pink-400"
            },
          ].map((item) => (
            <div key={item.name} className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-slate-900/50 p-8 border border-slate-800 hover:border-teal-500/50 transition-all">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                <item.icon size={32} className="text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                {item.name}
              </h3>
              <p className="text-lg text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto mt-48 md:mt-64 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-20">
          Trusted by Teams Worldwide
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
          {[
            { stat: "10K+", label: "Active Teams", icon: Users },
            { stat: "50K+", label: "Projects Completed", icon: FolderOpen },
            { stat: "100K+", label: "Tasks Tracked", icon: CheckCircle },
            { stat: "24/7", label: "Support Available", icon: TrendingUp },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-center mb-4">
                <item.icon size={40} className="text-teal-400" />
              </div>
              <div className="text-5xl md:text-7xl font-black text-teal-400">{item.stat}</div>
              <p className="mt-4 text-xl text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-48 md:mt-64 px-6">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
          Stay on Track
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Track Progress", desc: "Visualize task completion with status badges", color: "from-blue-500 to-cyan-500" },
            { title: "Set Priorities", desc: "Low, Medium, High - focus on what matters", color: "from-orange-500 to-red-500" },
            { title: "Meet Deadlines", desc: "Never miss a due date with clear timelines", color: "from-green-500 to-emerald-500" },
          ].map((item) => (
            <div
              key={item.title}
              className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <div className={`w-full h-64 bg-gradient-to-br ${item.color} opacity-80 group-hover:scale-110 transition-transform duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl">
                  {item.title}
                </h3>
                <p className="text-lg text-teal-300 mt-3">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainLayout;