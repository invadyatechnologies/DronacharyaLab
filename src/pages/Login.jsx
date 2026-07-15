import { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Library, BookOpen, Users, GraduationCap } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@gurukullibrary.com');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    if ((email === 'admin@gurukullibrary.com' || email === 'admin') && password === 'admin123') {
      onLogin({ name: 'Rajendra Singh', email, role: 'Super Admin' });
    } else {
      setErr('Invalid credentials. Use admin@gurukullibrary.com / admin123');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center" >

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/647/192/30/table-books-chairs-library-wallpaper-preview.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark Overlay on top of image */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.28) 0%, rgba(30, 41, 59, 0.29) 40%, rgba(15, 23, 42, 0.26) 100%)',
        }}
      />

      {/* Animated bg shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />
        <div className="absolute -bottom-16 left-1/4 w-64 h-64 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }} />

        {/* Floating book icons */}
        {[
          { top: '12%', left: '8%', delay: '0s', icon: <BookOpen className="w-5 h-5" /> },
          { top: '28%', right: '12%', delay: '1.5s', icon: <Users className="w-4 h-4" /> },
          { bottom: '20%', left: '15%', delay: '3s', icon: <GraduationCap className="w-5 h-5" /> },
          { top: '65%', right: '8%', delay: '2s', icon: <Library className="w-4 h-4" /> },
          { top: '45%', left: '5%', delay: '4s', icon: <BookOpen className="w-3 h-3" /> },
        ].map((item, i) => (
          <div
            key={i}
            className="absolute text-white/[0.06]"
            style={{
              top: item.top, left: item.left, right: item.right, bottom: item.bottom,
              animation: `float ${6 + i}s ease-in-out infinite ${item.delay}`,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .login-card { animation: fadeInUp 0.4s ease-out; }
        .shimmer-text {
          background: linear-gradient(90deg, #10B981, #34D399, #10B981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[400px] mx-4 login-card" >
        <div className="overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', paddingLeft:'10px', paddingRight:'10px'}} >

          {/* ── Header ── */}
          <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ borderRadius: '4px', background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', boxShadow: '0 4px 15px rgba(59,130,246,0.4)' }}>
                <Library className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold" style={{ fontSize: '0.95rem', lineHeight: 1.2 }}>Gurukul Library</h2>
                <p className="text-white/50" style={{ fontSize: '0.6rem', letterSpacing: '0.5px' }}>LIBRARY MANAGEMENT SYSTEM</p>
              </div>
            </div>
          </div>

          {/* ── Form Body ── */}
          <div className="px-6 py-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.62rem', color: '#6EE7B7', fontWeight: 600 }}>
              <Lock className="w-3 h-3" /> Secure Login
            </div>

            <h1 className="text-white font-extrabold" style={{ fontSize: '1.5rem', lineHeight: 1.2 }}>Welcome Back</h1>
            <p className="text-white/50 mt-1" style={{ fontSize: '0.72rem' }}>Sign in to continue to your Library Dashboard</p>

            <form onSubmit={submit} className="mt-5 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-white/70 font-semibold mb-1.5" style={{ fontSize: '0.68rem', letterSpacing: '0.3px' }}>Username / Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3B82F6]" />
                  <input
                    value={email} onChange={e => setEmail(e.target.value)} type="text" required
                    placeholder="Enter email or username"
                    className="w-full outline-none text-[#0F172A] placeholder:text-[#94A3B8]"
                    style={{ height: 44, paddingLeft: 40, paddingRight: 16, fontSize: '0.82rem', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s' }}
                    onFocus={e => { e.target.style.border = '1px solid #3B82F6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)'; }}
                    onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/70 font-semibold mb-1.5" style={{ fontSize: '0.68rem', letterSpacing: '0.3px' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3B82F6]" />
                  <input
                    value={password} onChange={e => setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} required
                    placeholder="••••••••"
                    className="w-full outline-none text-[#0F172A] placeholder:text-[#94A3B8]"
                    style={{ height: 44, paddingLeft: 40, paddingRight: 48, fontSize: '0.82rem', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s' }}
                    onFocus={e => { e.target.style.border = '1px solid #3B82F6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)'; }}
                    onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-[#3B82F6]" />
                  <span className="text-white/60" style={{ fontSize: '0.68rem' }}>Remember me</span>
                </label>
                <button type="button" className="text-[#60A5FA] hover:text-[#93C5FD] font-semibold" style={{ fontSize: '0.68rem' }}>Forgot Password?</button>
              </div>

              {/* Error */}
              {err && (
                <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)', animation: 'fadeInUp 0.2s ease-out' }}>
                  <span style={{ fontSize: '0.72rem', color: '#FCA5A5' }}>⚠️ {err}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 text-white font-bold transition-all disabled:opacity-60"
                style={{
                  height: 44, fontSize: '0.82rem',
                  background: loading ? '#1E293B' : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(59,130,246,0.35)',
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 6px 25px rgba(59,130,246,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 20px rgba(59,130,246,0.35)'; }}
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing In...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Demo Creds */}
            <div className="mt-4 p-3" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)' }}>
              <p className="text-[#60A5FA] font-bold mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.5px' }}>DEMO CREDENTIALS</p>
              <div className="flex gap-4">
                <div><span className="text-white/40" style={{ fontSize: '0.6rem' }}>Email:</span> <span className="text-white/80 font-semibold" style={{ fontSize: '0.65rem' }}>admin@gurukullibrary.com</span></div>
                <div><span className="text-white/40" style={{ fontSize: '0.6rem' }}>Pass:</span> <span className="text-white/80 font-semibold" style={{ fontSize: '0.65rem' }}>admin123</span></div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 text-center">
              <p className="text-white/30" style={{ fontSize: '0.58rem', letterSpacing: '0.5px' }}>
                Powered by <span className="shimmer-text font-bold">Invadya Technologies</span>
              </p>
              <p className="text-white/20 mt-1" style={{ fontSize: '0.52rem' }}>
                Smart Digital Library Management Solution for Modern Study Centers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}