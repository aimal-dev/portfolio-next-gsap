"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { Terminal, User, Code, Mail } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: '_hello', path: '/', icon: Terminal },
    { name: '_about-me', path: '/about', icon: User },
    { name: '_projects', path: '/projects', icon: Code },
    { name: '_contact-me', path: '/contact', icon: Mail },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.name}>alex-dev</span>
      </div>
      
      <div className={styles.links}>
        {navItems.map((item) => {
           const Icon = item.icon;
           const isActive = pathname === item.path;
           
           return (
            <Link 
              key={item.path} 
              href={item.path}
              className={clsx(styles.link, isActive && styles.active)}
            >
              <span className={styles.label}>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className={styles.extra}>
         {/* hidden dashboard link for admin */}
      </div>
    </nav>
  );
}
