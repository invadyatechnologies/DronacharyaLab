import { useState } from 'react';
import { feeRecords, membershipPlans } from '../data/staticData';
import { Search, Plus, Download, X, CheckCircle2, IndianRupee, AlertTriangle, Receipt, CreditCard } from 'lucide-react';
import { Table, Td, StatusBadge, SummaryCard, Card, ToolbarBtn, Modal, FormField } from '../components/UI';

export default function FeesPage({ view='fee-collection' }) {
  const [q, setQ] = useState(''); const [sf, setSf] = useState('All');
  const [collectOpen, setCollectOpen] = useState(false);
  const [viewReceipt, setViewReceipt] = useState(null);
  const list = feeRecords.filter(f=>(f.student.toLowerCase().includes(q.toLowerCase())||f.receipt.includes(q))&&(sf==='All'||f.status===sf));
  const paid = feeRecords.filter(f=>f.status==='Paid').reduce((s,f)=>s+f.amount,0);
  const pending = feeRecords.filter(f=>f.status==='Pending').reduce((s,f)=>s+f.amount,0);

  if(view==='pending-fees') return (
    <div><div className="mb-3"><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>⚠️ Pending Fees</h1></div><Table headers={['Student','Type','Amount','Due Date','Action']}>{feeRecords.filter(f=>f.status==='Pending').map(r=><tr key={r.id} className="hover:bg-[#FAFBFF]"><Td className="font-bold">{r.student}</Td><Td>{r.type}</Td><Td><span className="font-extrabold text-[#B91C1C]">₹{r.amount.toLocaleString()}</span></Td><Td>{r.date}</Td><Td><ToolbarBtn variant="primary" onClick={()=>setCollectOpen(true)}>Collect</ToolbarBtn></Td></tr>)}</Table>
      <Modal open={collectOpen} onClose={()=>setCollectOpen(false)} title="💰 Collect Fee" subtitle="Process fee payment" width="480px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Student" type="select" options={['Vikash Sahu']} /><FormField label="Fee Type" type="select" options={['Monthly Fee','Admission Fee','Late Fine','Security Deposit']} /><FormField label="Amount" type="number" placeholder="1000" /><FormField label="Payment Method" type="select" options={['Cash','UPI','Card','Net Banking']} /><FormField label="Date" type="date" /><FormField label="Remarks" placeholder="Optional" /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setCollectOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setCollectOpen(false)}>Collect & Print Receipt</ToolbarBtn></div>
      </Modal>
    </div>
  );

  return (
    <div className="-mx-4 sm:-mx-5 lg:-mx-6 -mt-4 sm:-mt-5">
      <div className="sticky top-14 z-20 bg-white" style={{borderBottom:'1px solid #E2E8F0'}}><div className="px-4 sm:px-5 lg:px-6 py-2.5 flex flex-wrap items-center gap-2"><div className="flex items-center gap-1.5 px-2.5 flex-1 min-w-[180px]" style={{height:34,border:'1px solid #E2E8F0'}}><Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" /><input className="bg-transparent outline-none w-full text-[#0F172A] placeholder:text-[#CBD5E1]" style={{fontSize:'0.78rem'}} placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />{q&&<button onClick={()=>setQ('')}><X className="w-3 h-3 text-[#94A3B8]" /></button>}</div><select value={sf} onChange={e=>setSf(e.target.value)} className="outline-none text-[#475569] bg-white" style={{height:34,padding:'0 8px',border:'1px solid #E2E8F0',fontSize:'0.76rem'}}><option value="All">All Status</option><option value="Paid">Paid</option><option value="Pending">Pending</option></select><div className="flex-1" /><ToolbarBtn variant="success"><Download size={13} /> Export</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setCollectOpen(true)}><Plus size={14} /> Collect Fee</ToolbarBtn></div></div>
      <div className="px-4 sm:px-5 lg:px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4"><SummaryCard label="Collected" value={`₹${paid.toLocaleString()}`} icon={<IndianRupee size={16} />} bgColor="#ECFDF5" /><SummaryCard label="Pending" value={`₹${pending.toLocaleString()}`} icon={<AlertTriangle size={16} />} bgColor="#FFF7ED" /><SummaryCard label="Receipts" value={feeRecords.filter(f=>f.receipt).length} icon={<Receipt size={16} />} bgColor="#EFF6FF" /><SummaryCard label="Methods" value="4" icon={<CreditCard size={16} />} bgColor="#EEF2FF" /></div>
        <Table headers={['Receipt','Student','Type','Amount','Date','Method','Status']}>
          {list.map(f=><tr key={f.id} className="hover:bg-[#FAFBFF] cursor-pointer" onClick={()=>f.receipt&&setViewReceipt(f)}>
            <Td><span className="font-mono text-[#94A3B8]" style={{fontSize:'0.66rem'}}>{f.receipt||'—'}</span></Td><Td className="font-bold">{f.student}</Td><Td>{f.type}</Td><Td><span className="font-extrabold">₹{f.amount.toLocaleString()}</span></Td><Td>{f.date}</Td><Td><span className="font-semibold text-[#475569]" style={{fontSize:'0.68rem',background:'#F8FAFC',padding:'2px 6px'}}>{f.method}</span></Td><Td align="center"><StatusBadge status={f.status} /></Td>
          </tr>)}
        </Table>
        <div className="mt-5"><h3 className="font-bold text-[#0F172A] mb-3" style={{fontSize:'0.82rem'}}>💳 Membership Plans</h3><div className="grid grid-cols-2 lg:grid-cols-3 gap-2">{membershipPlans.map(p=><Card key={p.id}><div className="h-[3px]" style={{background:p.color}} /><div className="p-3"><div className="flex justify-between items-center"><h4 className="font-bold text-[#0F172A]" style={{fontSize:'0.78rem'}}>{p.name}</h4><span className="font-extrabold" style={{color:p.color,fontSize:'1rem'}}>₹{p.price}</span></div><p className="text-[#94A3B8] mb-2" style={{fontSize:'0.6rem'}}>{p.duration}</p>{p.includes.map(i=><div key={i} className="flex items-center gap-1.5 text-[#475569]" style={{fontSize:'0.68rem'}}><CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0" />{i}</div>)}</div></Card>)}</div></div>
      </div>

      {/* Collect Fee Modal */}
      <Modal open={collectOpen} onClose={()=>setCollectOpen(false)} title="💰 Collect Fee" subtitle="Process fee payment" width="520px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Student Name" type="select" options={['Rahul Sharma','Priya Patel','Amit Kumar','Sneha Verma','Vikash Sahu','Neha Tiwari']} /><FormField label="Fee Type" type="select" options={['Monthly Fee','Admission Fee','Membership Fee','Security Deposit','Late Fine','Book Damage Fine']} /><FormField label="Amount" type="number" placeholder="1000" /><FormField label="Payment Method" type="select" options={['Cash','UPI','Card','Net Banking']} /><FormField label="Date" type="date" /><FormField label="Remarks" placeholder="Optional notes" /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setCollectOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setCollectOpen(false)}>Collect & Print Receipt</ToolbarBtn></div>
      </Modal>

      {/* Receipt Modal */}
      <Modal open={!!viewReceipt} onClose={()=>setViewReceipt(null)} title={`🧾 Receipt — ${viewReceipt?.receipt||''}`} subtitle={viewReceipt?.date} headerBg="#0F172A" width="420px">
        {viewReceipt&&<div className="p-5"><div className="grid grid-cols-2 gap-3">{[['Student',viewReceipt.student],['Type',viewReceipt.type],['Amount','₹'+viewReceipt.amount.toLocaleString()],['Method',viewReceipt.method],['Date',viewReceipt.date],['Status',viewReceipt.status]].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem'}}>{l}</p><p className="text-[#0F172A] font-bold" style={{fontSize:'0.82rem'}}>{v}</p></div>)}</div></div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setViewReceipt(null)}>Close</ToolbarBtn><ToolbarBtn variant="success"><Download size={13} /> Print</ToolbarBtn></div>
      </Modal>
    </div>
  );
}
