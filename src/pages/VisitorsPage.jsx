import { useState } from 'react';
import { visitors } from '../data/staticData';
import { Plus, UserCheck, Clock } from 'lucide-react';
import { Table, Td, StatusBadge, SummaryCard, Card, ToolbarBtn, Modal, FormField } from '../components/UI';
export default function VisitorsPage() {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-3"><div><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>📱 Visitor Management</h1></div><ToolbarBtn variant="primary" onClick={()=>setAddOpen(true)}><Plus size={14} /> New Visitor</ToolbarBtn></div>
      <div className="grid grid-cols-3 gap-2 mb-4"><SummaryCard label="Today" value={visitors.length} icon={<UserCheck size={16} />} bgColor="#EFF6FF" /><SummaryCard label="Checked In" value="2" icon={<UserCheck size={16} />} bgColor="#ECFDF5" /><SummaryCard label="Checked Out" value="2" icon={<Clock size={16} />} bgColor="#FFF7ED" /></div>
      <Table headers={['#','Name','Mobile','Purpose','In','Out','Action']}>{visitors.map((v,i)=><tr key={v.id} className="hover:bg-[#FAFBFF]"><Td className="text-[#94A3B8] font-bold text-center" align="center">{i+1}</Td><Td className="font-bold">{v.name}</Td><Td>{v.mobile}</Td><Td><span className="font-semibold text-[#475569]" style={{fontSize:'0.66rem',background:'#F8FAFC',padding:'2px 6px'}}>{v.purpose}</span></Td><Td><StatusBadge status="Active" /><span className="ml-1" style={{fontSize:'0.7rem'}}>{v.checkIn}</span></Td><Td><span style={{fontSize:'0.7rem'}}>{v.checkOut}</span></Td><Td><ToolbarBtn>Check Out</ToolbarBtn></Td></tr>)}</Table>

      <Modal open={addOpen} onClose={()=>setAddOpen(false)} title="📱 Register New Visitor" subtitle="Fill in visitor details" width="500px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Full Name" placeholder="Enter name" /><FormField label="Mobile" type="tel" placeholder="9900000000" /><FormField label="Purpose" type="select" options={['Book Reading','Membership Inquiry','Book Donation','Student Inquiry','Meeting','Other']} /><FormField label="Check In Time" type="time" /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setAddOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setAddOpen(false)}>Register Visitor</ToolbarBtn></div>
      </Modal>
    </div>
  );
}
