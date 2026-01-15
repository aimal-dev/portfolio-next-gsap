
 import styles from './AdminLayout.module.scss';
 import Link from 'next/link';
 import { LayoutDashboard, FileText, Settings, LogOut, Globe } from 'lucide-react';
 
 export default function AdminLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   return (
     <div className={styles.adminContainer}>
       <aside className={styles.sidebar}>
         <div className={styles.brand}>
            <LayoutDashboard />
            <span>CMS Admin</span>
         </div>
         
         <nav className={styles.menu}>
            {/* These are essentially filtered views on the main dashboard page */}
             <div className={`${styles.menuItem} ${styles.active}`}>
                 <layoutDashboard />
                 <span>Dashboard</span>
             </div>
             <Link href="/" className={styles.menuItem}>
                 <Globe />
                 <span>View Site</span>
             </Link>
         </nav>
       </aside>
       
       <main className={styles.contentArea}>
          <header className={styles.header}>
              <h3>Dashboard Overview</h3>
              <span className={styles.logout}><LogOut size={14} style={{display: 'inline', marginRight: 5}} /> Logout</span>
          </header>
          {children}
       </main>
     </div>
   );
 }
