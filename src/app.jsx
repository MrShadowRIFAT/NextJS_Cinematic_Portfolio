import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, useAnimationFrame, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Play, X, Menu, Mail, Phone, MapPin, Download, Pause, Search, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink, Globe, Github, Linkedin } from 'lucide-react';
import archive from './data/projects.json';
import brands from './data/brands.json';
import './styles.css';

const MotionContext = createContext(true);
const EASE = [0.22, 1, 0.36, 1];
const categories = ['All', 'Platforms', 'Full-Stack', 'WordPress', 'E-Commerce', 'Streaming', 'Web Systems', 'Open Source'];
const featured = ['AnzoIT Limited Agency Platform', 'Dekhobhai Streaming Platform', '3D REACT INTERACTIVE SYSTEM'].map(key => archive.find(p => p.media === key || p.title === key)).filter(Boolean);

const experiences = [
  {
    date: '2023 – PRESENT',
    title: 'Technical Operations Manager',
    place: 'AnzoIT Limited · England',
    text: 'Delivered enterprise WordPress projects with cross-functional development teams and client collaboration. Managed Linux production environments, deployments, system maintenance, and website performance.'
  },
  {
    date: '2019 – PRESENT',
    title: 'WordPress & Full-Stack Developer',
    place: 'Global Clients · Remote',
    text: 'Built custom WordPress websites, themes, and WooCommerce solutions using PHP, HTML5, CSS3, JavaScript, and MySQL. Optimized performance, security, SEO, migrations, cPanel, DNS, and SSL deployments.'
  },
  {
    date: '2017 – 2026',
    title: 'Founder & Operator',
    place: 'Shadow Shop · Bangladesh',
    text: 'Engineered and scaled digital subscription platforms with automated payment integration and user management. Maintained 99.9% uptime, data security, automated backups, and cloud server scalability.'
  },
  {
    date: '2017 – PRESENT',
    title: 'Full-Stack Web Systems Specialist',
    place: 'Self-Taught & Production Systems',
    text: 'Architected real-world platforms across PHP, Python, JavaScript, Laravel, React, and Next.js. Deployed eCommerce systems, server infrastructure, and performance monitoring pipelines.'
  },
  {
    date: '2017 – PRESENT',
    title: 'Open Source & Community Support',
    place: 'Developer Ecosystem · Remote',
    text: 'Built and maintained publicly accessible developer tools and utilities on GitHub. Provided website setup, hosting troubleshooting, and system optimization guidance to global developers.'
  }
];

const certificates = [
  { title: 'HTML, CSS & JS for Web Devs', year: '2026', image: './Asset/img/SERTIFIKAT/jhu-webdev.jpg' },
  { title: 'HTML and CSS in Depth (Meta)', year: '2026', image: './Asset/img/SERTIFIKAT/meta-depth.jpg' },
  { title: 'Programming with JavaScript (Meta)', year: '2026', image: './Asset/img/SERTIFIKAT/meta-js.jpg' },
  { title: 'Google Ads & Analytics Certification', year: '2025', image: './Asset/img/SERTIFIKAT/google-analytics.jpg' }
];

const awards = [
  { year: '2026', title: 'HTML, CSS & JS for Developers', event: 'Johns Hopkins University' },
  { year: '2026', title: 'HTML and CSS in Depth', event: 'Meta Certified' },
  { year: '2026', title: 'Programming with JavaScript', event: 'Meta Certified' },
  { year: '2025', title: 'Google Ads & Analytics Certified', event: 'Google Digital Academy' },
  { year: '2023', title: 'Technical Operations Lead', event: 'AnzoIT Limited UK' },
  { year: '2019', title: 'A Level & O Level Distinction', event: 'British Council Bangladesh' }
];

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as];
  return <Component className={className} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}>{children}</Component>;
}

function MediaImage({ src, alt, className = '', priority = false, ...props }) {
  const [state, setState] = useState('loading');
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    setState(img?.complete ? (img.naturalWidth ? 'loaded' : 'error') : 'loading');
  }, [src]);
  return <span className={`media-image ${state} ${className}`}>
    {state === 'error' && <span className="image-fallback"><span className="display">R.</span><span>Preview unavailable</span></span>}
    <img ref={imgRef} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width="960" height="600" onLoad={() => setState('loaded')} onError={e => {
      if (e.currentTarget.src.includes('maxresdefault.jpg')) e.currentTarget.src = e.currentTarget.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
      else setState('error');
    }} {...props} />
  </span>;
}

