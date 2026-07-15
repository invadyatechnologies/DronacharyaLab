import { useState } from 'react';
import { Download, FileText, Users, BookOpen, IndianRupee, Calendar } from 'lucide-react';
import { Card, ToolbarBtn, Modal } from '../components/UI';
export default function ReportsPage() {
  const [preview, setPreview] = useState(null);
  const S = [{t:'👨‍🎓 Student Reports',i:<Users className="w-4 h-4 text-[#3B82F6]" />,r:['New Admissions','Active Members','Inactive Members','Expired Membership'],b:'#EFF6FF'},{t:'📚 Book Reports',i:<BookOpen className="w-4 h-4 text-[#8B5CF6]" />,r:['Most Issued','Lost Books','Damaged Books','Overdue Books'],b:'#F5F3FF'},{t:'💰 Financial',i:<IndianRupee className="w-4 h-4 text-[#10B981]" />,r:['Daily Income','Monthly Income','Expenses','Profit','Pending Fees'],b:'#ECFDF5'},{t:'📅 Attendance',i:<Calendar className="w-4 h-4 text-[#F59E0B]" />,r:['Student Attendance','Seat Utilization','Peak Hours'],b:'#FFF7ED'}];
  return (
    <div>
      <div className="flex items-center justify-between mb-3"><div><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>📊 Reports</h1></div><ToolbarBtn variant="success"><Download size={13} /> Export All</ToolbarBtn></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">{S.map(s=><Card key={s.t}><div className="flex items-center gap-2 px-4 py-2.5" style={{borderBottom:'1px solid #F1F5F9',background:s.b}}>{s.i}<span className="text-[#475569] font-bold uppercase" style={{fontSize:'0.6rem',letterSpacing:'0.4px'}}>{s.t}</span></div><div className="p-3 space-y-1.5">{s.r.map(r=><div key={r} className="flex items-center justify-between p-2.5 hover:bg-[#F8FAFC]" style={{border:'1px solid #F1F5F9'}}><span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" /><span className="text-[#475569]" style={{fontSize:'0.74rem'}}>{r}</span></span><div className="flex gap-1 shrink-0"><button onClick={()=>setPreview(r)} className="font-semibold text-white px-2 py-0.5" style={{fontSize:'0.58rem',background:'#0F172A'}}>View</button><button className="font-semibold text-[#475569] px-2 py-0.5" style={{fontSize:'0.58rem',background:'#F1F5F9'}}>PDF</button><button className="font-semibold text-[#047857] px-2 py-0.5" style={{fontSize:'0.58rem',background:'#ECFDF5'}}>Excel</button></div></div>)}</div></Card>)}</div>

      <Modal open={!!preview} onClose={()=>setPreview(null)} title={`📊 ${preview||''}`} subtitle="Report Preview" width="600px">
        <div className="p-6 text-center"><div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center" style={{background:'#F1F5F9'}}><FileText className="w-8 h-8 text-[#94A3B8]" /></div><h4 className="font-bold text-[#0F172A]" style={{fontSize:'0.88rem'}}>{preview}</h4><p className="text-[#64748B] mt-2" style={{fontSize:'0.74rem'}}>Report generated successfully. Data for current period is displayed below.</p><div className="mt-4 p-4 text-left" style={{background:'#F8FAFC',border:'1px solid #E2E8F0'}}><div className="grid grid-cols-2 gap-3">{[['Total Records','1,247'],['Active','892'],['Period','Dec 2024'],['Generated','Just now']].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem'}}>{l}</p><p className="text-[#0F172A] font-bold" style={{fontSize:'0.82rem'}}>{v}</p></div>)}</div></div></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setPreview(null)}>Close</ToolbarBtn><ToolbarBtn variant="success"><Download size={13} /> Download</ToolbarBtn></div>
      </Modal>
    </div>
  );
}
