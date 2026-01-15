"use server";

import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface HeroData {
    greeting: string;
    name: string;
    role: string;
    githubLink: string;
}

export interface ContactData {
    email: string;
    phone: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  skills: string[];
  icon: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certificate {
    id: number;
    name: string;
    issuer: string;
    date: string;
    link: string;
    image: string;
}

export interface AboutData {
    bio: string;
    image: string;
    skills: string[];
}

export interface FooterData {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
}

interface DB {
  projects: Project[];
  messages: Message[];
  profile?: unknown;
  hero?: HeroData;
  contact?: ContactData;
  about?: AboutData;
  experience?: Experience[];
  education?: Education[];
  certificates?: Certificate[];
  footer?: FooterData;
}

async function getDB(): Promise<DB> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Database read error:", error);
    return { projects: [], messages: [], profile: {} };
  }
}

async function saveDB(data: DB) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function getProjects() {
  const db = await getDB();
  return db.projects || [];
}

export async function getProfile() {
    const db = await getDB();
    return db.profile || {};
}

export async function getHero() {
  const db = await getDB();
  return db.hero || { greeting: "Hi all. I am", name: "Alex Dev", role: "> Frontend Engineer", githubLink: "https://github.com/example" };
}

export async function updateHero(formData: FormData) {
  const db = await getDB();
  db.hero = {
    greeting: formData.get('greeting') as string,
    name: formData.get('name') as string,
    role: formData.get('role') as string,
    githubLink: formData.get('githubLink') as string
  };
  await saveDB(db);
  return { success: true };
}

export async function getContact() {
  const db = await getDB();
  return db.contact || { email: "user@gmail.com", phone: "+3598246359" };
}

export async function updateContact(formData: FormData) {
  const db = await getDB();
  db.contact = {
    email: formData.get('email') as string,
    phone: formData.get('phone') as string
  };
  await saveDB(db);
  return { success: true };
}

export async function addProject(formData: FormData) {
  const db = await getDB();
  
  let imagePath = "/images/project1.jpg"; // Default
  const imageFile = formData.get('image') as File;
  if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      // Ensure dir exists
      try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
      
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      imagePath = `/uploads/${fileName}`;
  }

  const newProject: Project = {
    id: Date.now(),
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    tech: (formData.get('tech') as string).split(',').map(t => t.trim()),
    image: imagePath, 
    link: formData.get('link') as string
  };
  
  if (!db.projects) db.projects = [];
  db.projects.push(newProject);
  await saveDB(db);
  return { success: true };
}

export async function addMessage(formData: FormData) {
    const db = await getDB();
    
    const newMessage: Message = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      date: new Date().toISOString()
    };
    
    if (!db.messages) db.messages = [];
    db.messages.push(newMessage);
    await saveDB(db);
    return { success: true };
}

export async function deleteProject(id: number) {
  const db = await getDB();
  db.projects = db.projects.filter(p => p.id !== id);
  await saveDB(db);
  return { success: true };
}

export async function updateProject(formData: FormData) {
  const db = await getDB();
  const id = Number(formData.get('id'));
  const projectIndex = db.projects.findIndex(p => p.id === id);
  
  if (projectIndex > -1) {
      let imagePath = db.projects[projectIndex].image;
      const imageFile = formData.get('image') as File;
      
      if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
          
          await fs.writeFile(path.join(uploadDir, fileName), buffer);
          imagePath = `/uploads/${fileName}`;
      }

      db.projects[projectIndex] = {
        ...db.projects[projectIndex],
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        tech: (formData.get('tech') as string).split(',').map(t => t.trim()),
        link: formData.get('link') as string,
        image: imagePath
      };
      await saveDB(db);
  }
  return { success: true };
}

export async function getCertificates() {
    const db = await getDB();
    return db.certificates || [];
}

export async function addCertificate(formData: FormData) {
    const db = await getDB();
    
    let imagePath = "";
    const imageFile = formData.get('image') as File;
    
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const fileName = `cert-${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
        
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
        imagePath = `/uploads/${fileName}`;
    }

    const newCert: Certificate = {
        id: Date.now(),
        name: formData.get('name') as string,
        issuer: formData.get('issuer') as string,
        date: formData.get('date') as string,
        link: formData.get('link') as string,
        image: imagePath
    };
    
    if (!db.certificates) db.certificates = [];
    db.certificates.push(newCert);
    await saveDB(db);
    return { success: true };
}

export async function updateCertificate(formData: FormData) {
    const db = await getDB();
    const id = Number(formData.get('id'));
    
    if (!db.certificates) return { success: false };

    const index = db.certificates.findIndex(c => c.id === id);
    if (index > -1) {
        let imagePath = db.certificates[index].image || "";
        const imageFile = formData.get('image') as File;
        
        if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const fileName = `cert-${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
            
            await fs.writeFile(path.join(uploadDir, fileName), buffer);
            imagePath = `/uploads/${fileName}`;
        }

        db.certificates[index] = {
            ...db.certificates[index],
            name: formData.get('name') as string,
            issuer: formData.get('issuer') as string,
            date: formData.get('date') as string,
            link: formData.get('link') as string,
            image: imagePath
        };
        await saveDB(db);
    }
    return { success: true };
}

