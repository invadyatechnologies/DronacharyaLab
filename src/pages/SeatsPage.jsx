import { useState } from 'react';
import { seats } from '../data/staticData';
import { Armchair, Zap, Wind, Crown, Monitor as W } from 'lucide-react';
import { SummaryCard, Card, ToolbarBtn } from '../components/UI';

const SC = { Available:'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]', Occupied:'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]', Reserved:'bg-[#FFF7ED] border-[#FDBA74] text-[#C2410C]', Maintenance:'bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]' };
const SD = { Available:'bg-[#10B981]', Occupied:'bg-[#3B82F6]', Reserved:'bg-[#F97316]', Maintenance:'bg-[#EF4444]' };

export default function SeatsPage({ view='all' }) {
  const [fl, setFl] = useState('All'); const [sf, setSf] = useState('All');
  const list = seats.filter(s=>(fl==='All'||s.floor.toString()===fl)&&(sf==='All'||s.status===sf));
  const ct = (s)=>seats.filter(x=>x.status===s).length;
  return (
    <div>
      <div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>{view==='seat-map'?'🗺️ Seat Map':'🪑 Seat Management'}</h1><p className="text-[#64748B]" style={{fontSize:'0.62rem'}}>Manage and monitor seats</p></div>
      <div className="grid grid-cols-5 gap-2 mb-3"><SummaryCard label="Total" value={seats.length} icon={<Armchair size={16} />} bgColor="#F8FAFC" /><SummaryCard label="Available" value={ct('Available')} icon={<Armchair size={16} />} bgColor="#ECFDF5" /><SummaryCard label="Occupied" value={ct('Occupied')} icon={<Armchair size={16} />} bgColor="#EFF6FF" /><SummaryCard label="Reserved" value={ct('Reserved')} icon={<Armchair size={16} />} bgColor="#FFF7ED" /><SummaryCard label="Maintenance" value={ct('Maintenance')} icon={<Armchair size={16} />} bgColor="#FEF2F2" /></div>
      <Card className="p-3 mb-3 flex flex-wrap items-center gap-2"><span className="text-[#94A3B8] font-bold uppercase" style={{fontSize:'0.55rem',letterSpacing:'1px'}}>Floor</span>{['All','1','2'].map(f=><ToolbarBtn key={f} variant={fl===f?'primary':'default'} onClick={()=>setFl(f)}>{f==='All'?'All':`Floor ${f}`}</ToolbarBtn>)}<span className="w-px h-5 bg-[#E2E8F0] mx-1" /><span className="text-[#94A3B8] font-bold uppercase" style={{fontSize:'0.55rem',letterSpacing:'1px'}}>Status</span>{['All','Available','Occupied','Reserved','Maintenance'].map(s=><ToolbarBtn key={s} variant={sf===s?'primary':'default'} onClick={()=>setSf(s)}>{s}</ToolbarBtn>)}</Card>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">{list.map(s=><div key={s.id} className={`border p-2 text-center cursor-pointer hover:shadow-sm transition-shadow ${SC[s.status]}`} style={{borderWidth:1}}><Armchair className="w-4 h-4 mx-auto opacity-50" /><p className="font-bold mt-0.5" style={{fontSize:'0.68rem'}}>{s.number}</p><p className="opacity-60" style={{fontSize:'0.5rem'}}>{s.room}</p><div className="flex justify-center gap-0.5 mt-1 h-3">{s.premium&&<Crown className="w-2.5 h-2.5 text-[#F59E0B]" />}{s.window&&<W className="w-2.5 h-2.5 text-[#06B6D4]" />}{s.charging&&<Zap className="w-2.5 h-2.5 text-[#EAB308]" />}{s.type==='AC'&&<Wind className="w-2.5 h-2.5 text-[#3B82F6]" />}</div><div className={`w-[5px] h-[5px] rounded-full mx-auto mt-1 ${SD[s.status]}`} /></div>)}</div>
    </div>
  );
}
