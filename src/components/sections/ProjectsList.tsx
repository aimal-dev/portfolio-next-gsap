"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cpu } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export default function ProjectsPage({ projects }: { projects: Project[] }) {
  const containerRef = useRef(null);

  /* State for simulated loading of more projects */
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(projects);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
      setLoading(true);
      setTimeout(() => {
          // Simulate fetching more data by duplicating existing projects with new IDs
          const moreProjects = projects.map(p => ({...p, id: Date.now() + Math.random()}));
          setDisplayedProjects(prev => [...prev, ...moreProjects]);
          setLoading(false);
      }, 2000);
  };

  useGSAP(() => {
    gsap.fromTo(".project-card", 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef, dependencies: [displayedProjects] });

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <h1 className={styles.title}>_projects</h1>
        <p className={styles.subtitle}>{'// a collection of my work'}</p>
      </div>

      <div className={styles.grid}>
        {displayedProjects.map((project, index) => (
          <div key={project.id} className={`${styles.card} project-card`}>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>
                 <span className={styles.projectIndex}>Project {index + 1}</span> {'//'} _{project.title.toLowerCase().replace(/\s/g, '-')}
              </h3>
            </div>
            
            <div className={styles.cardWindow}>
               <div className={styles.bgImage} style={{backgroundImage: `url(${project.image})`}}>
                  <div className={styles.overlay}></div>
               </div>
               
               <div className={styles.cardContent}>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tech.map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                  <a href={project.link} className={styles.button}>
                     view-project
                  </a>
               </div>
               
               <div className={styles.iconOverlay}>
                   <Cpu size={24} className={styles.techIcon} />
               </div>
            </div>
          </div>
        ))}
        
        {loading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonHeader}></div>
                <div className={styles.skeletonWindow}>
                     <div className={styles.shimmer}></div>
                </div>
            </div>
        ))}
        
        {displayedProjects.length === 0 && !loading && (
            <div className={styles.empty}>
                <p>{'// No projects found. Add some in the dashboard!'}</p>
            </div>
        )}
      </div>
      
      {!loading && (
          <div className={styles.loadMoreContainer}>
              <button onClick={loadMore} className={styles.loadMoreBtn}>
                  load-more-content
              </button>
          </div>
      )}
    </div>
  );
}