export async function deleteCertificate(id: number) {
    const db = await getDB();
    if (db.certificates) {
        db.certificates = db.certificates.filter(c => c.id !== id);
        await saveDB(db);
    }
    return { success: true };
}

export async function getFooter() {
    const db = await getDB();
    return db.footer || {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "contact@example.com"
    };
}

export async function updateFooter(formData: FormData) {
    const db = await getDB();
    db.footer = {
        github: formData.get('github') as string,
        linkedin: formData.get('linkedin') as string,
        twitter: formData.get('twitter') as string,
        email: formData.get('email') as string
    };
    await saveDB(db);
    return { success: true };
}

export async function getAbout() {
    const db = await getDB();
    return db.about || { 
        bio: "/**\n * About me\n * I have 5 years of experience in web\n * development specializing in Next.js,\n * React, and modern UI libraries like\n * GSAP and Framer Motion.\n *\n * I love solving complex problems and\n * creating immersive web experiences.\n */", 
        image: "",
        skills: []
    };
}

export async function updateAbout(formData: FormData) {
    const db = await getDB();
    
    let imagePath = db.about?.image || "";
    const imageFile = formData.get('image') as File;
    
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const fileName = `about-${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
        
        await fs.writeFile(path.join(uploadDir, fileName), buffer);
        imagePath = `/uploads/${fileName}`;
    }

    db.about = {
        bio: formData.get('bio') as string,
        image: imagePath,
        skills: (formData.get('skills') as string || "").split(',').map(s => s.trim()).filter(s => s)
    };
    
    await saveDB(db);
    return { success: true };
}

export async function getExperience() {
  const db = await getDB();
  return db.experience || [];
}

export async function addExperience(formData: FormData) {
  const db = await getDB();
  
  let iconPath = ""; 
  const iconFile = formData.get('icon') as File;
  if (iconFile && iconFile.size > 0 && iconFile.name !== 'undefined') {
      const buffer = Buffer.from(await iconFile.arrayBuffer());
      const fileName = `exp-${Date.now()}-${iconFile.name.replace(/\s/g, '-')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
      await fs.writeFile(path.join(uploadDir, fileName), buffer);
      iconPath = `/uploads/${fileName}`;
  }

  const newExp: Experience = {
    id: Date.now(),
    company: formData.get('company') as string,
    position: formData.get('position') as string,
    description: formData.get('description') as string,
    skills: (formData.get('skills') as string).split(',').map(t => t.trim()),
    icon: iconPath,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string
  };
  
  if (!db.experience) db.experience = [];
  db.experience.push(newExp);
  await saveDB(db);
  return { success: true };
}

export async function updateExperience(formData: FormData) {
  const db = await getDB();
  const id = Number(formData.get('id'));
  
  if (!db.experience) return { success: false };

  const index = db.experience.findIndex(e => e.id === id);
  if (index > -1) {
      let iconPath = db.experience[index].icon;
      const iconFile = formData.get('icon') as File;
      if (iconFile && iconFile.size > 0 && iconFile.name !== 'undefined') {
          const buffer = Buffer.from(await iconFile.arrayBuffer());
          const fileName = `exp-${Date.now()}-${iconFile.name.replace(/\s/g, '-')}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
          await fs.writeFile(path.join(uploadDir, fileName), buffer);
          iconPath = `/uploads/${fileName}`;
      }

      db.experience[index] = {
        ...db.experience[index],
        company: formData.get('company') as string,
        position: formData.get('position') as string,
        description: formData.get('description') as string,
        skills: (formData.get('skills') as string).split(',').map(t => t.trim()),
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        icon: iconPath
      };
      await saveDB(db);
  }
  return { success: true };
}

export async function deleteExperience(id: number) {
  const db = await getDB();
  if (db.experience) {
    db.experience = db.experience.filter(e => e.id !== id);
    await saveDB(db);
  }
  return { success: true };
}

export async function getEducation() {
  const db = await getDB();
  return db.education || [];
}

export async function addEducation(formData: FormData) {
  const db = await getDB();
  
  const newEdu: Education = {
    id: Date.now(),
    school: formData.get('school') as string,
    degree: formData.get('degree') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    description: formData.get('description') as string
  };
  
  if (!db.education) db.education = [];
  db.education.push(newEdu);
  await saveDB(db);
  return { success: true };
}

export async function updateEducation(formData: FormData) {
  const db = await getDB();
  const id = Number(formData.get('id'));

  if (!db.education) return { success: false };

  const index = db.education.findIndex(e => e.id === id);
  if (index > -1) {
    db.education[index] = {
      ...db.education[index],
      school: formData.get('school') as string,
      degree: formData.get('degree') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      description: formData.get('description') as string
    };
    await saveDB(db);
  }
  return { success: true };
}

export async function deleteEducation(id: number) {
  const db = await getDB();
  if (db.education) {
    db.education = db.education.filter(e => e.id !== id);
    await saveDB(db);
  }
  return { success: true };
}