function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  return <motion.a className={className} style={{ x, y }} onPointerMove={e => {
    if (!enabled || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.12); y.set((e.clientY - r.top - r.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }} {...props}>{children}</motion.a>;
}

function Header({ enabled, onToggle }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label="MrShadowRIFAT, Home">MRSHADOWRIFAT<span>®</span></a>
    <nav className="desktop-nav" aria-label="Main Navigation">{[['portfolio', 'Work'], ['awards', 'Credentials'], ['about', 'About'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="motion-toggle" onClick={onToggle} aria-label={enabled ? 'Pause animations' : 'Enable animations'} aria-pressed={!enabled}>
        {enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span>
      </button>
      <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
      <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X /> : <Menu />}
      </button>
    </div>
    <AnimatePresence>
      {open && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile Navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
        {[['home', 'Home'], ['portfolio', 'Work'], ['awards', 'Credentials'], ['about', 'About'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label], i) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={18} /></a>
        ))}
      </motion.nav>}
    </AnimatePresence>
  </header>;
}

function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  return <section id="home" className="hero" ref={ref}>
    <div className="hero-top">
      <span>FULL-STACK WEB DEVELOPER<br/><span className="muted">DIGITAL SYSTEMS SPECIALIST</span></span>
      <span className="availability"><i />AVAILABLE FOR HIRE & COLLABORATION</span>
    </div>
    <motion.div className="hero-title display" aria-hidden="true" style={enabled ? { y: titleY } : {}} initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.4, ease: EASE }}>
      DEVELOPER
    </motion.div>
    <motion.div className="hero-portrait" style={enabled ? { y: portraitY, scale: portraitScale } : {}} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>
      <img src="./Asset/img/rifat-portrait.png" alt="MrShadowRIFAT portrait" width="1024" height="1536" fetchPriority="high" />
    </motion.div>
    <motion.div className="hero-intro" style={enabled ? { y: copyY } : {}} initial={enabled ? { opacity: 0, x: -35 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
      <p className="handwriting">Hello, I’m</p>
      <h1 className="display">RIFAT<span>.</span></h1>
      <p className="hero-role">FULL-STACK WEB DEVELOPER &<br />DIGITAL SYSTEMS SPECIALIST</p>
      <p className="hero-description">Engineering resilient web architectures, custom WordPress systems, and modern full-stack platforms.<br />Delivering speed, security, and scalable digital solutions.</p>
      <Magnetic href="#portfolio" className="primary-link">Explore My Work <ArrowDown size={17}/></Magnetic>
      <span className="hero-location"><MapPin size={12} /> BANGLADESH · REMOTE WORLDWIDE</span>
    </motion.div>
    <motion.div className="hero-side" initial={enabled ? { opacity: 0, x: 30 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
      <div className="hero-manifesto">
        <span className="crosshair" aria-hidden="true">✳</span>
        <p>Every line of code.<br />Built for speed and scale.</p>
      </div>
      <div className="hero-stats">
        <div><span className="display">7<span>+</span></span><p>YEARS BUILDING<br/>DIGITAL PLATFORMS</p></div>
        <div><span className="display">50<span>+</span></span><p>COMPLETED PROJECTS<br/>& PLATFORMS</p></div>
        <div className="hero-award-stat"><span className="display">4<span>+</span></span><a href="#awards" aria-label="View certifications">CERTIFICATIONS<ArrowUpRight size={12}/></a></div>
        <a href="./Asset/cv/MrShadowRIFAT_CV.pdf" download><Download size={16}/><span>DOWNLOAD CV</span></a>
      </div>
    </motion.div>
    <div className="hero-bottom">
      <button className="reel-button" onClick={() => onProject(featured[0])}>
        <span className="play-circle"><Play size={12} fill="currentColor" /></span>VIEW HIGHLIGHTS<span className="muted">FEATURED WORK</span>
      </button>
      <span className="hero-scroll">SCROLL TO EXPLORE <ArrowDown size={13}/></span>
      <span className="edition">SELECTED WORK / 2017–2026</span>
    </div>
  </section>;
}

function ProjectCard({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const video = ['youtube', 'drive'].includes(project.type);
  const isWebsite = project.type === 'website';
  return <motion.article ref={ref} className="project-card" layout initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.08 }} transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }} exit={{ opacity: 0, scale: 0.96 }}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`View ${project.title}`}>
      <motion.div className="project-picture" style={enabled ? { y } : {}}><MediaImage src={project.image} alt={project.title}/></motion.div>
      <span className="project-type">{project.type === 'render' ? '3D INTERACTIVE' : isWebsite ? 'WEB PLATFORM' : video ? 'VIDEO CASE STUDY' : 'SYSTEM ARCHITECTURE'}</span>
      <span className="project-hover">{video ? <Play fill="currentColor" size={18}/> : <ArrowUpRight size={22}/>}</span>
      <span className="project-frame" aria-hidden="true" />
    </button>
    <button className="project-caption" onClick={() => onOpen(project)}>
      <span className="project-number display">{String(index + 1).padStart(2, '0')}</span>
      <span>
        <h3>{project.title}</h3>
        <span className="project-category">{project.category}{project.year ? ` / ${project.year}` : ''}</span>
      </span>
      <ArrowUpRight size={20}/>
    </button>
  </motion.article>;
}

