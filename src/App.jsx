import { useState } from 'react';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import StudentsPage from './pages/StudentsPage';
import BooksPage from './pages/BooksPage';
import SeatsPage from './pages/SeatsPage';
import FeesPage from './pages/FeesPage';
import AttendancePage from './pages/AttendancePage';
import BookIssuePage from './pages/BookIssuePage';
import InventoryPage from './pages/InventoryPage';
import StaffPage from './pages/StaffPage';
import VisitorsPage from './pages/VisitorsPage';
import DigitalLibraryPage from './pages/DigitalLibraryPage';
import ExamsPage from './pages/ExamsPage';
import NewspaperMagazinePage from './pages/NewspaperMagazinePage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CCTVPage from './pages/CCTVPage';
import UserRolesPage from './pages/UserRolesPage';
import QRFeaturesPage from './pages/QRFeaturesPage';
import SettingsPage from './pages/SettingsPage';
import MembershipPage from './pages/MembershipPage';

const T = {
  'dashboard':'🎯 Dashboard','all-students':'👨‍🎓 All Students','new-admission':'➕ New Admission',
  'membership':'💳 Membership','attendance':'📅 Attendance','seat-allocation':'🪑 Seat Allocation',
  'all-books':'📖 All Books','categories':'📂 Categories','issue-books':'📚 Issue Books',
  'return-books':'🔄 Return Books','all-seats':'🪑 All Seats','seat-map':'🗺️ Seat Map',
  'fee-collection':'💰 Fee Collection','pending-fees':'⚠️ Pending Fees','receipts':'🧾 Receipts',
  'inventory':'📦 Inventory','staff':'🏢 Staff','visitors':'📱 Visitors',
  'digital-library':'💻 Digital Library','exams':'📝 Exams','newspaper-magazine':'📰 News & Magazine',
  'notifications':'📢 Notifications','reports':'📊 Reports','analytics':'📈 Analytics',
  'cctv':'🎥 CCTV','user-roles':'🔒 User Roles','qr-features':'📱 QR Features','settings':'⚙️ Settings',
};

function P({ s }) {
  switch(s) {
    case 'dashboard': return <Dashboard />;
    case 'all-students': case 'new-admission': return <StudentsPage />;
    case 'membership': return <MembershipPage />;
    case 'attendance': return <AttendancePage />;
    case 'seat-allocation': return <SeatsPage view="seat-map" />;
    case 'all-books': case 'categories': return <BooksPage />;
    case 'issue-books': return <BookIssuePage view="issue" />;
    case 'return-books': return <BookIssuePage view="return" />;
    case 'all-seats': return <SeatsPage view="all" />;
    case 'seat-map': return <SeatsPage view="seat-map" />;
    case 'fee-collection': return <FeesPage view="fee-collection" />;
    case 'pending-fees': return <FeesPage view="pending-fees" />;
    case 'receipts': return <FeesPage view="receipts" />;
    case 'inventory': return <InventoryPage />;
    case 'staff': return <StaffPage />;
    case 'visitors': return <VisitorsPage />;
    case 'digital-library': return <DigitalLibraryPage />;
    case 'exams': return <ExamsPage />;
    case 'newspaper-magazine': return <NewspaperMagazinePage />;
    case 'notifications': return <NotificationsPage />;
    case 'reports': return <ReportsPage />;
    case 'analytics': return <AnalyticsPage />;
    case 'cctv': return <CCTVPage />;
    case 'user-roles': return <UserRolesPage />;
    case 'qr-features': return <QRFeaturesPage />;
    case 'settings': return <SettingsPage />;
    default: return <Dashboard />;
  }
}

export default function App() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Not logged in → show Login page
  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  // ── Logged in → show main system
  const sidebarW = collapsed ? 60 : 250;
  const handleLogout = () => {
    setUser(null);
    setSection('dashboard');
  };

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      <Sidebar activeSection={section} setActiveSection={setSection} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="min-h-screen flex flex-col transition-[margin] duration-200" style={{ marginLeft: 'var(--sw)' }}>
        <style>{`:root{--sw:0px}@media(min-width:1024px){:root{--sw:${sidebarW}px}}`}</style>
        <Header title={T[section]||'Dashboard'} onMenuClick={() => setMobileOpen(true)} onToggleSidebar={() => setCollapsed(!collapsed)} collapsed={collapsed} user={user} onLogout={handleLogout} />
        <main className="flex-1 bg-white px-4 sm:px-5 lg:px-6 py-4 sm:py-5"><P s={section} /></main>
      </div>
    </div>
  );
}
