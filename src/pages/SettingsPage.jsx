import { useState } from 'react';
import { librarySettings } from '../data/staticData';
import { Building2, Clock, Calendar, FileText, Database, Palette, Save } from 'lucide-react';
import { Card, ToolbarBtn, Modal, FormField } from '../components/UI';
export default function SettingsPage() {
  const [saveModal, setSaveModal] = useState(false);
  const [backupModal, setBackupModal] = useState(false);
  return (
    <div>
      <div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>⚙️ Settings</h1></div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-4">{[{l:'Library Details',i:<Building2 size={18} />,b:'#EFF6FF'},{l:'Working Hours',i:<Clock size={18} />,b:'#ECFDF5'},{l:'Holidays',i:<Calendar size={18} />,b:'#FEF2F2'},{l:'Fee Structure',i:<FileText size={18} />,b:'#FFF7ED'},{l:'Backup',i:<Database size={18} />,b:'#F5F3FF'},{l:'Theme',i:<Palette size={18} />,b:'#ECFEFF'}].map(s=><button key={s.l} className="text-center p-3 text-[#475569] hover:shadow-sm" style={{background:s.b,border:`1px solid ${s.b}`}}><div className="flex justify-center mb-1.5">{s.i}</div><p className="font-semibold" style={{fontSize:'0.6rem'}}>{s.l}</p></button>)}</div>
      <Card className="p-4 mb-3"><h3 className="font-bold text-[#0F172A] mb-3" style={{fontSize:'0.82rem'}}>🏢 Library Details</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{[{l:'Library Name',v:librarySettings.name},{l:'Tagline',v:librarySettings.tagline},{l:'Address',v:librarySettings.address},{l:'Phone',v:librarySettings.phone},{l:'Email',v:librarySettings.email},{l:'Website',v:librarySettings.website},{l:'GST',v:librarySettings.gst},{l:'Hours',v:librarySettings.workingHours}].map(f=><div key={f.l}><label className="text-[#94A3B8] font-semibold uppercase block mb-1" style={{fontSize:'0.55rem',letterSpacing:'0.4px'}}>{f.l}</label><input defaultValue={f.v} className="w-full outline-none text-[#0F172A]" style={{height:34,border:'1px solid #E2E8F0',padding:'0 10px',fontSize:'0.78rem'}} /></div>)}</div><div className="mt-3 pt-3" style={{borderTop:'1px solid #F1F5F9'}}><label className="text-[#94A3B8] font-semibold uppercase block mb-2" style={{fontSize:'0.55rem'}}>Holidays</label><div className="flex flex-wrap gap-1.5">{librarySettings.holidays.map(h=><span key={h} className="font-medium text-[#B91C1C]" style={{fontSize:'0.62rem',padding:'3px 8px',background:'#FEF2F2',border:'1px solid #FECACA'}}>{h}</span>)}</div></div><div className="mt-4"><ToolbarBtn variant="primary" onClick={()=>setSaveModal(true)}><Save size={13} /> Save Settings</ToolbarBtn></div></Card>
      <Card className="p-4"><h3 className="font-bold text-[#0F172A] mb-3" style={{fontSize:'0.82rem'}}>💾 Backup & Restore</h3><div className="grid grid-cols-2 gap-3"><div className="p-4" style={{border:'1px solid #E2E8F0'}}><h4 className="font-semibold text-[#0F172A]" style={{fontSize:'0.78rem'}}>Create Backup</h4><p className="text-[#94A3B8] my-2" style={{fontSize:'0.62rem'}}>Last: 2024-12-15 11:30 PM</p><ToolbarBtn variant="success" onClick={()=>setBackupModal(true)}><Database size={13} /> Backup Now</ToolbarBtn></div><div className="p-4" style={{border:'1px solid #E2E8F0'}}><h4 className="font-semibold text-[#0F172A]" style={{fontSize:'0.78rem'}}>Restore Data</h4><p className="text-[#94A3B8] my-2" style={{fontSize:'0.62rem'}}>Upload backup file</p><ToolbarBtn>Upload File</ToolbarBtn></div></div></Card>

      <Modal open={saveModal} onClose={()=>setSaveModal(false)} title="✅ Settings Saved" width="360px">
        <div className="p-5 text-center"><div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center" style={{background:'#ECFDF5',borderRadius:'50%'}}><Save className="w-7 h-7 text-[#10B981]" /></div><p className="text-[#0F172A] font-bold" style={{fontSize:'0.88rem'}}>Settings Updated!</p><p className="text-[#64748B] mt-1" style={{fontSize:'0.74rem'}}>All library settings have been saved successfully.</p></div>
        <div className="px-5 py-3 flex justify-center" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn variant="primary" onClick={()=>setSaveModal(false)}>OK</ToolbarBtn></div>
      </Modal>

      <Modal open={backupModal} onClose={()=>setBackupModal(false)} title="💾 Backup Created" width="360px">
        <div className="p-5 text-center"><div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center" style={{background:'#EFF6FF',borderRadius:'50%'}}><Database className="w-7 h-7 text-[#3B82F6]" /></div><p className="text-[#0F172A] font-bold" style={{fontSize:'0.88rem'}}>Backup Successful!</p><p className="text-[#64748B] mt-1" style={{fontSize:'0.74rem'}}>Database backup created at {new Date().toLocaleString()}</p></div>
        <div className="px-5 py-3 flex justify-center" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn variant="primary" onClick={()=>setBackupModal(false)}>OK</ToolbarBtn></div>
      </Modal>
    </div>
  );
}