function BrandStrip() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const loopWidth = useRef(0);
  const inView = useInView(ref);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (!ref.current || showAll) return;
    const update = () => { loopWidth.current = ref.current?.querySelector('.brand-set')?.getBoundingClientRect().width || 0; };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current); update();
    return () => observer.disconnect();
  }, [showAll]);
  useAnimationFrame((time, delta) => {
    if (!enabled || paused || interacting || !inView || showAll || !ref.current || !loopWidth.current) return;
    const el = ref.current;
    el.scrollLeft += Math.min(delta, 40) * 0.038;
    if (el.scrollLeft >= loopWidth.current) el.scrollLeft -= loopWidth.current;
  });
  const move = direction => { setPaused(true); ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .7, behavior: enabled ? 'smooth' : 'instant' }); };
  return <Reveal className="brand-section">
    <div className="brand-heading">
      <p>TRUSTED BY GLOBAL TEAMS<br/><strong>& MODERN TECH ECOSYSTEMS.</strong></p>
      <div>
        <button className="brand-all" onClick={() => setShowAll(v => !v)} aria-expanded={showAll} aria-controls="brand-collection">
          {showAll ? 'SHOW CAROUSEL' : `VIEW ALL (${brands.length})`}{showAll ? <Minus size={14}/> : <Plus size={14}/>}
        </button>
        {!showAll && <>
          <button className="icon-button brand-pause" aria-label={paused ? 'Play logo marquee' : 'Pause logo marquee'} aria-pressed={paused} onClick={() => setPaused(v => !v)}>
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          <button className="icon-button" onClick={() => move(-1)} aria-label="Previous logo"><ChevronLeft size={17}/></button>
          <button className="icon-button" onClick={() => move(1)} aria-label="Next logo"><ChevronRight size={17}/></button>
        </>}
      </div>
    </div>
    <div id="brand-collection" className={showAll ? 'brand-full-grid' : 'brand-viewport'} ref={ref} onPointerEnter={e => { if(e.pointerType==='mouse') setInteracting(true); }} onPointerLeave={() => setInteracting(false)} onPointerDown={() => setPaused(true)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} tabIndex={showAll ? undefined : 0} role={showAll ? 'list' : 'region'} aria-label="Technology and partner logos, scroll to view all">
      {showAll ? brands.map(b => <div className="brand-logo" key={b.file} role="listitem"><img src={`./Asset/svg/brand/${b.file}`} alt={b.name} title={b.name} width="150" height="60" loading="lazy"/><span>{b.name}</span></div>) : <div className="brand-rail">{[0,1].map(copy => <div className="brand-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>{brands.map(b => <div className="brand-logo" key={b.file}><img src={`./Asset/svg/brand/${b.file}`} alt={copy ? '' : b.name} title={b.name} width="150" height="60" loading="lazy" draggable="false"/></div>)}</div>)}</div>}
    </div>
  </Reveal>;
}

function Portfolio({ onProject }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);
  const results = archive.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.category} ${p.role}`.toLowerCase().includes(query.toLowerCase()));
  const projects = expanded || category !== 'All' || query ? results.slice(0, limit) : featured;
  return <section id="portfolio" className="portfolio section-wrap">
    <Reveal className="section-heading">
      <div>
        <span className="eyebrow">01 / SELECTED WORK</span>
        <h2>WORK THAT DELIVERS<span className="accent">.</span></h2>
      </div>
      <button className="text-link" onClick={() => { if (expanded) { setExpanded(false); setCategory('All'); setQuery(''); } else { setExpanded(true); setLimit(9); } }}>
        {expanded ? 'FEATURED WORK' : 'ALL PROJECTS'}<ArrowRight size={21}/>
      </button>
    </Reveal>
    <Reveal className="portfolio-toolbar">
      <div className="filters" role="group" aria-label="Project categories">
        {categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(true); setLimit(9); }}>{c}{c === category && <motion.span className="filter-line" layoutId="filter-line"/>}</button>)}
      </div>
      <label className="search-box">
        <Search size={15}/><span>Search</span>
        <input aria-label="Search projects" type="search" placeholder="Title, tech, or role…" value={query} onChange={e => { setQuery(e.target.value); setExpanded(true); setLimit(9); }}/>
      </label>
    </Reveal>
    <motion.div className="project-grid" layout>
      <AnimatePresence mode="popLayout">
        {projects.map((p, i) => <ProjectCard key={p.category + p.title + p.media} project={p} index={i} onOpen={onProject}/>)}
      </AnimatePresence>
    </motion.div>
    {projects.length === 0 && <div className="empty-state">
      <p>No projects found matching “{query}”.</p>
      <button className="text-link" onClick={() => { setQuery(''); setCategory('All'); }}>Reset search <X size={15}/></button>
    </div>}
    {expanded && results.length > limit && <div className="load-more">
      <button className="outline-button" onClick={() => setLimit(v => v + 9)}>Show more projects <Plus size={16}/></button>
      <span>{projects.length} of {results.length} projects</span>
    </div>}
    <BrandStrip/>
  </section>;
}

const processSteps = [
  ['01', 'THE ARCHITECTURE', 'Analyzing core requirements, data flows, APIs, and defining performance and security benchmarks.'],
  ['02', 'THE FOUNDATION', 'Setting up database schemas, modern frameworks (React / Next.js / WordPress), and deployment pipelines.'],
  ['03', 'THE BUILD', 'Writing clean, semantic, and maintainable code across front-end UI and server-side integrations.'],
  ['04', 'THE OPTIMIZATION', 'Optimizing Core Web Vitals, caching layers, asset delivery, mobile responsiveness, and SEO architecture.'],
  ['05', 'DEPLOY & SCALE', 'Automated testing, SSL provisioning, Cloudflare DNS routing, and ongoing server monitoring.']
];

function Awards({ onProject }) {
  const [expanded, setExpanded] = useState(false);
  const laurelPath = 'M48 94C8 68 9 30 35 5M22 61C8 60 3 49 3 44c12 0 19 6 19 17zm-5-19C5 35 6 23 8 19c11 5 13 14 9 23zm7-20C15 12 20 3 24 0c7 8 6 16 0 22zM31 79C17 79 8 70 7 64c13-2 22 4 24 15zm-3-18c-5-10-2-19 7-25 5 11 1 20-7 25zm10 24c-6-11-4-20 5-27 6 9 5 20-5 27z';
  return <section id="awards" className={`recognition section-wrap ${expanded ? 'awards-expanded' : ''}`}>
    <Reveal className="recognition-intro">
      <span className="eyebrow">CREDENTIALS & SPECIALIZATIONS</span>
      <h2 className="display">INDUSTRY CERTIFIED.<br/><span className="accent">SYSTEM MASTERY.</span></h2>
      <div className="award-total">
        <svg viewBox="0 0 60 100" aria-hidden="true"><path d={laurelPath} fill="currentColor"/></svg>
        <span className="display">4<span>+</span></span>
        <svg viewBox="0 0 60 100" aria-hidden="true"><g transform="translate(60 0) scale(-1 1)"><path d={laurelPath} fill="currentColor"/></g></svg>
        <span className="award-total-label">SPECIALIZATIONS</span>
      </div>
      <p>Verified by global leaders in engineering, analytics, and systems design.<br/>Backed by continuous real-world execution.</p>
      <button className="text-link award-proof" onClick={() => onProject({ ...certificates[0], type: 'image', media: certificates[0].image, category: 'Certification', description: 'Certified in modern web development standards and digital systems optimization.' })}>
        VIEW CERTIFICATE<ArrowUpRight size={18}/>
      </button>
    </Reveal>
    <div className="recognition-list">
      <div className="recognition-list-head"><span>SELECTED CREDENTIALS</span><span>2017 – 2026</span></div>
      <ol id="recognition-list">
        {awards.map((award, i) => <Reveal as="li" className={`recognition-row ${i > 2 ? 'additional-award' : ''}`} key={award.title + award.year} delay={i * .045}>
          <span className="award-index">0{i + 1}</span>
          <div><h3>{award.title}</h3><p>{award.event}</p></div>
          <span className="award-year display">{award.year}</span>
        </Reveal>)}
      </ol>
      <button className="award-expand" aria-expanded={expanded} aria-controls="recognition-list" onClick={() => setExpanded(v => !v)}>
        {expanded ? 'Collapse credentials' : 'View all credentials'}{expanded ? <Minus size={16}/> : <Plus size={16}/>}
      </button>
    </div>
  </section>;
}

function Breakdown() {
  const scene = featured.find(p => p.type === 'render');
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const [manual, setManual] = useState(false);
  const [cut, setCut] = useState(65);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!manual && enabled) setCut(Math.round(90 - v * 80)); });
  const titleX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  if (!scene) return null;
  const resize = url => url.replace('/upload/', '/upload/c_scale,w_1200,q_auto,f_auto/');
  return <section className="breakdown section-wrap" ref={ref} aria-labelledby="breakdown-title">
    <Reveal className="breakdown-copy">
      <span className="eyebrow">A LOOK UNDER THE HOOD</span>
      <motion.h2 id="breakdown-title" className="display" style={enabled ? { x: titleX } : {}}>
        FROM ARCHITECTURE.<br/><span className="accent">TO PRODUCTION.</span>
      </motion.h2>
      <p>One system. Multi-layered engineering.<br/>See how raw wireframe models and system logic transform into a responsive, high-performance web experience.</p>
      <span className="breakdown-credit">3D REACT INTERACTIVE SYSTEM / 2025<br/>NEXT.JS · THREE.JS · SHADER OPTIMIZATION</span>
    </Reveal>
    <Reveal className="comparison">
      <div className="comparison-stage" style={{'--cut': `${enabled || manual ? cut : 50}%`}}>
        <MediaImage src={resize(scene.renders[0].solid)} alt="Raw wireframe system layout"/>
        <div className="comparison-final">
          <MediaImage src={resize(scene.renders[0].final)} alt="Production ready rendered platform"/>
        </div>
        <span className="comparison-label raw-label">SOLID VIEW</span>
        <span className="comparison-label final-label">FINAL RENDER</span>
        <div className="comparison-divider"><span><ChevronLeft size={14}/><ChevronRight size={14}/></span></div>
        <input aria-label="Interactive architecture comparison slider" aria-valuetext={`${cut}% solid, ${100-cut}% final`} type="range" min="0" max="100" value={cut} onChange={e => { setManual(true); setCut(Number(e.target.value)); }}/>
      </div>
      <div className="comparison-caption">
        <span>DRAG TO INSPECT THE WORKFLOW</span>
        <span>DRAG / SCROLL</span>
      </div>
    </Reveal>
  </section>;
}

function About() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });
  return <section id="about" className="about section-wrap" ref={ref}>
    <Reveal className="about-lead">
      <div>
        <span className="eyebrow">02 / BEHIND THE SCREENS</span>
        <h2 className="display">NOT JUST WEBSITES.<br/>SCALABLE <span className="accent">SYSTEMS.</span></h2>
      </div>
      <p>I am MrShadowRIFAT, a Full-Stack Web Developer and Digital Systems Specialist from Bangladesh. With over 7 years operating digital subscription businesses and deploying high-traffic web solutions, I combine robust backend engineering, responsive front-ends, and system-level performance optimization.</p>
    </Reveal>
    <div className="studio-grid">
      <Reveal className="education-panel">
        <h3 className="panel-heading">EDUCATION & CREDENTIALS</h3>
        <p className="eyebrow accent">BACKGROUND</p>
        <div className="education-row">
          <strong>Full-Stack Web Development</strong><span>2017 – Present</span>
          <p>Self-Taught Path: PHP, Python, JavaScript, Laravel, React, Next.js.</p>
        </div>
        <div className="education-row">
          <strong>British Council</strong><span>2017 – 2019</span>
          <p>A Level (2019) & O Level (2017) qualifications, Bangladesh.</p>
        </div>
        <div className="education-row">
          <strong>Specialized Training</strong>
          <p>Meta (Frontend & JS) · Johns Hopkins (Web Dev) · Google Analytics</p>
        </div>
        <p className="eyebrow accent skills-heading">TECHNICAL TOOLKIT</p>
        <div className="skill-tags">
          {['Full-Stack Dev', 'PHP & Laravel', 'WordPress & Woo', 'React & Next.js', 'REST APIs', 'MySQL', 'Linux & VPS', 'Cloudflare & DNS', 'Core Web Vitals', 'SEO & Speed', 'Git & CI/CD', 'Security Hardening'].map(s => <span key={s}>{s}</span>)}
        </div>
        <div className="software-row">
          {[['vs', 'VS Code'], ['bl', 'Three.js / 3D'], ['ps', 'Photoshop'], ['pr', 'Premiere Pro'], ['ae', 'After Effects'], ['ai', 'Illustrator']].map(([file, name]) => <img key={file} src={`./Asset/svg/${file}.svg`} alt={name} title={name} loading="lazy" width="28" height="28"/>)}
        </div>
      </Reveal>
      <div className="process-panel">
        <Reveal><h3 className="panel-heading">FROM ARCHITECTURE TO PRODUCTION</h3></Reveal>
        <div className="process-list">
          <div className="process-track"><motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }}/></div>
          {processSteps.map(([num, title, text], i) => <Reveal key={num} className="process-row" delay={i * 0.035}>
            <span className="process-num display">{num}</span>
            <span className="process-node"/>
            <div><h4>{title}</h4><p>{text}</p></div>
          </Reveal>)}
        </div>
      </div>
      <Reveal className="quote-panel">
        <span className="quote-mark display">“</span>
        <blockquote>From architecture<br/>and data flows,<br/><em>to resilient, fast<br/>web platforms.</em></blockquote>
        <span className="handwriting">MrShadowRIFAT</span>
        <div className="quote-bottom">LET’S MAKE<br/>EVERY REQUEST COUNT.<span className="quote-symbol" aria-hidden="true">✳</span></div>
      </Reveal>
    </div>
  </section>;
}

function Journey({ onProject }) {
  const [open, setOpen] = useState(0);
  return <section id="experience" className="journey section-wrap">
    <Reveal className="section-heading">
      <div>
        <span className="eyebrow">03 / THE JOURNEY</span>
        <h2>CONTINUOUS EVOLUTION. MEASURABLE IMPACT<span className="accent">.</span></h2>
      </div>
      <a className="text-link" href="./Asset/cv/MrShadowRIFAT_CV.pdf" download>DOWNLOAD CV<Download size={16}/></a>
    </Reveal>
    <div className="journey-grid">
      <div className="experience-list">
        {experiences.map((job, i) => <Reveal className={`experience-row ${open === i ? 'is-open' : ''}`} key={job.title}>
          <button aria-expanded={open === i} aria-controls={`job-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            <span className="experience-date">{job.date}</span>
            <span><h3>{job.title}</h3><span className="experience-place">{job.place}</span></span>
            {open === i ? <Minus size={18}/> : <Plus size={18}/>}
          </button>
          <AnimatePresence initial={false}>
            {open === i && <motion.div id={`job-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
              <p>{job.text}</p>
            </motion.div>}
          </AnimatePresence>
        </Reveal>)}
      </div>
      <Reveal className="awards-panel">
        <p className="eyebrow">KEY MILESTONES</p>
        <h3 className="display">EXPERIENCE.<br/><span className="accent">SYSTEM MASTERY.</span></h3>
        <div className="award-list">
          {certificates.map((cert, i) => <button key={cert.title} onClick={() => onProject({ ...cert, type: 'image', media: cert.image, category: 'Certification', description: 'Certified in modern engineering standards and performance optimization.' })}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span>{cert.title}<small>{cert.year}</small></span>
            <ArrowUpRight size={19}/>
          </button>)}
        </div>
      </Reveal>
    </div>
  </section>;
}

function Contact({ onProject }) {
  const [sent, setSent] = useState(false);
  const send = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Hello MrShadowRIFAT, my name is ${data.get('name')}.\n\nProject Type: ${data.get('type')}\nDetails: ${data.get('message')}`;
    window.open(`https://wa.me/8801648049048?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return <section id="contact" className="contact section-wrap">
    <div className="contact-grid">
      <Reveal className="contact-intro">
        <span className="eyebrow">04 / YOUR NEXT PROJECT</span>
        <h2 className="display">LET’S WORK<br/>TOGETHER<span className="accent">.</span></h2>
        <p>Have a platform to build, an infrastructure to optimize, or need a dedicated full-stack engineer?<br/>Let’s build something extraordinary.</p>
        <Magnetic href="https://wa.me/8801648049048" target="_blank" rel="noopener noreferrer" className="contact-cta">
          <span className="round-arrow"><ArrowUpRight size={21}/></span>START A CONVERSATION
        </Magnetic>
      </Reveal>
      <Reveal className="contact-links" delay={0.1}>
        <a href="https://rifatweb.link" target="_blank" rel="noopener noreferrer"><Globe/><span><small>PRIMARY WEBSITE</small>rifatweb.link</span><ArrowUpRight size={16}/></a>
        <a href="mailto:contact@rifatweb.link"><Mail/><span><small>EMAIL</small>contact@rifatweb.link</span><ArrowUpRight size={16}/></a>
        <a href="https://github.com/MrShadowRIFAT" target="_blank" rel="noopener noreferrer"><Github/><span><small>GITHUB</small>@MrShadowRIFAT</span><ArrowUpRight size={16}/></a>
        <a href="https://linkedin.com/in/mrshadowrifat" target="_blank" rel="noopener noreferrer"><Linkedin/><span><small>LINKEDIN</small>mrshadowrifat</span><ArrowUpRight size={16}/></a>
        <a href="https://wa.me/8801648049048" target="_blank" rel="noopener noreferrer"><Phone/><span><small>PHONE / WHATSAPP</small>+880 1648-049048</span><ArrowUpRight size={16}/></a>
        <div><MapPin/><span><small>LOCATION</small>Bangladesh · Remote Worldwide</span></div>
      </Reveal>
      <Reveal className="contact-reel" delay={0.2}>
        <button onClick={() => onProject(featured[0])} aria-label="Explore featured platform highlight">
          <div className="reel-screen">
            <span className="reel-screen-top">MRSHADOWRIFAT®<span>FULL-STACK / SHOWCASE</span></span>
            <MediaImage src={featured[0]?.image} alt="Featured full-stack project highlight"/>
            <span className="reel-screen-title display">BUILT TO<br/><span>PERFORM.</span></span>
            <span className="play-circle"><Play size={18} fill="currentColor"/></span>
          </div>
          <span className="reel-caption">CLICK TO EXPLORE ARCHITECTURE.</span>
        </button>
      </Reveal>
    </div>
    <Reveal>
      <details className="project-brief">
        <summary>Tell me about your project <Plus size={19}/></summary>
        <form onSubmit={send}>
          <label>Your Name<input name="name" required placeholder="Your name or company" autoComplete="name" maxLength="100"/></label>
          <label>Project Type
            <select name="type">
              <option>Full-Stack Web Application</option>
              <option>WordPress & WooCommerce Development</option>
              <option>Speed & Core Web Vitals Optimization</option>
              <option>Linux Server & Cloud Infrastructure</option>
              <option>API & Custom Backend Integration</option>
              <option>Technical Operations & Consultation</option>
            </select>
          </label>
          <label className="brief-message">Project Details
            <textarea name="message" required rows="3" placeholder="Describe your goals, requirements, tech stack, and timeline…" maxLength="3000"/>
          </label>
          <button className="solid-button" type="submit">Continue to WhatsApp <ArrowUpRight size={18}/></button>
          <p className="form-note" role="status">{sent ? 'Draft message ready in WhatsApp. Press send there to connect.' : 'The brief will open as a pre-formatted message in WhatsApp.'}</p>
        </form>
      </details>
    </Reveal>
  </section>;
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const [renderMode, setRenderMode] = useState('final');
  const [shot, setShot] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [retried, setRetried] = useState(0);
  const enabled = useContext(MotionContext);
  const activeShot = project.type === 'render' ? project.renders[shot] : null;
  const embedType = activeShot?.video ? 'youtube' : activeShot?.drive ? 'drive' : project.type;
  const embedMedia = activeShot?.video || activeShot?.drive?.match(/\/d\/([^/]+)/)?.[1] || project.media;
  const isVideo = ['youtube', 'drive'].includes(embedType);
  const availableModes = [['layout', 'Layout'], ['solid', 'Solid'], ['material', 'Material'], ['lighting', 'Lighting'], ['final', 'Final render']].filter(([mode]) => activeShot?.[mode] && !(mode === 'solid' && activeShot.hideSolidMode));
  const effectiveMode = activeShot?.[renderMode] ? renderMode : availableModes[0]?.[0];
  const rendered = activeShot?.[effectiveMode] || activeShot?.image || project.image;
  const sourceUrl = embedType === 'youtube' ? `https://www.youtube.com/watch?v=${embedMedia}` : embedType === 'drive' ? `https://drive.google.com/file/d/${embedMedia}/view` : project.type === 'render' ? rendered : project.media || project.image;
  const changeShot = next => { setMediaLoaded(false); setMediaFailed(false); setShot(next); };
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const listener = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = [...ref.current.querySelectorAll('button, a[href], input, select, textarea, iframe')].filter(n => !n.disabled && n.getClientRects().length);
        const first = nodes[0]; const last = nodes.at(-1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', listener);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', listener); previous?.focus(); };
  }, [onClose]);
  useEffect(() => {
    if (!isVideo) return;
    const timer = setTimeout(() => { if (!mediaLoaded) setMediaFailed(true); }, 14000);
    return () => clearTimeout(timer);
  }, [mediaLoaded, retried, isVideo, embedMedia]);
  return <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={ref} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex="-1" initial={enabled ? { y: 45, scale: 0.97 } : false} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <div className="dialog-heading">
        <span className="eyebrow">{project.category} {project.year && ` / ${project.year}`}</span>
        <button onClick={onClose} className="icon-button" aria-label="Close modal"><X/></button>
      </div>
      <div className={`dialog-media ${!isVideo ? 'still' : ''}`}>
        {isVideo ? <>
          {!mediaLoaded && <div className="media-loading" role="status">
            {mediaFailed ? <>
              <p>Preview could not load directly. Open the original source to view.</p>
              <button className="outline-button" onClick={() => { setMediaFailed(false); setMediaLoaded(false); setRetried(v => v + 1); }}>Try again</button>
            </> : <>
              <span className={enabled ? 'loading-ring' : 'loading-ring paused'}/>
              <p>Loading project…</p>
            </>}
          </div>}
          <iframe key={`${embedMedia}-${retried}`} src={embedType === 'youtube' ? `https://www.youtube-nocookie.com/embed/${embedMedia}?autoplay=1&rel=0` : `https://drive.google.com/file/d/${embedMedia}/preview`} title={project.title} width="1280" height="720" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen onLoad={() => { setMediaLoaded(true); setMediaFailed(false); }} onError={() => setMediaFailed(true)}/>
        </> : <MediaImage src={rendered} alt={project.title} priority/>}
      </div>
      {project.type === 'render' && (availableModes.length > 0 || project.renders.length > 1) && <div className="render-controls">
        <div role="group" aria-label="Render stage">
          {availableModes.map(([mode, label]) => <button key={mode} className={effectiveMode === mode ? 'selected' : ''} onClick={() => setRenderMode(mode)} aria-pressed={effectiveMode === mode}>{label}</button>)}
        </div>
        {project.renders.length > 1 && <div className="shot-controls">
          <button className="icon-button" aria-label="Previous shot" onClick={() => changeShot((shot - 1 + project.renders.length) % project.renders.length)}><ChevronLeft/></button>
          <span>SHOT {shot + 1} / {project.renders.length}</span>
          <button className="icon-button" aria-label="Next shot" onClick={() => changeShot((shot + 1) % project.renders.length)}><ChevronRight/></button>
        </div>}
      </div>}
      <div className="dialog-description">
        <div>
          <h2 id="dialog-title">{project.title}</h2>
          {project.role && <span className="accent">{project.role}</span>}
          <p>{project.description}</p>
        </div>
        {sourceUrl && <a className="outline-button" href={sourceUrl} target="_blank" rel="noopener noreferrer">
          {project.type === 'website' ? 'Visit Website' : 'Open Source / Preview'}<ExternalLink size={15}/>
        </a>}
      </div>
      {isVideo && <p className="embed-note">If the video is restricted by the provider, please click "Open Source / Preview".</p>}
    </motion.div>
  </motion.div>;
}

