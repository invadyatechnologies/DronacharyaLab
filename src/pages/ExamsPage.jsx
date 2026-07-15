import { useState } from 'react';
import { exams } from '../data/staticData';
import { Clock, Users } from 'lucide-react';
import { Table, Td, StatusBadge, Card, ToolbarBtn, Modal, FormField } from '../components/UI';
export default function ExamsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [viewExam, setViewExam] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-3"><div><h1 className="font-bold text-[#0F172A]" style={{fontSize:'0.92rem'}}>📝 Exam Section</h1></div><ToolbarBtn variant="primary" onClick={()=>setCreateOpen(true)}>+ Create Exam</ToolbarBtn></div>
      <Table headers={['Exam','Date','Duration','Questions','Participants','Avg Score']}>{exams.map(e=><tr key={e.id} className="hover:bg-[#FAFBFF] cursor-pointer" onClick={()=>setViewExam(e)}><Td className="font-bold">{e.title}</Td><Td>{e.date}</Td><Td><span className="inline-flex items-center gap-1"><Clock className="w-3 h-3 text-[#94A3B8]" />{e.duration}</span></Td><Td>{e.questions}</Td><Td><span className="inline-flex items-center gap-1"><Users className="w-3 h-3 text-[#94A3B8]" />{e.participants}</span></Td><Td align="center"><StatusBadge status={e.avgScore>=60?'Active':'Inactive'} /></Td></tr>)}</Table>
      <Card className="p-4 mt-4"><h3 className="font-bold text-[#0F172A] mb-3" style={{fontSize:'0.82rem'}}>🏆 Top Performers</h3><div className="space-y-1.5">{[{r:1,n:'Sneha Verma',s:92,m:'🥇'},{r:2,n:'Rahul Sharma',s:88,m:'🥈'},{r:3,n:'Amit Kumar',s:85,m:'🥉'},{r:4,n:'Neha Tiwari',s:82,m:''},{r:5,n:'Priya Patel',s:78,m:''}].map(x=><div key={x.r} className="flex items-center justify-between p-2.5" style={{background:x.r<=3?'#FFFBEB':'#F8FAFC',border:`1px solid ${x.r<=3?'#FDE68A':'#F1F5F9'}`}}><span className="flex items-center gap-2"><span className="font-bold w-6 text-center" style={{fontSize:'0.78rem'}}>{x.m||`#${x.r}`}</span><span className="font-semibold text-[#0F172A]" style={{fontSize:'0.78rem'}}>{x.n}</span></span><span className="font-extrabold text-[#0F172A]" style={{fontSize:'0.78rem'}}>{x.s}%</span></div>)}</div></Card>

      {/* Create Exam */}
      <Modal open={createOpen} onClose={()=>setCreateOpen(false)} title="📝 Create New Exam" subtitle="Set up exam details" width="520px">
        <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Exam Title" placeholder="e.g. UPSC Prelims Mock" /><FormField label="Date" type="date" /><FormField label="Duration" type="select" options={['30 min','60 min','90 min','120 min','180 min']} /><FormField label="Total Questions" type="number" placeholder="100" /><FormField label="Subject" type="select" options={['General Studies','Mathematics','Reasoning','English','Current Affairs']} /><FormField label="Difficulty" type="select" options={['Easy','Medium','Hard','Mixed']} /></div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setCreateOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setCreateOpen(false)}>Create Exam</ToolbarBtn></div>
      </Modal>

      {/* View Exam */}
      <Modal open={!!viewExam} onClose={()=>setViewExam(null)} title={viewExam?.title||''} subtitle={viewExam?.date} headerBg="linear-gradient(135deg, #6366F1, #4F46E5)" width="440px">
        {viewExam&&<div className="p-5 grid grid-cols-2 gap-3">{[['Date',viewExam.date],['Duration',viewExam.duration],['Questions',viewExam.questions],['Participants',viewExam.participants],['Avg Score',viewExam.avgScore+'%'],['Status',viewExam.avgScore>=60?'Active':'Needs Review']].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem'}}>{l}</p><p className="text-[#0F172A] font-bold" style={{fontSize:'0.82rem'}}>{v}</p></div>)}</div>}
      </Modal>
    </div>
  );
}
