import { useState } from 'react';
import { QrCode } from 'lucide-react';
import { ToolbarBtn, Modal } from '../components/UI';
export default function QRFeaturesPage() {
  const [qrModal, setQrModal] = useState(null);
  const features = [{n:'QR Student Card',d:'Student ID & quick check-in',i:'🪪',b:'#EFF6FF'},{n:'QR Seat',d:'Occupancy tracking',i:'🪑',b:'#ECFDF5'},{n:'QR Book',d:'Quick issue & return',i:'📖',b:'#F5F3FF'},{n:'QR Attendance',d:'Auto attendance',i:'📅',b:'#FFF7ED'},{n:'QR Membership',d:'Digital card',i:'💳',b:'#ECFEFF'}];
  return (
    <div>
      <div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>📱 QR Features</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">{features.map(f=><div key={f.n} className="p-4" style={{background:f.b,border:`1px solid ${f.b}`}}><div className="flex items-start gap-3"><div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white" style={{border:'1px solid #E2E8F0'}}><QrCode className="w-7 h-7 text-[#64748B]" /></div><div><span className="text-lg">{f.i}</span><h4 className="font-bold text-[#0F172A] mt-1" style={{fontSize:'0.78rem'}}>{f.n}</h4><p className="text-[#64748B] mt-0.5 leading-relaxed" style={{fontSize:'0.62rem'}}>{f.d}</p><div className="mt-2"><ToolbarBtn onClick={()=>setQrModal(f)}>Generate QR</ToolbarBtn></div></div></div></div>)}</div>

      <Modal open={!!qrModal} onClose={()=>setQrModal(null)} title={`${qrModal?.i||''} ${qrModal?.n||''}`} subtitle="QR Code Generated" width="380px">
        <div className="p-6 text-center"><div className="w-40 h-40 mx-auto flex items-center justify-center" style={{background:'#F8FAFC',border:'2px dashed #E2E8F0'}}><QrCode className="w-20 h-20 text-[#0F172A]" /></div><p className="text-[#64748B] mt-3" style={{fontSize:'0.74rem'}}>QR Code for <strong className="text-[#0F172A]">{qrModal?.n}</strong></p><p className="text-[#94A3B8] mt-1" style={{fontSize:'0.62rem'}}>{qrModal?.d}</p></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setQrModal(null)}>Close</ToolbarBtn><ToolbarBtn variant="primary">Download QR</ToolbarBtn></div>
      </Modal>
    </div>
  );
}
