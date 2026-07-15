import { useState } from 'react';
import {
  LayoutDashboard, Users, BookOpen, Armchair, IndianRupee, Package, UserCog,
  UserCheck, Monitor, GraduationCap, Bell, BarChart3, Settings, ChevronDown,
  ChevronRight, Library, Newspaper, QrCode, Shield, Video, X, TrendingUp
} from 'lucide-react';

const menu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, sub: [] },
  { type: 'divider', label: 'STUDENTS' },
  { id: 'students', label: 'Students', icon: Users, sub: [
    { id: 'all-students', label: 'All Students' }, { id: 'new-admission', label: 'New Admission' },
    { id: 'membership', label: 'Membership' }, { id: 'attendance', label: 'Attendance' },
    { id: 'seat-allocation', label: 'Seat Allocation' },
  ]},
  { type: 'divider', label: 'LIBRARY' },
  { id: 'books', label: 'Books', icon: BookOpen, sub: [
    { id: 'all-books', label: 'All Books' }, { id: 'categories', label: 'Categories' },
    { id: 'issue-books', label: 'Issue Books' }, { id: 'return-books', label: 'Return Books' },
  ]},
  { id: 'seats', label: 'Seats', icon: Armchair, sub: [
    { id: 'all-seats', label: 'All Seats' }, { id: 'seat-map', label: 'Seat Map' },
  ]},
  { type: 'divider', label: 'FINANCE' },
  { id: 'fees', label: 'Fees', icon: IndianRupee, sub: [
    { id: 'fee-collection', label: 'Fee Collection' }, { id: 'pending-fees', label: 'Pending Fees' },
    { id: 'receipts', label: 'Receipts' },
  ]},
  { type: 'divider', label: 'OPERATIONS' },
  { id: 'inventory', label: 'Inventory', icon: Package, sub: [] },
  { id: 'staff', label: 'Staff', icon: UserCog, sub: [] },
  { id: 'visitors', label: 'Visitors', icon: UserCheck, sub: [] },
  { id: 'digital-library', label: 'Digital Library', icon: Monitor, sub: [] },
  { id: 'exams', label: 'Exams', icon: GraduationCap, sub: [] },
  { id: 'newspaper-magazine', label: 'News & Magazine', icon: Newspaper, sub: [] },
  { type: 'divider', label: 'REPORTS' },
  { id: 'notifications', label: 'Notifications', icon: Bell, sub: [] },
  { id: 'reports', label: 'Reports', icon: BarChart3, sub: [] },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp, sub: [] },
  { id: 'cctv', label: 'CCTV Monitoring', icon: Video, sub: [] },
  { type: 'divider', label: 'ADMIN' },
  { id: 'user-roles', label: 'User Roles', icon: Shield, sub: [] },
  { id: 'qr-features', label: 'QR Features', icon: QrCode, sub: [] },
  { id: 'settings', label: 'Settings', icon: Settings, sub: [] },
];

export default function Sidebar({ activeSection, setActiveSection, collapsed, mobileOpen, setMobileOpen }) {
  const [open, setOpen] = useState({});
  const toggle = (id) => setOpen(p => ({ ...p, [id]: !p[id] }));
  const nav = (id) => { setActiveSection(id); setMobileOpen(false); };

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 bg-white flex flex-col transition-all duration-200 ${collapsed ? 'w-[60px]' : 'w-[250px]'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ borderRight: '1px solid #E2E8F0' ,  paddingLeft:'10px', paddingRight:'10px'}}>
        <div className="h-14 flex items-center gap-2.5 px-4 shrink-0" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="w-8 h-8 shrink-0 flex items-center justify-center" style={{ borderRadius: '4px', background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}><Library className="w-[16px] h-[16px] text-white" /></div>
          {!collapsed && <div className="min-w-0"><p className="font-bold text-[#0F172A] leading-none truncate" style={{ fontSize: '0.85rem' }}>GURUKUL LIBRARY</p><p className="text-[#94A3B8] leading-none mt-0.5 truncate" style={{ fontSize: '0.55rem' }}>Library Management System</p></div>}
          {mobileOpen && <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden p-1 hover:bg-[#F1F5F9]" style={{ borderRadius: '4px' }}><X className="w-4 h-4 text-[#64748B]" /></button>}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E2E8F0 transparent'}}>
          {menu.map((item, idx) => {
            if (item.type === 'divider') {
              if (collapsed) return null;
              return <div key={`d-${idx}`} className="px-4 pt-3 pb-1"><span className="text-[#94A3B8] font-bold" style={{ fontSize: '0.55rem', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{item.label}</span></div>;
            }
            const Icon = item.icon;
            const hasSub = item.sub && item.sub.length > 0;
            const isOpen = !!open[item.id];
            const isActive = activeSection === item.id || (item.sub && item.sub.some(s => s.id === activeSection));

            return (
              <div key={item.id} className="px-2 mb-[1px]">
                <button onClick={() => hasSub ? toggle(item.id) : nav(item.id)} title={collapsed ? item.label : undefined} className="w-full flex items-center gap-2.5 transition-colors" style={{ height: '34px', padding: '0 10px', borderRadius: '4px', background: isActive ? '#FFEDD5' : 'transparent', fontSize: '0.78rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#C2410C' : '#334155' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#FFF7ED'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                  {Icon && <Icon style={{ width: 18, height: 18, color: isActive ? '#C2410C' : '#94A3B8', flexShrink: 0 }} />}
                  {!collapsed && <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {hasSub && (isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />)}
                  </>}
                </button>
                {hasSub && isOpen && !collapsed && (
                  <div className="ml-4 pl-3 mt-[2px] space-y-[1px]" style={{ borderLeft: '2px solid transparent' }}>
                    {item.sub.map(child => {
                      const active = activeSection === child.id;
                      return <button key={child.id} onClick={() => nav(child.id)} className="w-full text-left flex items-center transition-colors" style={{ height: '30px', padding: '0 10px', borderRadius: '4px', borderLeft: active ? '2px solid #C2410C' : '2px solid transparent', marginLeft: '4px', background: active ? '#FFEDD5' : 'transparent', fontSize: '0.74rem', fontWeight: active ? 700 : 400, color: active ? '#C2410C' : '#334155' }}
                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#FFF7ED'; }}
                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>{child.label}</button>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-4 py-2 shrink-0 text-center" style={{ borderTop: '1px solid #F1F5F9', background: '#F8FAFC' }}>
          <p className="text-[#94A3B8]" style={{ fontSize: '0.55rem' }}>Gurukul Library ERP v1.0</p>
        </div>
      </aside>
    </>
  );
}
