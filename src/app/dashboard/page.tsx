"use client";
import { useFormStatus } from "react-dom";
import styles from './Dashboard.module.scss';
import { 
    addProject, updateProject, deleteProject, getProjects, 
    getHero, updateHero, 
    getContact, updateContact, 
    getExperience, addExperience, updateExperience, deleteExperience,
    getEducation, addEducation, updateEducation, deleteEducation,
    getAbout, updateAbout,
    getCertificates, addCertificate, updateCertificate, deleteCertificate,
    getFooter, updateFooter,
    Project, HeroData, ContactData, Experience, Education, AboutData, Certificate, FooterData
} from "@/lib/actions";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash } from 'lucide-react';

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={styles.submitBtn}>
            {pending ? "Processing..." : label}
        </button>
    );
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    
    // Experience State
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [editingExp, setEditingExp] = useState<Experience | null>(null);
    const [isAddingExp, setIsAddingExp] = useState(false);

    // Education State
    const [educations, setEducations] = useState<Education[]>([]);
    const [editingEdu, setEditingEdu] = useState<Education | null>(null);
    const [isAddingEdu, setIsAddingEdu] = useState(false);

    // Certificate State
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [editingCert, setEditingCert] = useState<Certificate | null>(null);
    const [isAddingCert, setIsAddingCert] = useState(false);

    const [heroData, setHeroData] = useState<HeroData | null>(null);
    const [contactData, setContactData] = useState<ContactData | null>(null);
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [footerData, setFooterData] = useState<FooterData | null>(null);

    const refreshData = () => {
        getProjects().then(setProjects);
        getHero().then(setHeroData);
        getContact().then(setContactData);
        getExperience().then(setExperiences);
        getEducation().then(setEducations);
        getAbout().then(setAboutData);
        getCertificates().then(setCertificates);
        getFooter().then(setFooterData);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleDelete = async (id: number) => {
        if(confirm('Are you sure you want to delete this project?')) {
            await deleteProject(id);
            refreshData();
        }
    }

    const handleDeleteExp = async (id: number) => {
        if(confirm('Are you sure you want to delete this experience?')) {
            await deleteExperience(id);
            refreshData();
        }
    }

    const handleDeleteEdu = async (id: number) => {
        if(confirm('Are you sure you want to delete this education?')) {
            await deleteEducation(id);
            refreshData();
        }
    }

    const handleDeleteCert = async (id: number) => {
        if(confirm('Are you sure you want to delete this certificate?')) {
            await deleteCertificate(id);
            refreshData();
        }
    }

    return (
    <div className={styles.dashboardGrid}>
      <nav className={styles.navPanel}>
          <button className={`${styles.navButton} ${activeTab === 'projects' ? styles.active : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
          <button className={`${styles.navButton} ${activeTab === 'experience' ? styles.active : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
          <button className={`${styles.navButton} ${activeTab === 'education' ? styles.active : ''}`} onClick={() => setActiveTab('education')}>Education</button>
          <button className={`${styles.navButton} ${activeTab === 'certificates' ? styles.active : ''}`} onClick={() => setActiveTab('certificates')}>Certificates</button>
          <button className={`${styles.navButton} ${activeTab === 'about' ? styles.active : ''}`} onClick={() => setActiveTab('about')}>About Me CMS</button>
          <button className={`${styles.navButton} ${activeTab === 'hero' ? styles.active : ''}`} onClick={() => setActiveTab('hero')}>Hello Page CMS</button>
          <button className={`${styles.navButton} ${activeTab === 'contact' ? styles.active : ''}`} onClick={() => setActiveTab('contact')}>Contact Info CMS</button>
          <button className={`${styles.navButton} ${activeTab === 'footer' ? styles.active : ''}`} onClick={() => setActiveTab('footer')}>Footer CMS</button>
      </nav>
      
      <main className={styles.mainPanel}>
        {activeTab === 'projects' && (
            <div>
                <div className={styles.sectionTitle}>
                    <h2>All Projects</h2>
                    {!isAdding && !editingProject && (
                        <button className={styles.submitBtn} onClick={() => setIsAdding(true)}>
                            <Plus size={16} style={{marginRight: 5}}/> Add New
                        </button>
                    )}
                </div>

                {isAdding && (
                    <div className={styles.formContainer}>
                        <h3>Add Project</h3>
                        <form action={async (formData) => { await addProject(formData); setIsAdding(false); refreshData(); }} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Title</label>
                                <input name="title" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea name="description" rows={3} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Tech Stack (comma separated)</label>
                                <input name="tech" placeholder="React, Node.js" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Image</label>
                                <input type="file" name="image" accept="image/*" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Link</label>
                                <input name="link" />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsAdding(false)}>Cancel</button>
                                <SubmitButton label="Create Project" />
                            </div>
                        </form>
                    </div>
                )}

                {editingProject && (
                     <div className={styles.formContainer}>
                        <h3>Edit Project: {editingProject.title}</h3>
                        <form action={async (formData) => { await updateProject(formData); setEditingProject(null); refreshData(); }} className={styles.form}>
                            <input type="hidden" name="id" value={editingProject.id} />
                            <div className={styles.formGroup}>
                                <label>Title</label>
                                <input name="title" defaultValue={editingProject.title} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea name="description" rows={3} defaultValue={editingProject.description} required />
                            </div>
                             <div className={styles.formGroup}>
                                <label>Current Image</label>
                                {editingProject.image && <img src={editingProject.image} alt="current" style={{height: 50, width: 'auto'}} />}
                                <input type="file" name="image" accept="image/*" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Tech Stack</label>
                                <input name="tech" defaultValue={editingProject.tech.join(', ')} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Link</label>
                                <input name="link" defaultValue={editingProject.link} />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditingProject(null)}>Cancel</button>
                                <SubmitButton label="Save Changes" />
                            </div>
                        </form>
                    </div>
                )}

                {!isAdding && !editingProject && (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Tech</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.tech.join(', ')}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.btnEdit} onClick={() => setEditingProject(p)}>
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className={styles.btnDelete} onClick={() => handleDelete(p.id)}>
                                            <Trash size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )}

        {activeTab === 'experience' && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>Experience</h2>
                     {!isAddingExp && !editingExp && (
                        <button className={styles.submitBtn} onClick={() => setIsAddingExp(true)}>
                            <Plus size={16} style={{marginRight: 5}}/> Add New
                        </button>
                    )}
                </div>

                {isAddingExp && (
                     <div className={styles.formContainer}>
                        <h3>Add Experience</h3>
                        <form action={async (formData) => { await addExperience(formData); setIsAddingExp(false); refreshData(); }} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Company Name</label>
                                <input name="company" required />
                            </div>
                             <div className={styles.formGroup}>
                                <label>Company Icon</label>
                                <input type="file" name="icon" accept="image/*" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Position</label>
                                <input name="position" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Duration (Start - End)</label>
                                <div style={{display: 'flex', gap: 10}}>
                                    <input name="startDate" placeholder="Jan 2023" required />
                                    <input name="endDate" placeholder="Present" required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description (List or Paragraphs)</label>
                                <textarea name="description" rows={5} placeholder="Use - for list items" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Skills (comma separated)</label>
                                <input name="skills" placeholder="React, Agile, etc." required />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsAddingExp(false)}>Cancel</button>
                                <SubmitButton label="Add Experience" />
                            </div>
                        </form>
                    </div>
                )}

                 {editingExp && (
                     <div className={styles.formContainer}>
                        <h3>Edit Experience: {editingExp.company}</h3>
                        <form action={async (formData) => { await updateExperience(formData); setEditingExp(null); refreshData(); }} className={styles.form}>
                            <input type="hidden" name="id" value={editingExp.id} />
                             <div className={styles.formGroup}>
                                <label>Company Name</label>
                                <input name="company" defaultValue={editingExp.company} required />
                            </div>
                             <div className={styles.formGroup}>
                                <label>Current Icon</label>
                                {editingExp.icon && <img src={editingExp.icon} alt="icon" style={{height: 30, width: 'auto'}} />}
                                <input type="file" name="icon" accept="image/*" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Position</label>
                                <input name="position" defaultValue={editingExp.position} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Duration (Start - End)</label>
                                <div style={{display: 'flex', gap: 10}}>
                                    <input name="startDate" defaultValue={editingExp.startDate} required />
                                    <input name="endDate" defaultValue={editingExp.endDate} required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea name="description" rows={5} defaultValue={editingExp.description} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Skills</label>
                                <input name="skills" defaultValue={editingExp.skills.join(', ')} required />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditingExp(null)}>Cancel</button>
                                <SubmitButton label="Save Changes" />
                            </div>
                        </form>
                    </div>
                )}

                {!isAddingExp && !editingExp && (
                     <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences.map(e => (
                                <tr key={e.id}>
                                    <td style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                        {e.icon && <img src={e.icon} alt="" style={{height: 20, width: 20, borderRadius: '50%'}} />}
                                        {e.company}
                                    </td>
                                    <td>{e.position}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.btnEdit} onClick={() => setEditingExp(e)}>
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className={styles.btnDelete} onClick={() => handleDeleteExp(e.id)}>
                                            <Trash size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

             </div>
        )}

        {activeTab === 'education' && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>Education</h2>
                     {!isAddingEdu && !editingEdu && (
                        <button className={styles.submitBtn} onClick={() => setIsAddingEdu(true)}>
                            <Plus size={16} style={{marginRight: 5}}/> Add New
                        </button>
                    )}
                </div>

                {isAddingEdu && (
                     <div className={styles.formContainer}>
                        <h3>Add Education</h3>
                        <form action={async (formData) => { await addEducation(formData); setIsAddingEdu(false); refreshData(); }} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>School / University</label>
                                <input name="school" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Degree</label>
                                <input name="degree" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Duration (Start - End)</label>
                                <div style={{display: 'flex', gap: 10}}>
                                    <input name="startDate" placeholder="2018" required />
                                    <input name="endDate" placeholder="2022" required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description / Honors</label>
                                <textarea name="description" rows={3} />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsAddingEdu(false)}>Cancel</button>
                                <SubmitButton label="Add Education" />
                            </div>
                        </form>
                    </div>
                )}

                 {editingEdu && (
                     <div className={styles.formContainer}>
                        <h3>Edit Education: {editingEdu.school}</h3>
                        <form action={async (formData) => { await updateEducation(formData); setEditingEdu(null); refreshData(); }} className={styles.form}>
                            <input type="hidden" name="id" value={editingEdu.id} />
                            <div className={styles.formGroup}>
                                <label>School / University</label>
                                <input name="school" defaultValue={editingEdu.school} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Degree</label>
                                <input name="degree" defaultValue={editingEdu.degree} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Duration (Start - End)</label>
                                <div style={{display: 'flex', gap: 10}}>
                                    <input name="startDate" defaultValue={editingEdu.startDate} required />
                                    <input name="endDate" defaultValue={editingEdu.endDate} required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description / Honors</label>
                                <textarea name="description" rows={3} defaultValue={editingEdu.description} />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditingEdu(null)}>Cancel</button>
                                <SubmitButton label="Save Changes" />
                            </div>
                        </form>
                    </div>
                )}

                {!isAddingEdu && !editingEdu && (
                     <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>School</th>
                                <th>Degree</th>
                                <th>Dates</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations.map(e => (
                                <tr key={e.id}>
                                    <td>{e.school}</td>
                                    <td>{e.degree}</td>
                                    <td>{e.startDate} - {e.endDate}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.btnEdit} onClick={() => setEditingEdu(e)}>
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className={styles.btnDelete} onClick={() => handleDeleteEdu(e.id)}>
                                            <Trash size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

             </div>
        )}

        {activeTab === 'certificates' && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>Certificates & Licenses</h2>
                     {!isAddingCert && !editingCert && (
                        <button className={styles.submitBtn} onClick={() => setIsAddingCert(true)}>
                            <Plus size={16} style={{marginRight: 5}}/> Add New
                        </button>
                    )}
                </div>

                {isAddingCert && (
                     <div className={styles.formContainer}>
                        <h3>Add Certificate</h3>
                        <form action={async (formData) => { await addCertificate(formData); setIsAddingCert(false); refreshData(); }} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Certificate Name</label>
                                <input name="name" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Issuing Organization</label>
                                <input name="issuer" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Issue Date</label>
                                <input name="date" placeholder="May 2024" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Credential Link</label>
                                <input name="link" placeholder="https://..." />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Certificate Image (Optional)</label>
                                <input type="file" name="image" accept="image/*" />
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsAddingCert(false)}>Cancel</button>
                                <SubmitButton label="Add Certificate" />
                            </div>
                        </form>
                    </div>
                )}

                 {editingCert && (
                     <div className={styles.formContainer}>
                        <h3>Edit Certificate: {editingCert.name}</h3>
                        <form action={async (formData) => { await updateCertificate(formData); setEditingCert(null); refreshData(); }} className={styles.form}>
                            <input type="hidden" name="id" value={editingCert.id} />
                            <div className={styles.formGroup}>
                                <label>Certificate Name</label>
                                <input name="name" defaultValue={editingCert.name} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Issuing Organization</label>
                                <input name="issuer" defaultValue={editingCert.issuer} required />
                            </div>
                             <div className={styles.formGroup}>
                                <label>Issue Date</label>
                                <input name="date" defaultValue={editingCert.date} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Credential Link</label>
                                <input name="link" defaultValue={editingCert.link} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Certificate Image (Optional)</label>
                                <input type="file" name="image" accept="image/*" />
                                {editingCert.image && <p style={{fontSize: '0.8rem', color: '#666'}}>Current: {editingCert.image}</p>}
                            </div>
                            <div>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditingCert(null)}>Cancel</button>
                                <SubmitButton label="Save Changes" />
                            </div>
                        </form>
                    </div>
                )}

                {!isAddingCert && !editingCert && (
                     <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Issuer</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.map(c => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td>{c.issuer}</td>
                                    <td>{c.date}</td>
                                    <td className={styles.actions}>
                                        <button className={styles.btnEdit} onClick={() => setEditingCert(c)}>
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className={styles.btnDelete} onClick={() => handleDeleteCert(c.id)}>
                                            <Trash size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

             </div>
        )}

        {activeTab === 'about' && aboutData && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>About Me Content</h2>
                </div>
                <form action={async (formData) => { await updateAbout(formData); refreshData(); alert('Saved!'); }} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Profile Image</label>
                         {aboutData.image && (
                             <div style={{marginBottom: 10}}>
                                 <img src={aboutData.image} alt="Profile" style={{width: 100, height: 100, borderRadius: '10px', objectFit: 'cover'}} />
                             </div>
                         )}
                        <input type="file" name="image" accept="image/*" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Bio (supports code-like formatting)</label>
                        <textarea name="bio" rows={15} defaultValue={aboutData.bio} style={{fontFamily: 'monospace'}} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Skills (Comma separated)</label>
                        <input name="skills" defaultValue={aboutData.skills ? aboutData.skills.join(', ') : ''} placeholder="React, Next.js, GSAP, TypeScript" />
                    </div>
                    <SubmitButton label="Save Changes" />
                </form>
            </div>
        )}

        {activeTab === 'hero' && heroData && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>Hello Page Content</h2>
                </div>
                <form action={async (formData) => { await updateHero(formData); refreshData(); alert('Saved!'); }} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Greeting Text</label>
                        <input name="greeting" defaultValue={heroData.greeting} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Display Name</label>
                        <input name="name" defaultValue={heroData.name} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Role / Job Title</label>
                        <input name="role" defaultValue={heroData.role} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Github URL</label>
                        <input name="githubLink" defaultValue={heroData.githubLink} />
                    </div>
                    <SubmitButton label="Save Changes" />
                </form>
            </div>
        )}

        {activeTab === 'contact' && contactData && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>Contact Information</h2>
                </div>
                <form action={async (formData) => { await updateContact(formData); refreshData(); alert('Saved!'); }} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input name="email" defaultValue={contactData.email} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input name="phone" defaultValue={contactData.phone} />
                    </div>
                    <SubmitButton label="Save Contact Info" />
                </form>
            </div>
        )}

        {activeTab === 'footer' && (
             <div>
                <div className={styles.sectionTitle}>
                    <h2>Footer Links</h2>
                </div>
                 <div className={styles.formContainer}>
                    <form action={async (formData) => { await updateFooter(formData); refreshData(); alert('Saved!'); }} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>GitHub Link</label>
                            <input name="github" defaultValue={footerData?.github || ''} placeholder="https://github.com/..." />
                        </div>
                        <div className={styles.formGroup}>
                            <label>LinkedIn Link</label>
                            <input name="linkedin" defaultValue={footerData?.linkedin || ''} placeholder="https://linkedin.com/in/..." />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Twitter/X Link</label>
                            <input name="twitter" defaultValue={footerData?.twitter || ''} placeholder="https://twitter.com/..." />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <input name="email" defaultValue={footerData?.email || ''} placeholder="contact@example.com" />
                        </div>
                        <SubmitButton label="Save Footer Links" />
                    </form>
                </div>
             </div>
        )}
      </main>
    </div>
  );
}
