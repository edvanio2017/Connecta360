import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import {
  LayoutDashboard,
  Megaphone,
  GitMerge,
  Users,
  FileText,
  Activity,
  BarChart3,
  Settings,
  CreditCard,
  Key,
  Bell,
  Search,
  Menu,
  BookOpen,
  X
} from 'lucide-react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Painel', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Campanhas', path: '/campaigns', icon: Megaphone },
    { name: 'Construtor de Jornada', path: '/journey', icon: GitMerge },
    { name: 'Contactos', path: '/contacts', icon: Users },
    { name: 'Modelos', path: '/templates', icon: FileText },
    { name: 'Logs e Eventos', path: '/logs', icon: Activity },
    { name: 'Análises', path: '/analytics', icon: BarChart3 },
    { name: 'Documentação', path: '/docs', icon: BookOpen },
    { name: 'Canais', path: '/settings', icon: Settings },
    { name: 'Faturação', path: '/billing', icon: CreditCard },
    { name: 'Chaves API', path: '/api-keys', icon: Key },
  ];

  const currentPageName = navigation.find(n => n.path === location.pathname)?.name || 'Connecta360';

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 lg:static lg:flex lg:flex-col
          ${(isSidebarOpen || isMobileMenuOpen) ? 'w-64' : 'w-20'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-all duration-300 bg-slate-900 text-white flex flex-col
        `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 flex-shrink-0">
          <Logo variant="light" showText={isSidebarOpen || isMobileMenuOpen} />
          {isMobileMenuOpen && (
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center px-3 py-2.5 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                  `}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  <item.icon className={`h-5 w-5 ${(isSidebarOpen || isMobileMenuOpen) ? 'mr-3' : 'mx-auto'}`} />
                  {(isSidebarOpen || isMobileMenuOpen) && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-800 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium">JD</span>
            </div>
            {(isSidebarOpen || isMobileMenuOpen) && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-slate-400 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileMenuOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-lg lg:text-xl font-semibold text-gray-800 truncate">
              {currentPageName}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="relative hidden sm:block">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 lg:w-64"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
