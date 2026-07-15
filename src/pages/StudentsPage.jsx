import { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, Download, X, Phone, UserCircle } from 'lucide-react';
import { students } from '../data/staticData';
import { Table, Td, StatusBadge, TypeBadge, ToolbarBtn, Chip, Modal, FormField, DeleteConfirm } from '../components/UI';

export default function StudentsPage() {
  const [q, setQ] = useState('');
  const [sf, setSf] = useState('All');
  const [tf, setTf] = useState('All');
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(null);
  const [delOpen, setDelOpen] = useState(null);

  const list = students.filter(s => {
    const m = s.name.toLowerCase().includes(q.toLowerCase()) || s.membershipId.toLowerCase().includes(q.toLowerCase()) || s.mobile.includes(q);
    return m && (sf==='All'||s.status===sf) && (tf==='All'||s.course===tf);
  });
  const hasFilters = q || sf!=='All' || tf!=='All';
  const clear = () => { setQ(''); setSf('All'); setTf('All'); };

  const addFields = [{l:'Student Name',t:'text',p:'Enter full name'},{l:"Father's Name",t:'text',p:"Father's name"},{l:"Mother's Name",t:'text',p:"Mother's name"},{l:'Gender',t:'select',o:['Male','Female','Other']},{l:'Date of Birth',t:'date'},{l:'Mobile',t:'tel',p:'9876543210'},{l:'WhatsApp',t:'tel',p:'9876543210'},{l:'Email',t:'email',p:'email@example.com'},{l:'Address',t:'text',p:'Enter address'},{l:'Aadhaar',t:'text',p:'XXXX-XXXX-XXXX'},{l:'Course',t:'select',o:['UPSC','SSC','Banking','Railway','CGPSC','Vyapam']},{l:'Batch',t:'select',o:['Morning','Evening','Full Day']}];

  return (
    <div className="-mx-4 sm:-mx-5 lg:-mx-6 -mt-4 sm:-mt-5">
      {/* ── Sticky Toolbar ── */}
      <div className="sticky top-14 z-20 bg-white" style={{ borderBottom: '1px solid #E2E8F0' }}>
        <div className="px-4 sm:px-5 lg:px-6 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 flex-1 min-w-[180px]" style={{ height: 34, border: '1px solid #E2E8F0' }}>
              <Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
              <input className="bg-transparent outline-none w-full text-[#0F172A] placeholder:text-[#CBD5E1]" style={{ fontSize: '0.78rem' }} placeholder="Search name, phone, ID..." value={q} onChange={e => setQ(e.target.value)} />
              {q && <button onClick={() => setQ('')}><X className="w-3 h-3 text-[#94A3B8]" /></button>}
            </div>
            <select value={sf} onChange={e => setSf(e.target.value)} className="outline-none text-[#475569] bg-white" style={{ height: 34, padding: '0 8px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
              <option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
            </select>
            <select value={tf} onChange={e => setTf(e.target.value)} className="outline-none text-[#475569] bg-white" style={{ height: 34, padding: '0 8px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
              <option value="All">All Courses</option>{['UPSC','SSC','Banking','Railway','CGPSC','Vyapam'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {hasFilters && <ToolbarBtn onClick={clear}><X size={12} /> Clear</ToolbarBtn>}
            <div className="flex-1" />
            <ToolbarBtn variant="success"><Download size={13} /> Export</ToolbarBtn>
            <ToolbarBtn variant="primary" onClick={() => setAddOpen(true)}><Plus size={14} /> Add Student</ToolbarBtn>
          </div>
          {hasFilters && <div className="flex items-center gap-1.5 mt-2 flex-wrap">{q && <Chip label={`"${q}"`} onRemove={() => setQ('')} />}{sf!=='All' && <Chip label={sf} onRemove={() => setSf('All')} />}{tf!=='All' && <Chip label={tf} onRemove={() => setTf('All')} />}<span className="text-[#94A3B8] ml-1" style={{ fontSize: '0.62rem' }}>{list.length} results</span></div>}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="px-4 sm:px-5 lg:px-6 py-4">
        <Table headers={['S.No','Student Name','Course','Mobile','Seat','Batch','Membership ID','Status','Actions']}>
          {list.map((s, i) => (
            <tr key={s.id} className="hover:bg-[#FAFBFF]">
              <Td className="text-[#94A3B8] text-center font-bold" align="center">{i+1}</Td>
              <Td><button onClick={() => setDetail(s)} className="text-left hover:text-[#2563EB] hover:underline" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>{s.name}</button><p className="text-[#94A3B8]" style={{ fontSize: '0.62rem' }}>{s.email}</p></Td>
              <Td><TypeBadge type={s.course} /></Td>
              <Td><span className="inline-flex items-center gap-1 text-[#475569]" style={{ fontSize: '0.74rem' }}><Phone className="w-3 h-3 text-[#94A3B8]" />{s.mobile}</span></Td>
              <Td><span className="font-mono font-semibold text-[#475569]" style={{ fontSize: '0.7rem' }}>{s.seat}</span></Td>
              <Td><span style={{ fontSize: '0.74rem' }}>{s.batch}</span></Td>
              <Td><span className="font-mono text-[#475569]" style={{ fontSize: '0.68rem', background: '#F8FAFC', padding: '2px 6px', fontWeight: 600 }}>{s.membershipId}</span></Td>
              <Td align="center"><StatusBadge status={s.status} /></Td>
              <Td align="center">
                <div className="flex items-center justify-center gap-0.5">
                  <button onClick={() => setDetail(s)} className="p-1 text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#2563EB]" style={{ borderRadius: '4px' }}><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setEditOpen(s)} className="p-1 text-[#64748B] hover:bg-[#FFF7ED] hover:text-[#C2410C]" style={{ borderRadius: '4px' }}><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDelOpen(s)} className="p-1 text-[#64748B] hover:bg-[#FEF2F2] hover:text-[#DC2626]" style={{ borderRadius: '4px' }}><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </Td>
            </tr>
          ))}
          {list.length === 0 && <tr><td colSpan={9} className="text-center py-10"><UserCircle className="w-10 h-10 text-[#E2E8F0] mx-auto mb-2" /><p className="text-[#64748B] font-semibold" style={{ fontSize: '0.82rem' }}>No students found</p></td></tr>}
        </Table>
        <div className="flex items-center justify-between mt-0 px-3 py-2" style={{ border: '1px solid #E2E8F0', borderTop: 'none' }}>
          <span className="text-[#64748B]" style={{ fontSize: '0.66rem' }}>Showing <strong className="text-[#0F172A]">{list.length}</strong> of <strong className="text-[#0F172A]">{students.length}</strong> • Active: <strong className="text-[#047857]">{list.filter(s=>s.status==='Active').length}</strong></span>
        </div>
      </div>

      {/* ── View Detail ── */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name || ''} subtitle={`${detail?.membershipId} • ${detail?.cardNumber}`} headerBg="linear-gradient(135deg, #3B82F6, #1D4ED8)">
        {detail && <><div className="p-5 grid grid-cols-2 gap-x-5 gap-y-3">{[["Father",detail.father],["Mother",detail.mother],["Gender",detail.gender],["DOB",detail.dob],["Mobile",detail.mobile],["WhatsApp",detail.whatsapp],["Email",detail.email],["Address",detail.address],["Aadhaar",detail.aadhaar],["Admission",detail.admissionDate],["Course",detail.course],["Batch",detail.batch],["Seat",detail.seat],["Joining",detail.joiningDate],["Expiry",detail.expiryDate],["Status",detail.status]].map(([l,v]) => (<div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.4px' }}>{l}</p><p className="text-[#0F172A] font-semibold mt-0.5" style={{ fontSize: '0.78rem' }}>{v}</p></div>))}</div><div className="px-5 pb-3 pt-2" style={{ borderTop: '1px solid #F1F5F9' }}><p className="text-[#94A3B8] font-semibold uppercase mb-2" style={{ fontSize: '0.55rem' }}>Documents</p><div className="flex flex-wrap gap-1.5">{['Aadhaar Card','Passport Photo','Student ID','Address Proof'].map(d => <span key={d} className="text-[#475569] font-medium" style={{ fontSize: '0.62rem', padding: '3px 8px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>📎 {d}</span>)}</div></div><div className="px-5 py-3 flex justify-end gap-2" style={{ borderTop: '1px solid #E2E8F0' }}><ToolbarBtn onClick={() => setDetail(null)}>Close</ToolbarBtn><ToolbarBtn variant="primary" onClick={() => { setEditOpen(detail); setDetail(null); }}><Edit2 size={13} /> Edit</ToolbarBtn></div></>}
      </Modal>

      {/* ── Add ── */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="➕ New Student Admission" subtitle="Fill in student details" width="620px">
        <div className="p-5 grid grid-cols-2 gap-3">{addFields.map(f => <FormField key={f.l} label={f.l} type={f.t} placeholder={f.p} options={f.o} />)}</div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{ borderTop: '1px solid #E2E8F0' }}><ToolbarBtn onClick={() => setAddOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={() => setAddOpen(false)}>Save Student</ToolbarBtn></div>
      </Modal>

      {/* ── Edit ── */}
      <Modal open={!!editOpen} onClose={() => setEditOpen(null)} title={`✏️ Edit — ${editOpen?.name || ''}`} subtitle="Update student details" width="620px">
        {editOpen && <div className="p-5 grid grid-cols-2 gap-3"><FormField label="Student Name" placeholder={editOpen.name} /><FormField label="Father's Name" placeholder={editOpen.father} /><FormField label="Mobile" type="tel" placeholder={editOpen.mobile} /><FormField label="Email" type="email" placeholder={editOpen.email} /><FormField label="Course" type="select" options={['UPSC','SSC','Banking','Railway','CGPSC','Vyapam']} /><FormField label="Batch" type="select" options={['Morning','Evening','Full Day']} /><FormField label="Status" type="select" options={['Active','Inactive']} /><FormField label="Address" placeholder={editOpen.address} /></div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{ borderTop: '1px solid #E2E8F0' }}><ToolbarBtn onClick={() => setEditOpen(null)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={() => setEditOpen(null)}>Update Student</ToolbarBtn></div>
      </Modal>

      <DeleteConfirm open={!!delOpen} onClose={() => setDelOpen(null)} onConfirm={() => setDelOpen(null)} name={delOpen?.name} />
    </div>
  );
}
