import { useState } from 'react';
import { userRoles } from '../data/staticData';
import { Shield, CheckCircle2 } from 'lucide-react';
import { Card, Modal } from '../components/UI';
const C = {'Super Admin':'#DC2626',Admin:'#3B82F6',Librarian:'#10B981',Accountant:'#8B5CF6',Student:'#F59E0B'};
export default function UserRolesPage() {
  const [viewRole, setViewRole] = useState(null);
  return (
    <div>
      <div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>🔒 User Roles & Permissions</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">{userRoles.map(r=>{const c=C[r.role]||'#6B7280';return(
        <Card key={r.role} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={()=>setViewRole(r)}><div style={{height:3,background:c}} /><div className="p-4"><div className="flex items-center gap-2.5 mb-3"><div className="w-9 h-9 flex items-center justify-center shrink-0" style={{background:c,borderRadius:'4px'}}><Shield className="w-4 h-4 text-white" /></div><div><h4 className="font-bold text-[#0F172A]" style={{fontSize:'0.78rem'}}>{r.role}</h4><p className="text-[#94A3B8]" style={{fontSize:'0.6rem'}}>{r.access}</p></div></div><div className="space-y-1.5">{r.permissions.map(p=><div key={p} className="flex items-center gap-2 text-[#475569]" style={{fontSize:'0.74rem'}}><CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />{p}</div>)}</div></div></Card>
      );})}</div>

      <Modal open={!!viewRole} onClose={()=>setViewRole(null)} title={`🔒 ${viewRole?.role||''}`} subtitle={viewRole?.access} headerBg={C[viewRole?.role]||'#6B7280'} width="440px">
        {viewRole&&<div className="p-5"><h4 className="text-[#0F172A] font-bold mb-3" style={{fontSize:'0.82rem'}}>Permissions</h4><div className="space-y-2">{viewRole.permissions.map(p=><div key={p} className="flex items-center gap-2.5 p-2.5" style={{background:'#F8FAFC',border:'1px solid #F1F5F9'}}><CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" /><span className="text-[#0F172A] font-semibold" style={{fontSize:'0.78rem'}}>{p}</span></div>)}</div></div>}
      </Modal>
    </div>
  );
}
