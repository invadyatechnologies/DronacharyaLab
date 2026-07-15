import { Menu, Search, Bell, Settings, ChevronDown, LogOut, User, X } from 'lucide-react';
import { useState } from 'react';

export default function Header({ title, onMenuClick, onToggleSidebar, user, onLogout }) {
  const [profile, setProfile] = useState(false);
  const [q, setQ] = useState('');
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'RS';
  const displayName = user?.name?.split(' ')[0] || 'Admin';

  return (
    <>
      <header className="h-14 flex items-center px-4 sticky top-0 z-30" style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-2 flex-1 min-w-0 mr-3">
          <button onClick={onMenuClick} className="lg:hidden w-8 h-8 flex items-center justify-center hover:bg-[#F1F5F9]" style={{ borderRadius: '4px' }}><Menu className="w-[18px] h-[18px] text-[#64748B]" /></button>
          <button onClick={onToggleSidebar} className="hidden lg:flex w-8 h-8 items-center justify-center hover:bg-[#F1F5F9]" style={{ borderRadius: '4px' }}><Menu className="w-[18px] h-[18px] text-[#64748B]" /></button>
          <h2 className="font-bold text-[#0F172A] truncate" style={{ fontSize: '0.88rem' }}>{title}</h2>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden md:flex items-center h-[34px] w-56 px-2.5 gap-1.5" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 0 }}>
            <Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
            <input className="bg-transparent outline-none w-full text-[#475569] placeholder:text-[#CBD5E1]" style={{ fontSize: '0.78rem' }} placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
            {q && <button onClick={() => setQ('')}><X className="w-3 h-3 text-[#94A3B8]" /></button>}
          </div>
          <button className="relative w-8 h-8 flex items-center justify-center hover:bg-[#F1F5F9]" style={{ borderRadius: '4px' }}><Bell className="w-[16px] h-[16px] text-[#64748B]" /><span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] bg-[#EF4444] rounded-full" /></button>
          <button className="w-8 h-8 hidden sm:flex items-center justify-center hover:bg-[#F1F5F9]" style={{ borderRadius: '4px' }}><Settings className="w-[16px] h-[16px] text-[#64748B]" /></button>

          {/* Profile Dropdown */}
          <div className="relative ml-1">
            <button onClick={() => setProfile(!profile)} className="flex items-center gap-1.5 h-8 px-2 hover:bg-[#F1F5F9]" style={{ borderRadius: '4px' }}>
              <div className="w-6 h-6 flex items-center justify-center text-white font-bold" style={{ borderRadius: '4px', background: 'linear-gradient(135deg, #10B981, #059669)', fontSize: '0.55rem' }}>{initials}</div>
              <span className="hidden sm:block text-[#475569] font-medium" style={{ fontSize: '0.78rem' }}>{displayName}</span>
              <ChevronDown className="w-3 h-3 text-[#94A3B8] hidden sm:block" />
            </button>
            {profile && <>
              <div className="fixed inset-0 z-40" onClick={() => setProfile(false)} />
              <div className="absolute right-0 top-full mt-1 w-52 bg-white py-1 z-50" style={{ border: '1px solid #E2E8F0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                {/* User Info */}
                <div className="px-3.5 py-2.5" style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <p className="text-[#0F172A] font-bold" style={{ fontSize: '0.78rem' }}>{user?.name || 'Admin'}</p>
                  <p className="text-[#94A3B8]" style={{ fontSize: '0.62rem' }}>{user?.email || 'admin@gurukullibrary.com'}</p>
                  <span className="inline-flex items-center gap-1 mt-1 font-semibold" style={{ fontSize: '0.55rem', padding: '1px 6px', background: '#EFF6FF', color: '#1D4ED8' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3B82F6' }} />
                    {user?.role || 'Super Admin'}
                  </span>
                </div>
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#475569] hover:bg-[#F8FAFC]" style={{ fontSize: '0.78rem' }}><User className="w-3.5 h-3.5 text-[#94A3B8]" /> My Profile</button>
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#475569] hover:bg-[#F8FAFC]" style={{ fontSize: '0.78rem' }}><Settings className="w-3.5 h-3.5 text-[#94A3B8]" /> Settings</button>
                <div className="my-1" style={{ borderTop: '1px solid #F1F5F9' }} />
                <button onClick={() => { setProfile(false); setLogoutConfirm(true); }} className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[#DC2626] hover:bg-[#FEF2F2]" style={{ fontSize: '0.78rem' }}><LogOut className="w-3.5 h-3.5" /> Logout</button>
              </div>
            </>}
          </div>
        </div>
      </header>

      {/* ── Logout Confirmation Modal ── */}
      {logoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setLogoutConfirm(false)}>
          <div className="bg-white w-full" style={{ maxWidth: 360, border: '1px solid #E2E8F0', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', animation: 'fadeInUp 0.2s ease-out' }} onClick={e => e.stopPropagation()}>
            <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="p-5 text-center">
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center" style={{ background: '#FEF2F2', borderRadius: '50%' }}>
                <LogOut className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-[#0F172A] font-bold" style={{ fontSize: '0.92rem' }}>Logout Confirm?</h3>
              <p className="text-[#64748B] mt-1" style={{ fontSize: '0.74rem' }}>Are you sure you want to sign out from <strong className="text-[#0F172A]">Gurukul Library</strong>?</p>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setLogoutConfirm(false)} className="flex-1 text-[#475569] font-semibold hover:bg-[#F8FAFC]" style={{ height: 38, fontSize: '0.78rem', border: '1px solid #E2E8F0' }}>Cancel</button>
                <button onClick={() => { setLogoutConfirm(false); onLogout && onLogout(); }} className="flex-1 bg-[#DC2626] text-white font-semibold hover:bg-[#B91C1C] flex items-center justify-center gap-1.5" style={{ height: 38, fontSize: '0.78rem' }}>
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
