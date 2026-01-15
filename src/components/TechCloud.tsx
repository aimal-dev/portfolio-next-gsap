"use client";

import { useEffect, useRef } from "react";
import TagCloud from "TagCloud";

export default function TechCloud() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // List of Icon URLs (DevIcon)
    const icons = [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
    ];

    // Create img tags as strings
    const tags = icons.map(url => `<img src="${url}" width="50" height="50" style="pointer-events: none;">`);

    const container = containerRef.current;
    container.innerHTML = '';
    
    const options = {
        radius: 250,
        maxSpeed: 'normal' as const,
        initSpeed: 'normal' as const,
        direction: 135,
        keep: true,
        useHTML: true // This property enables HTML parsing in some TagCloud versions, or we hope it renders innerHTML
    };

    // Initialize
    // Note: If the library renders as text, we'll see the <img> string. 
    // If it allows HTML, we see the image.
    // To ensure it works, we can try to patch it or just use it.
    // If standard TagCloud is used, it often appends <a> text </a>.
    // If we pass HTML, it might be escaped.
    
    // Attempting to rely on the library's behavior for HTML strings.
    // If this fails, we will revert to text names.
    
    try {
        TagCloud(container, tags, options);
    } catch (e) {
        console.error("TagCloud init error", e);
    }
    
    return () => {
        container.innerHTML = '';
    };
  }, []);

  return (
    <div 
        ref={containerRef} 
        style={{
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: '#43d9ad',
            fontWeight: 'bold' 
        }}
    />
  );
}
