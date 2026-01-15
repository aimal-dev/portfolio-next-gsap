"use client";

import styles from './Footer.module.scss';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { getFooter, FooterData } from '@/lib/actions';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    getFooter().then(setData);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.label}>find me in:</span>
        <a href={data?.twitter || "https://twitter.com"} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <Twitter size={18} />
        </a>
        <a href={data?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <Linkedin size={18} />
        </a>
        {data?.email && (
            <a href={`mailto:${data.email}`} className={styles.socialLink}>
                <Mail size={18} />
            </a>
        )}
      </div>
      
      <div className={styles.right}>
        <a href={data?.github || "https://github.com"} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
          <span>{data?.github ? '@' + data.github.split('/').pop() : '@username'}</span>
          <Github size={18} />
        </a>
      </div>
    </footer>
  );
}
