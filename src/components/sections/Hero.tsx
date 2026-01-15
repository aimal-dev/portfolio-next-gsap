"use client";

import { useRef } from 'react';
import styles from './Hero.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface HeroProps {
  data: {
    greeting: string;
    name: string;
    role: string;
    githubLink: string;
  }
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const codeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 1 })
      .from(textRef.current, { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
      })
      .from(codeRef.current, { 
        x: 50, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
      }, "-=0.5");

  }, { scope: containerRef });

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.bgBlur}></div>
      
      <div className={styles.content}>
        <div className={styles.textSide} ref={textRef}>
          <p className={styles.greeting}>{data.greeting}</p>
          <h1 className={styles.name}>{data.name}</h1>
          <h2 className={styles.role}>{data.role}</h2>
          
          <div className={styles.commentBlock}>
            <p className="mono text-secondary">// complete the game to continue</p>
            <p className="mono text-secondary">// you can also find me on Github</p>
            <p className="mono">
              <span className="purple">const</span> <span className="green">githubLink</span> = <a href={data.githubLink} className="orange">"{data.githubLink}"</a>
            </p>
          </div>
        </div>

        <div className={styles.codeSide} ref={codeRef}>
          <div className={styles.codeWindow}>
             <div className={styles.windowHeader}>
               <div className={styles.dot}></div>
               <div className={styles.dot}></div>
               <div className={styles.dot}></div>
             </div>
             <div className={styles.windowBody}>
                <code className="mono">
                  <div className={styles.line}><span className="pink">import</span>React<span className="pink">from</span> 'react';</div>
                  <div className={styles.line}><span className="pink">import</span> {'{ useGSAP }'} <span className="pink">from</span> '@gsap/react';</div>
                  <br/>
                  <div className={styles.line}><span className="purple">function</span> <span className="yellow">Portfolio</span>() {'{'}</div>
                  <div className={styles.line} style={{paddingLeft: '20px'}}>
                     <span className="text-secondary">// TODO: Add amazing projects</span>
                  </div>
                  <div className={styles.line} style={{paddingLeft: '20px'}}>
                    <span className="purple">const</span> <span className="green">skills</span> = [<span className="orange">'Next.js'</span>, <span className="orange">'GSAP'</span>, <span className="orange">'TypeScript'</span>];
                  </div>
                   <div className={styles.line} style={{paddingLeft: '20px'}}>
                    <span className="purple">return</span> (
                  </div>
                   <div className={styles.line} style={{paddingLeft: '40px'}}>
                    &lt;<span className="yellow">div</span> className=<span className="orange">"awesome-portfolio"</span>&gt;
                  </div>
                  <div className={styles.line} style={{paddingLeft: '60px'}}>
                    {'{'} <span className="green">skills</span>.map(skill =&gt; &lt;<span className="yellow">Skill</span> key={'{skill}'} /&gt;) {'}'}
                  </div>
                   <div className={styles.line} style={{paddingLeft: '40px'}}>
                    &lt;/<span className="yellow">div</span>&gt;
                  </div>
                   <div className={styles.line} style={{paddingLeft: '20px'}}>
                    );
                  </div>
                  <div className={styles.line}>{'}'}</div>
                </code>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
