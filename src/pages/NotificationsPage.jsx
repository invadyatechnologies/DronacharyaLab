import { useState } from 'react';
import { notifications } from '../data/staticData';
import { Send } from 'lucide-react';
import { Table, Td, StatusBadge, Card, ToolbarBtn, Modal, FormField } from '../components/UI';
export default function NotificationsPage() {
  const [sendOpen, setSendOpen] = useState(false);
  const [viewNotif, setViewNotif] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-3"><div><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>📢 Notifications</h1></div><ToolbarBtn variant="primary" onClick={()=>setSendOpen(true)}><Send size={13} /> Send New</ToolbarBtn></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">{[{n:'SMS',i:'💬',c:12,b:'#EFF6FF'},{n:'WhatsApp',i:'📱',c:25,b:'#ECFDF5'},{n:'Email',i:'📧',c:8,b:'#F5F3FF'},{n:'Push',i:'🔔',c:5,b:'#FFF7ED'}].map(x=><div key={x.n} className="text-center p-3" style={{background:x.b,border:`1px solid ${x.b}`}}><span className="text-xl">{x.i}</span><p className="font-extrabold text-[#0F172A] mt-1" style={{fontSize:'1rem'}}>{x.c}</p><p className="text-[#475569]" style={{fontSize:'0.58rem'}}>{x.n} Sent</p></div>)}</div>
      <Card className="p-4 mb-3"><h3 className="font-bold text-[#0F172A] mb-3" style={{fontSize:'0.78rem'}}>Templates</h3><div className="grid grid-cols-3 lg:grid-cols-6 gap-2">{['Fee Due','Membership','Book Return','Holiday','Event','Custom'].map(t=><button key={t} onClick={()=>setSendOpen(true)} className="text-center p-2.5 text-[#475569] font-semibold hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors" style={{fontSize:'0.66rem',border:'1px solid #E2E8F0'}}>{t}</button>)}</div></Card>
      <Table headers={['Type','Message','Channel','Recipients','Date','Status']}>{notifications.map(n=><tr key={n.id} className="hover:bg-[#FAFBFF] cursor-pointer" onClick={()=>setViewNotif(n)}><Td><span className="font-semibold" style={{fontSize:'0.62rem',padding:'2px 6px',background:'#EFF6FF',color:'#1D4ED8'}}>{n.type}</span></Td><Td><span className="truncate block max-w-[200px]" style={{fontSize:'0.74rem'}}>{n.message}</span></Td><Td><span style={{fontSize:'0.68rem'}}>{n.channel}</span></Td><Td>{n.recipients.toLocaleString()}</Td><Td>{n.date}</Td><Td align="center"><StatusBadge status={n.status} /></Td></tr>)}</Table>

      {/* Send Notification Modal */}
      <Modal open={sendOpen} onClose={()=>setSendOpen(false)} title="📢 Send Notification" subtitle="Compose and send" width="520px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Type" type="select" options={['Fee Due','Membership Expiry','Book Return Reminder','Holiday Notice','Event','Custom']} /><FormField label="Channel" type="select" options={['SMS','WhatsApp','Email','Push Notification']} /><div className="col-span-2"><FormField label="Message" type="textarea" placeholder="Enter notification message..." /></div><FormField label="Recipients" type="select" options={['All Students','Active Students','Inactive Students','Custom Group']} /><FormField label="Schedule" type="select" options={['Send Now','Schedule Later']} /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setSendOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setSendOpen(false)}><Send size={13} /> Send</ToolbarBtn></div>
      </Modal>

      {/* View Notification */}
      <Modal open={!!viewNotif} onClose={()=>setViewNotif(null)} title={viewNotif?.type||''} subtitle={`Sent on ${viewNotif?.date||''}`} headerBg="#3B82F6" width="440px">
        {viewNotif&&<div className="p-5"><div className="p-3 mb-3" style={{background:'#F8FAFC',border:'1px solid #E2E8F0'}}><p className="text-[#0F172A]" style={{fontSize:'0.82rem'}}>{viewNotif.message}</p></div><div className="grid grid-cols-2 gap-3">{[['Channel',viewNotif.channel],['Recipients',viewNotif.recipients.toLocaleString()],['Status',viewNotif.status],['Date',viewNotif.date]].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem'}}>{l}</p><p className="text-[#0F172A] font-semibold" style={{fontSize:'0.78rem'}}>{v}</p></div>)}</div></div>}
      </Modal>
    </div>
  );
}
