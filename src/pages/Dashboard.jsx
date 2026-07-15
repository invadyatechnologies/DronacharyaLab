import { Users, BookOpen, Armchair, IndianRupee, TrendingUp, Calendar, Eye, UserPlus, BookX, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { dashboardStats as d, revenueData, dailyAttendance, seatOccupancy, bookIssueTrend } from '../data/staticData';
import { SummaryCard, SectionLabel, Card } from '../components/UI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';

const GRAD = ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)','linear-gradient(135deg, #f093fb 0%, #f5576c 100%)','linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)','linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)','linear-gradient(135deg, #fa709a 0%, #fee140 100%)','linear-gradient(135deg, #30cfd0 0%, #330867 100%)','linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)','linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'];
const tip = { background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '8px 12px', color: '#fff', fontSize: '12px' };

function GradCard({ label, value, subtitle, icon, gradient }) {
  return (
    <div className="relative overflow-hidden text-white" style={{ background: gradient, borderRadius: '4px', padding: 'clamp(8px,2vw,16px)' }}>
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
      <div className="relative z-[1]">
        <div className="flex justify-between items-start gap-1"><div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: '4px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)' }}>{icon}</div></div>
        <div style={{ marginTop: 'clamp(6px,1.5vw,12px)' }}>
          <p className="font-bold uppercase opacity-90" style={{ fontSize: 'clamp(7px,1.2vw,10px)', letterSpacing: '0.5px' }}>{label}</p>
          <p className="font-extrabold" style={{ fontSize: 'clamp(13px,2.5vw,22px)', lineHeight: 1.15, marginTop: '2px' }}>{value}</p>
          <p className="opacity-80" style={{ fontSize: 'clamp(7px,1vw,10px)', marginTop: '1px' }}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const fmt = (v) => `₹${v.toLocaleString('en-IN')}`;
  const month = `${new Date().toLocaleString('default',{month:'long'})} ${new Date().getFullYear()}`;
  const kpis = [
    { label: 'Total Students', value: d.totalStudents.toLocaleString(), subtitle: `Active: ${d.activeStudents}`, icon: <Users size={14} />, gradient: GRAD[0] },
    { label: 'Total Books', value: d.totalBooks.toLocaleString(), subtitle: `Available: ${d.availableBooks}`, icon: <BookOpen size={14} />, gradient: GRAD[1] },
    { label: 'Issued Books', value: d.issuedBooks.toLocaleString(), subtitle: `Overdue: ${d.overdueBooks}`, icon: <BookX size={14} />, gradient: GRAD[2] },
    { label: 'Monthly Income', value: fmt(d.monthlyIncome), subtitle: month, icon: <TrendingUp size={14} />, gradient: GRAD[3] },
    { label: 'Seats Occupied', value: `${d.occupiedSeats}/${d.totalSeats}`, subtitle: `Empty: ${d.emptySeats}`, icon: <Armchair size={14} />, gradient: GRAD[4] },
    { label: 'Today Attendance', value: d.todayAttendance.toString(), subtitle: `Visitors: ${d.libraryVisitorsToday}`, icon: <Calendar size={14} />, gradient: GRAD[5] },
    { label: 'Pending Fees', value: fmt(d.pendingFees), subtitle: 'Collection due', icon: <AlertTriangle size={14} />, gradient: GRAD[6] },
    { label: 'Net Profit', value: fmt(d.profit), subtitle: month, icon: <IndianRupee size={14} />, gradient: GRAD[7] },
  ];

  return (
    <div style={{paddingLeft:'10px', paddingRight:'10px'}}>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div><h1 className="font-bold text-[#0F172A]" style={{ fontSize: '0.92rem', margin: 0 }}>Dashboard</h1><p className="text-[#64748B]" style={{ fontSize: '0.62rem', margin: '1px 0 0 0' }}>Smart Digital Library Management Solution for Modern Study Centers</p></div>
        <button className="flex items-center gap-1.5 text-[#475569] font-semibold hover:bg-[#F8FAFC]" style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '0.72rem', background: '#fff' }}><RefreshCw size={12} /> Refresh</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">{kpis.map(k => <GradCard key={k.label} {...k} />)}</div>
      <div className="mt-5"><SectionLabel>📊 Quick Stats</SectionLabel><div className="grid grid-cols-2 md:grid-cols-4 gap-2"><SummaryCard label="New Admissions" value={d.newAdmissions} icon={<UserPlus size={16} />} bgColor="#EFF6FF" /><SummaryCard label="Active Students" value={d.activeStudents} icon={<CheckCircle2 size={16} />} bgColor="#ECFDF5" /><SummaryCard label="Today Collection" value={fmt(d.todayCollection)} icon={<IndianRupee size={16} />} bgColor="#FFF7ED" /><SummaryCard label="Visitors Today" value={d.libraryVisitorsToday} icon={<Eye size={16} />} bgColor="#EEF2FF" /></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
        {[
          { title: '📊 Revenue vs Expenses', sub: 'Monthly comparison', chart: <BarChart data={revenueData} barGap={2}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} /><XAxis dataKey="month" tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}K`} width={32} /><Tooltip contentStyle={tip} formatter={v=>`₹${Number(v).toLocaleString()}`} /><Bar dataKey="income" fill="#3B82F6" radius={[4,4,0,0]} /><Bar dataKey="expense" fill="#EF4444" radius={[4,4,0,0]} /></BarChart> },
          { title: '📅 Weekly Attendance', sub: 'Daily check-ins', chart: <BarChart data={dailyAttendance}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} /><XAxis dataKey="day" tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} width={28} /><Tooltip contentStyle={tip} /><Bar dataKey="present" fill="#10B981" radius={[4,4,0,0]} /></BarChart> },
          { title: '🪑 Seat Occupancy', sub: 'Hourly usage today', chart: <AreaChart data={seatOccupancy}><defs><linearGradient id="seatG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} /><XAxis dataKey="time" tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} interval="preserveStartEnd" /><YAxis tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} width={28} /><Tooltip contentStyle={tip} /><Area type="monotone" dataKey="occupied" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#seatG)" dot={{fill:'#8B5CF6',r:3,strokeWidth:2,stroke:'#fff'}} /></AreaChart> },
          { title: '📚 Book Issue Trend', sub: 'Monthly books issued', chart: <LineChart data={bookIssueTrend}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} /><XAxis dataKey="month" tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize:10,fill:'#94A3B8'}} axisLine={false} tickLine={false} width={28} /><Tooltip contentStyle={tip} /><Line type="monotone" dataKey="issued" stroke="#F59E0B" strokeWidth={2.5} dot={{fill:'#F59E0B',r:3,strokeWidth:2,stroke:'#fff'}} /></LineChart> },
        ].map(c => <Card key={c.title} className="p-4 sm:p-5"><div className="mb-3"><h3 className="font-bold text-[#0F172A]" style={{ fontSize: '0.82rem', margin: 0 }}>{c.title}</h3><p className="text-[#64748B]" style={{ fontSize: '0.62rem', margin: '2px 0 0 0' }}>{c.sub}</p></div><ResponsiveContainer width="100%" height={220}>{c.chart}</ResponsiveContainer></Card>)}
      </div>
      <div className="mt-8 pt-4 text-center" style={{ borderTop: '1px solid #E2E8F0' }}><p className="text-[#94A3B8]" style={{ fontSize: '0.62rem' }}>© {new Date().getFullYear()} Knowledge Hub Library & Study Center • Read • Learn • Grow</p></div>
    </div>
  );
}
