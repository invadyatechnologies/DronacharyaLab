import { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, Download, X, BookOpen } from 'lucide-react';
import { books, bookCategories } from '../data/staticData';
import { Table, Td, TypeBadge, ToolbarBtn, Chip, Card, SectionLabel, Modal, FormField, DeleteConfirm } from '../components/UI';

export default function BooksPage() {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('All');
  const [addOpen, setAddOpen] = useState(false);
  const [viewBook, setViewBook] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [delBook, setDelBook] = useState(null);
  const cats = ['All', ...new Set(books.map(b => b.category))];
  const list = books.filter(b => (b.name.toLowerCase().includes(q.toLowerCase()) || b.isbn.includes(q) || b.author.toLowerCase().includes(q.toLowerCase())) && (cat==='All'||b.category===cat));
  const hasF = q || cat!=='All';

  return (
    <div className="-mx-4 sm:-mx-5 lg:-mx-6 -mt-4 sm:-mt-5">
      <div className="sticky top-14 z-20 bg-white" style={{ borderBottom: '1px solid #E2E8F0' }}>
        <div className="px-4 sm:px-5 lg:px-6 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 flex-1 min-w-[180px]" style={{ height: 34, border: '1px solid #E2E8F0' }}><Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" /><input className="bg-transparent outline-none w-full text-[#0F172A] placeholder:text-[#CBD5E1]" style={{ fontSize: '0.78rem' }} placeholder="Search name, ISBN, author..." value={q} onChange={e=>setQ(e.target.value)} />{q&&<button onClick={()=>setQ('')}><X className="w-3 h-3 text-[#94A3B8]" /></button>}</div>
            <select value={cat} onChange={e=>setCat(e.target.value)} className="outline-none text-[#475569] bg-white" style={{ height: 34, padding: '0 8px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>{cats.map(c=><option key={c} value={c}>{c==='All'?'All Categories':c}</option>)}</select>
            {hasF&&<ToolbarBtn onClick={()=>{setQ('');setCat('All')}}><X size={12} /> Clear</ToolbarBtn>}
            <div className="flex-1" />
            <ToolbarBtn variant="success"><Download size={13} /> Export</ToolbarBtn>
            <ToolbarBtn variant="primary" onClick={()=>setAddOpen(true)}><Plus size={14} /> Add Book</ToolbarBtn>
          </div>
          {hasF&&<div className="flex items-center gap-1.5 mt-2">{q&&<Chip label={`"${q}"`} onRemove={()=>setQ('')} />}{cat!=='All'&&<Chip label={cat} onRemove={()=>setCat('All')} />}<span className="text-[#94A3B8] ml-1" style={{fontSize:'0.62rem'}}>{list.length} results</span></div>}
        </div>
      </div>

      <div className="px-4 sm:px-5 lg:px-6 py-4">
        <Table headers={['S.No','Book','ISBN','Category','Author','Shelf','Qty','Avail','Price','Actions']}>
          {list.map((b,i)=>(
            <tr key={b.id} className="hover:bg-[#FAFBFF]">
              <Td className="text-[#94A3B8] font-bold text-center" align="center">{i+1}</Td>
              <Td><div className="flex items-center gap-2"><div className="w-8 h-10 shrink-0 flex items-center justify-center" style={{background:'#FFFBEB',border:'1px solid #FDE68A'}}><BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" /></div><div><button onClick={()=>setViewBook(b)} className="font-bold text-[#0F172A] hover:text-[#2563EB] hover:underline cursor-pointer text-left" style={{fontSize:'0.78rem'}}>{b.name}</button><p className="text-[#94A3B8]" style={{fontSize:'0.6rem'}}>{b.publisher} • {b.edition}</p></div></div></Td>
              <Td><span className="font-mono text-[#64748B]" style={{fontSize:'0.66rem'}}>{b.isbn}</span></Td>
              <Td><TypeBadge type={b.category} /></Td>
              <Td><span style={{fontSize:'0.74rem'}}>{b.author}</span></Td>
              <Td><span className="font-mono text-[#64748B]" style={{fontSize:'0.68rem'}}>{b.shelf}/{b.rack}</span></Td>
              <Td align="center">{b.quantity}</Td>
              <Td align="center"><span className={`font-bold ${b.available>3?'text-[#047857]':b.available>0?'text-[#C2410C]':'text-[#DC2626]'}`}>{b.available}</span></Td>
              <Td>₹{b.price}</Td>
              <Td align="center"><div className="flex items-center justify-center gap-0.5">
                <button onClick={()=>setViewBook(b)} className="p-1 text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#2563EB]" style={{borderRadius:'4px'}}><Eye className="w-3.5 h-3.5" /></button>
                <button onClick={()=>setEditBook(b)} className="p-1 text-[#64748B] hover:bg-[#FFF7ED] hover:text-[#C2410C]" style={{borderRadius:'4px'}}><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={()=>setDelBook(b)} className="p-1 text-[#64748B] hover:bg-[#FEF2F2] hover:text-[#DC2626]" style={{borderRadius:'4px'}}><Trash2 className="w-3.5 h-3.5" /></button>
              </div></Td>
            </tr>
          ))}
          {list.length===0&&<tr><td colSpan={10} className="text-center py-10"><BookOpen className="w-10 h-10 text-[#E2E8F0] mx-auto mb-2" /><p className="text-[#64748B] font-semibold" style={{fontSize:'0.82rem'}}>No books found</p></td></tr>}
        </Table>
        <div className="flex items-center justify-between px-3 py-2" style={{border:'1px solid #E2E8F0',borderTop:'none'}}><span className="text-[#64748B]" style={{fontSize:'0.66rem'}}>Showing <strong className="text-[#0F172A]">{list.length}</strong> of <strong className="text-[#0F172A]">{books.length}</strong></span></div>
        <div className="mt-5"><SectionLabel>📂 Book Categories</SectionLabel><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">{bookCategories.map(c=><Card key={c.name} className="p-3"><h4 className="font-bold text-[#0F172A] mb-2" style={{fontSize:'0.78rem'}}>{c.name}</h4><div className="flex flex-wrap gap-1">{c.subcategories.map(s=><TypeBadge key={s} type={s} />)}</div></Card>)}</div></div>
      </div>

      {/* View Book */}
      <Modal open={!!viewBook} onClose={()=>setViewBook(null)} title={viewBook?.name||''} subtitle={viewBook?.isbn} headerBg="linear-gradient(135deg, #F59E0B, #D97706)">
        {viewBook && <div className="p-5 grid grid-cols-2 gap-x-5 gap-y-3">
          {[['Author',viewBook.author],['Publisher',viewBook.publisher],['Edition',viewBook.edition],['Language',viewBook.language],['Category',viewBook.category],['ISBN',viewBook.isbn],['Shelf',viewBook.shelf+'/'+viewBook.rack],['Quantity',viewBook.quantity],['Available',viewBook.available],['Price','₹'+viewBook.price],['Condition',viewBook.condition]].map(([l,v])=><div key={l}><p className="text-[#94A3B8] font-semibold uppercase" style={{fontSize:'0.55rem',letterSpacing:'0.4px'}}>{l}</p><p className="text-[#0F172A] font-semibold mt-0.5" style={{fontSize:'0.78rem'}}>{v}</p></div>)}
        </div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setViewBook(null)}>Close</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>{setEditBook(viewBook);setViewBook(null)}}><Edit2 size={13} /> Edit</ToolbarBtn></div>
      </Modal>

      {/* Add Book */}
      <Modal open={addOpen} onClose={()=>setAddOpen(false)} title="📚 Add New Book" subtitle="Fill in book details" width="620px">
        <div className="p-5 grid grid-cols-2 gap-3">
          {[{l:'Book Name'},{l:'ISBN Number'},{l:'Barcode'},{l:'Category',t:'select',o:bookCategories.flatMap(c=>c.subcategories)},{l:'Author'},{l:'Publisher'},{l:'Edition'},{l:'Language',t:'select',o:['English','Hindi','Chhattisgarhi']},{l:'Shelf Number'},{l:'Rack Number'},{l:'Quantity',t:'number'},{l:'Price',t:'number'},{l:'Purchase Date',t:'date'},{l:'Supplier'},{l:'Condition',t:'select',o:['New','Good','Fair','Poor']}].map(f=><FormField key={f.l} label={f.l} type={f.t||'text'} options={f.o} />)}
          <div className="col-span-2"><FormField label="Description" type="textarea" placeholder="Book description..." /></div>
        </div>
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setAddOpen(false)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setAddOpen(false)}>Save Book</ToolbarBtn></div>
      </Modal>

      {/* Edit Book */}
      <Modal open={!!editBook} onClose={()=>setEditBook(null)} title={`✏️ Edit — ${editBook?.name||''}`} subtitle="Update book details" width="620px">
        {editBook&&<div className="p-5 grid grid-cols-2 gap-3">
          <FormField label="Book Name" placeholder={editBook.name} /><FormField label="Author" placeholder={editBook.author} />
          <FormField label="Publisher" placeholder={editBook.publisher} /><FormField label="Edition" placeholder={editBook.edition} />
          <FormField label="Category" type="select" options={bookCategories.flatMap(c=>c.subcategories)} />
          <FormField label="Quantity" type="number" placeholder={String(editBook.quantity)} />
          <FormField label="Price" type="number" placeholder={String(editBook.price)} />
          <FormField label="Condition" type="select" options={['New','Good','Fair','Poor']} />
        </div>}
        <div className="px-5 py-3 flex justify-end gap-2" style={{borderTop:'1px solid #E2E8F0'}}><ToolbarBtn onClick={()=>setEditBook(null)}>Cancel</ToolbarBtn><ToolbarBtn variant="primary" onClick={()=>setEditBook(null)}>Update Book</ToolbarBtn></div>
      </Modal>

      <DeleteConfirm open={!!delBook} onClose={()=>setDelBook(null)} onConfirm={()=>setDelBook(null)} name={delBook?.name} />
    </div>
  );
}
