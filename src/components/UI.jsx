/* ═══ Summary Card ═══ */
export function SummaryCard({ label, value, icon, bgColor }) {
  return (
    <div className="relative overflow-hidden w-full" style={{ padding: '10px 14px', border: '1px solid #E2E8F0', background: bgColor }}>
      <div className="absolute -right-2 -bottom-2 opacity-[0.08]" style={{ fontSize: 0 }}>
        <span style={{ display: 'block', transform: 'scale(4)' }}>{icon}</span>
      </div>
      <div className="relative z-[1]">
        <p className="font-semibold text-[#475569] uppercase" style={{ fontSize: '0.62rem', letterSpacing: '0.4px', marginBottom: '3px' }}>{label}</p>
        <p className="font-extrabold text-[#0F172A]" style={{ fontSize: '1.15rem', lineHeight: 1.2 }}>{value}</p>
      </div>
    </div>
  );
}

/* ═══ Status Badge ═══ */
const STATUS_CFG = {
  Active: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Inactive: { bg: '#FFF7ED', color: '#C2410C', border: '#FDBA74', dot: '#F97316' },
  Blocked: { bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA', dot: '#EF4444' },
  Paid: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Pending: { bg: '#FFF7ED', color: '#C2410C', border: '#FDBA74', dot: '#F97316' },
  Issued: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', dot: '#3B82F6' },
  Returned: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Overdue: { bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA', dot: '#EF4444' },
  Lost: { bg: '#F9FAFB', color: '#4B5563', border: '#D1D5DB', dot: '#6B7280' },
  Damaged: { bg: '#FFF7ED', color: '#C2410C', border: '#FDBA74', dot: '#F97316' },
  Present: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Sent: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Scheduled: { bg: '#FFF7ED', color: '#C2410C', border: '#FDBA74', dot: '#F97316' },
  Available: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Occupied: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', dot: '#3B82F6' },
  Reserved: { bg: '#FFF7ED', color: '#C2410C', border: '#FDBA74', dot: '#F97316' },
  Maintenance: { bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA', dot: '#EF4444' },
  Online: { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', dot: '#10B981' },
  Offline: { bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA', dot: '#EF4444' },
};

export function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.Active;
  return (
    <span className="inline-flex items-center gap-1 font-semibold" style={{ padding: '2px 7px', fontSize: '0.64rem', background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot }} />
      {status}
    </span>
  );
}

/* ═══ Type Badge ═══ */
const TYPE_COLORS = {
  UPSC: { bg: '#EFF6FF', color: '#1D4ED8' }, SSC: { bg: '#ECFDF5', color: '#047857' },
  Banking: { bg: '#F5F3FF', color: '#6D28D9' }, Railway: { bg: '#FFF7ED', color: '#C2410C' },
  CGPSC: { bg: '#FDF2F8', color: '#BE185D' }, Vyapam: { bg: '#ECFEFF', color: '#0E7490' },
  Computer: { bg: '#F0FDFA', color: '#0F766E' }, Magazine: { bg: '#FFF7ED', color: '#C2410C' },
  English: { bg: '#EFF6FF', color: '#1D4ED8' },
};

export function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || { bg: '#F9FAFB', color: '#4B5563' };
  return <span className="inline-flex items-center font-semibold" style={{ padding: '2px 7px', fontSize: '0.6rem', background: c.bg, color: c.color }}>{type}</span>;
}

/* ═══ Page Header ═══ */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2" style={{ marginBottom: '12px' }}>
      <div>
        <h1 className="font-bold text-[#0F172A]" style={{ fontSize: '0.92rem', margin: 0 }}>{title}</h1>
        {subtitle && <p className="text-[#64748B]" style={{ fontSize: '0.68rem', margin: '1px 0 0 0' }}>{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-1.5 shrink-0">{children}</div>}
    </div>
  );
}

/* ═══ Toolbar Button ═══ */
export function ToolbarBtn({ children, variant = 'default', onClick, className = '' }) {
  const styles = { primary: 'bg-[#0F172A] text-white hover:bg-[#1E293B]', success: 'bg-[#059669] text-white hover:bg-[#047857]', default: 'bg-white text-[#64748B] hover:bg-[#F8FAFC]' };
  return <button onClick={onClick} className={`inline-flex items-center gap-1.5 font-semibold whitespace-nowrap ${styles[variant]} ${className}`} style={{ height: 34, padding: '0 12px', fontSize: '0.72rem', border: variant === 'default' ? '1px solid #E2E8F0' : 'none', boxShadow: 'none' }}>{children}</button>;
}

/* ═══ Table ═══ */
const headSx = 'text-left font-bold text-[#475569] uppercase bg-white whitespace-nowrap';
const headStyle = { fontSize: '0.66rem', letterSpacing: '0.4px', padding: '9px 14px', borderBottom: '2px solid #E2E8F0' };
const cellStyle = { fontSize: '0.76rem', padding: '7px 14px', borderBottom: '1px solid #F1F5F9', verticalAlign: 'middle' };

export function Table({ headers, children }) {
  return (
    <div style={{ border: '1px solid #E2E8F0', overflow: 'hidden', background: '#FFFFFF' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr>{headers.map(h => <th key={h} className={headSx} style={headStyle}>{h}</th>)}</tr></thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══ Table Cell ═══ */
export function Td({ children, align, className = '' }) {
  return <td className={`text-[#0F172A] ${className}`} style={{ ...cellStyle, textAlign: align }}>{children}</td>;
}

/* ═══ Section Label ═══ */
export function SectionLabel({ children }) {
  return <p className="font-bold text-[#94A3B8] uppercase" style={{ fontSize: '0.55rem', letterSpacing: '1.2px', marginBottom: '8px' }}>{children}</p>;
}

/* ═══ Card ═══ */
export function Card({ children, className = '' }) {
  return <div className={className} style={{ border: '1px solid #E2E8F0', background: '#FFFFFF' }}>{children}</div>;
}

/* ═══ Chip ═══ */
export function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 text-[#475569] font-medium" style={{ fontSize: '0.62rem', height: 22, padding: '0 8px', background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
      {label}
      <button onClick={onRemove} className="text-[#94A3B8] hover:text-[#475569]">×</button>
    </span>
  );
}

/* ═══ Modal ═══ */
import { X } from 'lucide-react';
export function Modal({ open, onClose, title, subtitle, children, width = '540px', headerBg }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3" onClick={onClose}>
      <div className="bg-white w-full overflow-hidden flex flex-col" style={{ maxWidth: width, maxHeight: '88vh', border: '1px solid #E2E8F0', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
        <div className="px-5 py-3.5 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid #E2E8F0', background: headerBg || '#FFFFFF' }}>
          <div><h3 className="font-bold" style={{ fontSize: '0.88rem', color: headerBg ? '#fff' : '#0F172A', margin: 0 }}>{title}</h3>{subtitle && <p style={{ fontSize: '0.62rem', color: headerBg ? 'rgba(255,255,255,0.7)' : '#94A3B8', margin: '2px 0 0 0' }}>{subtitle}</p>}</div>
          <button onClick={onClose} className="p-1 hover:bg-black/10" style={{ borderRadius: '4px' }}><X style={{ width: 16, height: 16, color: headerBg ? '#fff' : '#94A3B8' }} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

/* ═══ FormField ═══ */
export function FormField({ label, type = 'text', placeholder, options, value, onChange }) {
  return (
    <div>
      <label className="text-[#94A3B8] font-semibold uppercase block mb-1" style={{ fontSize: '0.55rem', letterSpacing: '0.5px' }}>{label}</label>
      {type === 'select' ? (
        <select className="w-full outline-none text-[#0F172A] bg-white" style={{ height: 34, border: '1px solid #E2E8F0', padding: '0 10px', fontSize: '0.78rem' }} value={value} onChange={onChange}>
          <option value="">Select {label}</option>
          {(options || []).map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea className="w-full outline-none text-[#0F172A] resize-none" style={{ height: 72, border: '1px solid #E2E8F0', padding: '8px 10px', fontSize: '0.78rem' }} placeholder={placeholder} value={value} onChange={onChange} />
      ) : (
        <input type={type} className="w-full outline-none text-[#0F172A]" style={{ height: 34, border: '1px solid #E2E8F0', padding: '0 10px', fontSize: '0.78rem' }} placeholder={placeholder} value={value} onChange={onChange} />
      )}
    </div>
  );
}

/* ═══ Delete Confirm Popover ═══ */
export function DeleteConfirm({ open, onClose, onConfirm, name }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-3" onClick={onClose}>
      <div className="bg-white w-full" style={{ maxWidth: 340, border: '1px solid #E2E8F0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
        <div className="p-5">
          <h4 className="font-bold text-[#0F172A]" style={{ fontSize: '0.88rem' }}>Delete Confirm?</h4>
          <p className="text-[#64748B] mt-1" style={{ fontSize: '0.74rem' }}>Delete <strong className="text-[#0F172A]">{name}</strong>? This cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="text-[#475569] font-semibold" style={{ fontSize: '0.76rem', padding: '6px 14px' }}>Cancel</button>
            <button onClick={onConfirm} className="bg-[#DC2626] text-white font-semibold hover:bg-[#B91C1C]" style={{ fontSize: '0.76rem', padding: '6px 14px' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
