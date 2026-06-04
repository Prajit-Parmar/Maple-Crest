'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiHome, HiCollection, HiOfficeBuilding, HiCalendar, HiMail, HiChartBar, HiLogout, HiMenu, HiX } from 'react-icons/hi';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: HiChartBar },
  { href: '/admin/projects', label: 'Projects', icon: HiOfficeBuilding },
  { href: '/admin/rentals', label: 'Rentals', icon: HiHome },
  { href: '/admin/viewings', label: 'Viewings', icon: HiCalendar },
  { href: '/admin/leads', label: 'Leads', icon: HiMail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-dark-2 flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 glass border-r border-gold/10 transform transition-transform duration-300 lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gold/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
              <span className="text-dark font-bold">MC</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-[10px] text-gold tracking-wider uppercase">Maple Crest</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-gold hover:bg-gold/5 transition-all" onClick={() => setIsSidebarOpen(false)}>
              <link.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-8 cursor-pointer">
            <HiLogout className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-gold/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-white cursor-pointer">
              <HiMenu size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-gold transition-colors">View Site →</Link>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
