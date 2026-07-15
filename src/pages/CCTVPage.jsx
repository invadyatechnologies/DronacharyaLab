import { useState } from 'react';
import { Video, Eye, AlertTriangle, Shield } from 'lucide-react';
import { SummaryCard, Card, Modal } from '../components/UI';
export default function CCTVPage() {
  const [viewCam, setViewCam] = useState(null);
  const cams = [{n:'Main Entrance',l:'Ground Floor',s:'Online'},{n:'Reading Hall 1',l:'1st Floor',s:'Online'},{n:'Reading Hall 2',l:'1st Floor',s:'Online'},{n:'Book Section',l:'Ground Floor',s:'Online'},{n:'Reception',l:'Ground Floor',s:'Online'},{n:'Computer Lab',l:'2nd Floor',s:'Online'},{n:'Parking',l:'Outside',s:'Offline'},{n:'Back Gate',l:'Outside',s:'Online'}];
  return (
    <div>
      <div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>🎥 CCTV Monitoring</h1></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4"><SummaryCard label="Live" value="7/8" icon={<Video size={16} />} bgColor="#ECFDF5" /><SummaryCard label="Playback" value="30 Days" icon={<Eye size={16} />} bgColor="#EFF6FF" /><SummaryCard label="Alerts" value="3 Today" icon={<AlertTriangle size={16} />} bgColor="#FFF7ED" /><SummaryCard label="Security" value="Active" icon={<Shield size={16} />} bgColor="#EEF2FF" /></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">{cams.map(c=><Card key={c.n} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={()=>setViewCam(c)}><div className="h-24 flex items-center justify-center relative" style={{background:'#0F172A'}}><Video className="w-7 h-7 text-[#334155]" /><span className={`absolute top-2 right-2 font-bold px-1.5 py-0.5 ${c.s==='Online'?'bg-[#10B981] text-white':'bg-[#EF4444] text-white'}`} style={{fontSize:'0.5rem'}}>● {c.s==='Online'?'LIVE':'OFF'}</span></div><div className="px-3 py-2"><p className="font-semibold text-[#0F172A]" style={{fontSize:'0.74rem'}}>{c.n}</p><p className="text-[#94A3B8]" style={{fontSize:'0.6rem'}}>{c.l}</p></div></Card>)}</div>

      <Modal open={!!viewCam} onClose={()=>setViewCam(null)} title={`🎥 ${viewCam?.n||''}`} subtitle={viewCam?.l} headerBg="#0F172A" width="500px">
        <div className="flex items-center justify-center" style={{height:240,background:'#0F172A'}}><Video className="w-16 h-16 text-[#334155]" /><span className="absolute text-white font-bold" style={{fontSize:'0.72rem'}}>Live Feed</span></div>
        <div className="p-4 grid grid-cols-2 gap-3">{[['Camera',viewCam?.n],['Location',viewCam?.l],['Status',viewCam?.s],['Recording','24/7'],['Resolution','1080p HD'],['Storage','30 Days']].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem'}}>{l}</p><p className="text-[#0F172A] font-semibold" style={{fontSize:'0.78rem'}}>{v}</p></div>)}</div>
      </Modal>
    </div>
  );
}
