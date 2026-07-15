import { useState } from 'react';
import { membershipPlans } from '../data/staticData';
import { CheckCircle2, Crown, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, SummaryCard, Modal, FormField, ToolbarBtn } from '../components/UI';
const AF = ['Reading Hall','Book Issue','Digital Library','WiFi','Computer Access','Locker','Newspaper','Magazine'];
export default function MembershipPage() {
  const [selected, setSelected] = useState(null);
  const [enrollOpen, setEnrollOpen] = useState(false);
  return (
    <div>
      <div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>💳 Membership Management</h1></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4"><SummaryCard label="Total Members" value="892" icon={<Users size={16} />} bgColor="#EFF6FF" /><SummaryCard label="Active Plans" value="6" icon={<CheckCircle size={16} />} bgColor="#ECFDF5" /><SummaryCard label="Expiring Soon" value="23" icon={<AlertTriangle size={16} />} bgColor="#FFF7ED" /><SummaryCard label="Expired" value="45" icon={<XCircle size={16} />} bgColor="#FEF2F2" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">{membershipPlans.map(p=>(
        <Card key={p.id} className="flex flex-col"><div style={{height:3,background:p.color}} /><div className="p-4 flex-1 flex flex-col"><div className="flex items-center justify-between"><div className="flex items-center gap-1">{p.name==='Yearly'&&<Crown className="w-3.5 h-3.5 text-[#F59E0B]" />}<h4 className="font-bold text-[#0F172A]" style={{fontSize:'0.78rem'}}>{p.name}</h4></div>{p.name==='Yearly'&&<span className="font-bold text-[#C2410C]" style={{fontSize:'0.5rem',padding:'1px 5px',background:'#FFF7ED'}}>BEST VALUE</span>}</div><p className="font-extrabold mt-1.5" style={{color:p.color,fontSize:'1.2rem'}}>₹{p.price.toLocaleString()}</p><p className="text-[#94A3B8] mb-3" style={{fontSize:'0.6rem'}}>{p.duration}</p><div className="space-y-1.5 flex-1">{AF.map(i=><div key={i} className="flex items-center gap-2" style={{fontSize:'0.7rem'}}>{p.includes.includes(i)?<><CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" /><span className="text-[#334155]">{i}</span></>:<><div className="w-3.5 h-3.5 shrink-0" style={{border:'1px solid #CBD5E1',borderRadius:'50%'}} /><span className="text-[#CBD5E1] line-through">{i}</span></>}</div>)}</div><button onClick={()=>setSelected(p)} className="mt-3 w-full text-white font-semibold" style={{height:34,background:p.color,fontSize:'0.74rem'}}>Select Plan</button></div></Card>
      ))}</div>

      {/* Plan Detail Modal */}
      <Modal open={!!selected} onClose={()=>setSelected(null)} title={`💳 ${selected?.name||''} Plan`} subtitle={selected?.duration} headerBg={selected?.color} width="440px">
        {selected&&<div className="p-5">
          <div className="text-center mb-4"><p className="font-extrabold text-[#0F172A]" style={{fontSize:'1.8rem'}}>₹{selected.price.toLocaleString()}</p><p className="text-[#94A3B8]" style={{fontSize:'0.68rem'}}>{selected.duration}</p></div>
          <h4 className="font-bold text-[#0F172A] mb-2" style={{fontSize:'0.78rem'}}>Includes:</h4>
          <div className="space-y-2">{selected.includes.map(i=><div key={i} className="flex items-center gap-2.5 p-2" style={{background:'#F8FAFC',border:'1px solid #F1F5F9'}}><CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" /><span className="text-[#0F172A] font-semibold" style={{fontSize:'0.78rem'}}>{i}</span></div>)}</div>
        </div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setSelected(null)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>{setEnrollOpen(true);setSelected(null)}}>Enroll Now</ToolbarBtn></div>
      </Modal>

      {/* Enroll Modal */}
      <Modal open={enrollOpen} onClose={()=>setEnrollOpen(false)} title="📝 Enroll Student" subtitle="Enter student details for membership" width="500px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Student Name" placeholder="Enter name" /><FormField label="Mobile" type="tel" placeholder="9876543210" /><FormField label="Membership Plan" type="select" options={membershipPlans.map(p=>p.name)} /><FormField label="Payment Method" type="select" options={['Cash','UPI','Card','Net Banking']} /><FormField label="Start Date" type="date" /><FormField label="Amount" type="number" placeholder="1000" /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setEnrollOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setEnrollOpen(false)}>Confirm Enrollment</ToolbarBtn></div>
      </Modal>
    </div>
  );
}