function App() {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(() => { try { return localStorage.getItem('rifat-motion') !== 'off'; } catch { return true; } });
  const enabled = motionOn && !reduced;
  const [project, setProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  const toggle = () => { setMotionOn(!motionOn); try { localStorage.setItem('rifat-motion', motionOn ? 'off' : 'on'); } catch {} };
  const close = React.useCallback(() => setProject(null), []);
  return <MotionContext.Provider value={enabled}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
      <a className="skip-link" href="#portfolio">Skip to projects</a>
      <motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }}/>
      <Header enabled={enabled} onToggle={toggle}/>
      <main>
        <Hero onProject={setProject}/>
        <Portfolio onProject={setProject}/>
        <Awards onProject={setProject}/>
        <Breakdown/>
        <About/>
        <Journey onProject={setProject}/>
        <Contact onProject={setProject}/>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#home">MRSHADOWRIFAT<span>®</span></a>
        <span>© {new Date().getFullYear()} MRSHADOWRIFAT. ALL RIGHTS RESERVED · <a href="https://rifatweb.link" target="_blank" rel="noopener noreferrer" style={{color:'var(--red)'}}>RIFATWEB.LINK</a></span>
        <div>
          <a href="https://rifatweb.link" target="_blank" rel="noopener noreferrer" aria-label="Website rifatweb.link"><Globe size={17}/></a>
          <a href="https://github.com/MrShadowRIFAT" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17}/></a>
          <a href="https://linkedin.com/in/mrshadowrifat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={18}/></a>
        </div>
      </footer>
      <AnimatePresence>{project && <ProjectDialog key={project.title} project={project} onClose={close}/>}</AnimatePresence>
    </MotionConfig>
  </MotionContext.Provider>;
}

createRoot(document.getElementById('root')).render(<App/>);
