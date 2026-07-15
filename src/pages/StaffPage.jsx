import { useState } from 'react';
import { staffMembers } from '../data/staticData';
import { UserCircle, Phone, Mail, Calendar, IndianRupee } from 'lucide-react';
import { StatusBadge, Card, ToolbarBtn, Modal, FormField, DeleteConfirm } from '../components/UI';
const RC = { Admin:{bg:'#FEF2F2',color:'#B91C1C'}, Librarian:{bg:'#EFF6FF',color:'#1D4ED8'}, Receptionist:{bg:'#ECFDF5',color:'#047857'}, Accountant:{bg:'#F5F3FF',color:'#6D28D9'}, Security:{bg:'#FFF7ED',color:'#C2410C'}, Cleaner:{bg:'#F9FAFB',color:'#4B5563'} };
export default function StaffPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [delItem, setDelItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-3"><div><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>🏢 Staff Management</h1><p className="text-[#64748B]" style={{fontSize:'0.62rem'}}>{staffMembers.length} staff members</p></div><ToolbarBtn variant="primary" onClick={()=>setAddOpen(true)}>+ Add Staff</ToolbarBtn></div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">{['Admin','Librarian','Receptionist','Accountant','Security','Cleaner'].map(t=>{const c=RC[t];return<div key={t} className="text-center p-2" style={{background:c.bg,color:c.color,border:`1px solid ${c.bg}`}}><p className="font-extrabold text-lg">{staffMembers.filter(s=>s.role===t).length}</p><p className="font-semibold" style={{fontSize:'0.58rem'}}>{t}</p></div>})}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">{staffMembers.map(s=>{const c=RC[s.role]||RC.Cleaner;return(
        <Card key={s.id}><div className="p-3"><div className="flex items-center gap-2.5 mb-3"><div className="w-9 h-9 flex items-center justify-center shrink-0" style={{background:'#F1F5F9',borderRadius:'4px'}}><UserCircle className="w-5 h-5 text-[#94A3B8]" /></div><div className="min-w-0"><h4 className="font-bold text-[#0F172A] truncate cursor-pointer hover:text-[#2563EB]" style={{fontSize:'0.78rem'}} onClick={()=>setViewItem(s)}>{s.name}</h4><span className="inline-block font-semibold" style={{fontSize:'0.58rem',padding:'1px 6px',background:c.bg,color:c.color}}>{s.role}</span></div></div><div className="space-y-1.5" style={{fontSize:'0.74rem',color:'#475569'}}><div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />{s.phone}</div>{s.email&&<div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" /><span className="truncate">{s.email}</span></div>}<div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />Joined: {s.joinDate}</div><div className="flex items-center gap-2"><IndianRupee className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />₹{s.salary.toLocaleString()}/mo</div></div></div><div className="px-3 py-2 flex items-center justify-between" style={{borderTop:'1px solid #F1F5F9',background:'#FAFBFC'}}><StatusBadge status="Active" /><div className="flex gap-2" style={{fontSize:'0.68rem'}}><button onClick={()=>setEditItem(s)} className="text-[#2563EB] font-semibold hover:underline">Edit</button><button onClick={()=>setDelItem(s)} className="text-[#DC2626] font-semibold hover:underline">Remove</button></div></div></Card>
      );})}</div>

      {/* View Staff */}
      <Modal open={!!viewItem} onClose={()=>setViewItem(null)} title={viewItem?.name||''} subtitle={viewItem?.role} headerBg="linear-gradient(135deg, #6366F1, #4F46E5)">
        {viewItem&&<div className="p-5 grid grid-cols-2 gap-x-5 gap-y-3">{[['Role',viewItem.role],['Phone',viewItem.phone],['Email',viewItem.email||'—'],['Salary','₹'+viewItem.salary.toLocaleString()],['Joined',viewItem.joinDate],['Status',viewItem.status]].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem',letterSpacing:'0.4px'}}>{l}</p><p className="text-[#0F172A] font-semibold mt-0.5" style={{fontSize:'0.78rem'}}>{v}</p></div>)}</div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setViewItem(null)}>Close</ToolbarBtn></div>
      </Modal>

      {/* Add Staff */}
      <Modal open={addOpen} onClose={()=>setAddOpen(false)} title="➕ Add Staff Member" subtitle="Fill in staff details" width="540px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Full Name" placeholder="Enter name" /><FormField label="Role" type="select" options={['Admin','Librarian','Receptionist','Accountant','Security','Cleaner']} /><FormField label="Phone" type="tel" placeholder="9800000000" /><FormField label="Email" type="email" placeholder="email@example.com" /><FormField label="Salary" type="number" placeholder="25000" /><FormField label="Join Date" type="date" /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setAddOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setAddOpen(false)}>Save Staff</ToolbarBtn></div>
      </Modal>

      {/* Edit Staff */}
      <Modal open={!!editItem} onClose={()=>setEditItem(null)} title={`✏️ Edit — ${editItem?.name||''}`} width="540px">
        {editItem&&<div className="p-5 grid grid-cols-2 gap-3"><FormField label="Full Name" placeholder={editItem.name} /><FormField label="Role" type="select" options={['Admin','Librarian','Receptionist','Accountant','Security','Cleaner']} /><FormField label="Phone" placeholder={editItem.phone} /><FormField label="Email" placeholder={editItem.email} /><FormField label="Salary" type="number" placeholder={String(editItem.salary)} /></div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setEditItem(null)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setEditItem(null)}>Update</ToolbarBtn></div>
      </Modal>

      <DeleteConfirm open={!!delItem} onClose={()=>setDelItem(null)} onConfirm={()=>setDelItem(null)} name={delItem?.name} />
    </div>
  );
}
