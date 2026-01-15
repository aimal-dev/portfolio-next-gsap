# Portfolio with Next.js, GSAP, and Custom CMS

This is a personal portfolio application built with **Next.js**, **GSAP** for animations, and a custom file-based **CMS** for managing content.

## Features

### 1. Dynamic Content Management (CMS)

A protected Dashboard (`/dashboard`) allows easy management of:

- **Projects**: Add, edit, delete projects with images and tags.
- **Experience**: Manage work history with company logos and descriptions.
- **Education**: Update academic background.
- **Certificates**: Upload certificate images and details.
- **Skills**: Update your skills list which reflects on the public About page.
- **Footer Links**: Manage social links (GitHub, LinkedIn, Twitter, Email).
- **Hero Section**: Update the main homepage introduction.

### 2. Interactive About Page

- **3D Skills Cloud**: A 3D rotating tag cloud visualizing technical skills using `TagCloud`.
- **Certificate Grid**: A premium grid layout for certificates with hover effects, background images, and detailed overlays.
- **Code Snippet Previews**: Context-aware previews that show a code-like representation of your data (JSON for data, Profile Card for Bio).
- **Tabs**: Smooth navigation between Bio, Education, Experience, and Certificates.

### 3. Animations

- Powered by **GSAP** (GreenSock Animation Platform) for smooth page transitions, stagger effects, and interactive elements.
- Custom `TechCloud` component for the 3D sphere effect.

### 4. Technical Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules & Global CSS
- **Animations**: GSAP & TagCloud
- **Icons**: Lucide React & DevIcon

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/aimal-dev/my-portfolio.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Access the App**:
    - Public Site: `http://localhost:3000`
    - Dashboard: `http://localhost:3000/dashboard`

## Deployment

This project is optimized for deployment on Vercel or Netlify. Ensure to persist the `data/db.json` and `uploads/` folder if using a file-based persistence strategy, or migrate to a database for production.
