"use client";

import styles from './About.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { getExperience, getEducation, getAbout, getCertificates, Experience, Education, AboutData, Certificate } from "@/lib/actions";

import TechCloud from "@/components/TechCloud";

export default function AboutPage() {
    const containerRef = useRef(null);
    const [activeSection, setActiveSection] = useState('bio');
    const [experience, setExperience] = useState<Experience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [aboutData, setAboutData] = useState<AboutData | null>(null);

    useEffect(() => {
        getExperience().then(setExperience);
        getEducation().then(setEducation);
        getCertificates().then(setCertificates);
        getAbout().then(setAboutData);
    }, []);

    useGSAP(() => {
        // Animate content when tab changes
        gsap.fromTo(".fade-in", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
    }, { scope: containerRef, dependencies: [activeSection, aboutData] }); 

    // Parse bio text into lines for code-like display
    const bioLines = aboutData?.bio ? aboutData.bio.split('\n') : [];

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.navColumn}>
                <div className={styles.navItem} onClick={() => setActiveSection('bio')}>
                   <span className={styles.icon}>{activeSection === 'bio' ? 'v' : '>'}</span>
                   <span className={activeSection === 'bio' ? styles.folderActive : styles.folder}>personal-info</span>
                </div>
                <div className={`${styles.navItem} ${styles.subNav} ${activeSection === 'bio' ? styles.active : ''}`} onClick={() => setActiveSection('bio')}>
                   <span className={styles.iconV}>{activeSection === 'bio' ? '>' : ''}</span>
                   <span className={activeSection === 'bio' ? styles.folderActive : styles.folder}>bio</span>
                </div>

                <div className={`${styles.navItem} ${styles.subNav} ${activeSection === 'skills' ? styles.active : ''}`} onClick={() => setActiveSection('skills')}>
                   <span className={styles.iconV}>{activeSection === 'skills' ? '>' : ''}</span>
                   <span className={activeSection === 'skills' ? styles.folderActive : styles.folder}>skills</span>
                </div>
                
                 <div className={styles.navItem} onClick={() => setActiveSection('education')}>
                   <span className={styles.icon}>{activeSection === 'education' ? 'v' : '>'}</span>
                   <span className={activeSection === 'education' ? styles.folderActive : styles.folder}>education</span>
                </div>
                
                <div className={styles.navItem} onClick={() => setActiveSection('experience')}>
                   <span className={styles.icon}>{activeSection === 'experience' ? 'v' : '>'}</span>
                   <span className={activeSection === 'experience' ? styles.folderActive : styles.folder}>experience</span>
                </div>

                <div className={styles.navItem} onClick={() => setActiveSection('certificates')}>
                   <span className={styles.icon}>{activeSection === 'certificates' ? 'v' : '>'}</span>
                   <span className={activeSection === 'certificates' ? styles.folderActive : styles.folder}>certificates</span>
                </div>
            </div>
            
            <div className={styles.contentColumn}>
                <div className={styles.commentHeader}>
                    <span className={styles.comment}>{`// personal-info / ${activeSection}`}</span>
                </div>
                
                <div className={styles.textContent}>
                    {activeSection === 'bio' && (
                        <>
                            {bioLines.length === 0 && <p className="fade-in text-secondary">{`// Loading bio...`}</p>}
                            {bioLines.map((line, i) => (
                                <p key={i} className="fade-in">
                                    <span className={styles.lineNum}>{i + 1}</span> 
                                    <span className="text-secondary">{line}</span>
                    </p>
                            ))}
                        </>
                    )}

                    {activeSection === 'skills' && (
                        <div className="skills-container fade-in" style={{height: '100%', minHeight: '400px'}}>
                            <p className="text-secondary" style={{marginBottom: '1rem'}}>{`// My Technical Skills (3D Cloud)`}</p>
                            <TechCloud />
                            <div style={{marginTop: '2rem'}}>
                                <p className="text-secondary">{`// Key Technologies:`}</p>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem'}}>
                                    {aboutData?.skills?.map((skill, i) => (
                                        <span key={i} style={{background: 'rgba(67, 217, 173, 0.1)', color: '#43d9ad', padding: '4px 12px', borderRadius: 4, fontSize: '0.9rem'}}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'experience' && (
                        <div className="experience-list">
                            {experience.length === 0 && <p className="fade-in text-secondary">{`// No experience entries yet.`}</p>}
                            {experience.map((exp) => (
                                <div key={exp.id} className="fade-in" style={{marginBottom: '2rem'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem'}}>
                                        {exp.icon ? <Image src={exp.icon} alt={exp.company} width={24} height={24} style={{borderRadius: '50%'}} /> : <span style={{color: '#4d5bce'}}>*</span>}
                                        <h3 style={{margin: 0, color: '#4d5bce', fontWeight: 500}}>{exp.company}</h3>
                                    </div>
                                    <div style={{paddingLeft: '1rem', borderLeft: '1px solid #1e2d3d'}}>
                                         <p style={{margin: '5px 0', color: '#607b96'}}>{`// ${exp.position}`}</p>
                                         <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#607b96'}}>{exp.startDate} - {exp.endDate}</p>
                                         <div style={{margin: '10px 0', color: '#607b96', whiteSpace: 'pre-wrap'}}>
                                             {exp.description}
                                         </div>
                                         <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.8rem'}}>
                                             {exp.skills.map((skill, skIdx) => (
                                                 <span key={skIdx} style={{background: 'rgba(67, 217, 173, 0.1)', color: '#43d9ad', padding: '2px 8px', borderRadius: 4, fontSize: '0.8rem'}}>
                                                     {skill}
                                                 </span>
                                             ))}
                                         </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection === 'education' && (
                        <div className="education-list">
                            {education.length === 0 && <p className="fade-in text-secondary">{`// No education entries yet.`}</p>}
                             {education.map((edu) => (
                                <div key={edu.id} className="fade-in" style={{marginBottom: '2rem'}}>
                                    <h3 style={{color: '#fea55f', margin: 0}}>{edu.school}</h3>
                                    <div style={{paddingLeft: '1rem', borderLeft: '1px solid #1e2d3d', marginTop: '0.5rem'}}>
                                         <p style={{margin: '5px 0', color: '#607b96'}}>{`// ${edu.degree}`}</p>
                                         <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#607b96'}}>{edu.startDate} - {edu.endDate}</p>
                                         {edu.description && <p style={{marginTop: '10px', color: '#607b96'}}>{edu.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}



                    {activeSection === 'certificates' && (
                        <div className="certificates-list" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem'}}>
                             {certificates.length === 0 && <div className="fade-in text-secondary" style={{gridColumn: '1/-1'}}>{`// No certificates yet.`}</div>}
                             {certificates.map((cert) => (
                                <div key={cert.id} className={`${styles.certCard} fade-in`}>
                                    <h3 style={{color: '#5565e8', fontSize: '1rem', fontWeight: 600}}>
                                        {`// _${cert.name.toLowerCase().replace(/\s/g, '-')}`}
                                    </h3>
                                    
                                    <div className={styles.certWindow}>
                                        <div 
                                            className={styles.certBg}
                                            style={{
                                                backgroundImage: cert.image ? `url(${cert.image})` : undefined
                                            }} 
                                        />
                                        
                                        <div className={styles.certOverlay}>
                                            <h4 style={{color: '#43d9ad', marginBottom: '0.5rem', fontSize: '1.1rem'}}>{cert.name}</h4>
                                            <p style={{color: '#607b96', marginBottom: '0.5rem'}}>{cert.issuer}</p>
                                            <p style={{color: '#607b96', fontSize: '0.8rem', marginBottom: '1rem'}}>{cert.date}</p>
                                            
                                            {cert.link && (
                                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                                                    view-credential
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
             <div className={styles.previewColumn}>
                <h3 className={`${styles.previewTitle} fade-in`}>
                    {activeSection === 'bio' || activeSection === 'skills' ? '// Profile Preview:' : '// Code Snippet:'}
                </h3>
                
                <div className={`${styles.snippetCard} fade-in`}>
                   {activeSection === 'bio' || activeSection === 'skills' ? (
                        aboutData?.image ? (
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0'}}>
                                    <div style={{width: '200px', height: '200px', position: 'relative', marginBottom: '1rem'}}>
                                         <Image src={aboutData.image} alt="Profile" fill style={{borderRadius: '50%', border: '2px solid #43d9ad', objectFit: 'cover'}} />
                        </div>
                                    {activeSection === 'skills' && <p className="text-secondary" style={{fontSize: '0.9rem'}}>{`// Visualizing skills...`}</p>}
                    </div>
                        ) : (
                    <div className={styles.codeSnippet}>
                        <code>
                                        <span className="text-secondary">{`// No image uploaded yet`}</span><br/>
                                        <span className="purple">const</span> <span className="blue">profile</span> = {'{'}<br/>
                                        &nbsp;&nbsp;<span className="blue">name</span>: <span className="orange">&quot;Alex Dev&quot;</span>,<br/>
                                        &nbsp;&nbsp;<span className="blue">skills</span>: [<span className="orange">...loading</span>]<br/>
                            {'}'}
                        </code>
                    </div>
                        )
                   ) : (
                        <div className={styles.codeSnippet} style={{maxHeight: '400px', overflow: 'auto', fontSize: '0.8rem'}}>
                            <code>
                                <span className="purple">const</span> <span className="yellow">{activeSection}Data</span> = <span className="blue">JSON</span>.<span className="yellow">parse</span>(<span className="orange">`</span><br/>
                                <span className="text-secondary" style={{whiteSpace: 'pre-wrap'}}>
                                    {activeSection === 'experience' && JSON.stringify(experience, null, 2)}
                                    {activeSection === 'education' && JSON.stringify(education, null, 2)}
                                    {activeSection === 'certificates' && JSON.stringify(certificates, null, 2)}
                                </span><br/>
                                <span className="orange">`</span>);
                            </code>
                        </div>
                   )}
                </div>
            </div>
        </div>
    );
}
