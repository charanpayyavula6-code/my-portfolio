import { useState } from 'react';
import {
  Sparkles,
  Eye,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Activity,
  Layers,
  Zap,
  Terminal,
  ExternalLink
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projectCategories, projectsData } from '../data/projects';
import { soundFX } from '../utils/audio';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const flagshipProject = projectsData[0]; // PPE Detection

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.filterCategory === activeFilter);

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Flagship Systems</div>
          <h2 className="section-title">Featured Engineering Projects</h2>
          <p className="section-subtitle">
            Autonomous deep learning models, decoupled web applications, and resilient cloud-connected prototypes.
          </p>
        </div>

        {/* FLAGSHIP SHOWCASE: AI PPE DETECTION */}
        <div
          className="bento-card"
          style={{
            marginBottom: 'var(--space-3xl)',
            padding: 'var(--space-2xl)',
            background: 'linear-gradient(135deg, rgba(10, 16, 31, 0.95) 0%, rgba(6, 11, 24, 0.9) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 0 50px rgba(0, 240, 255, 0.15)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
              gap: 'var(--space-2xl)',
              alignItems: 'center'
            }}
          >
            {/* Left side details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(0, 240, 255, 0.15)',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                >
                  FLAGSHIP SHOWCASE
                </span>
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    color: '#f59e0b',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600
                  }}
                >
                  {flagshipProject.status}
                </span>
              </div>

              <h3 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)' }}>
                {flagshipProject.title}
              </h3>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {flagshipProject.shortDescription}
              </p>

              {/* Architecture Pipeline Pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  INFERENCE PIPELINE:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  {['Camera Stream', 'OpenCV Preprocess', 'YOLOv8 Detection', 'Bounding Box IoU', 'Violation Alert'].map(
                    (step, i) => (
                      <span
                        key={i}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          color: i === 2 ? '#00f0ff' : 'var(--text-primary)'
                        }}
                      >
                        {step}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.5rem' }}>
                {flagshipProject.technologies.map((t, idx) => (
                  <span key={idx} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    soundFX.playSwitch();
                    setSelectedProject(flagshipProject);
                  }}
                  className="btn btn-primary"
                >
                  <span>Inspect System Architecture</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right side Visual Simulation HUD */}
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.08) 0%, rgba(3, 7, 18, 0.98) 100%)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: 'inset 0 0 30px rgba(0, 240, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Eye size={16} color="#00f0ff" />
                  <span style={{ fontSize: '0.8rem', color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                    LIVE VISION INFERENCE SIM
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: '#10b981',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  60 FPS // CUDA
                </span>
              </div>

              {/* Simulated Detection Viewport */}
              <div
                style={{
                  height: '180px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px dashed rgba(0, 240, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Bounding Box 1: Helmet */}
                <div
                  style={{
                    position: 'absolute',
                    top: '25px',
                    left: '70px',
                    width: '90px',
                    height: '55px',
                    border: '2px solid #00f0ff',
                    boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)',
                    borderRadius: '4px'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '0',
                      background: '#00f0ff',
                      color: '#030712',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '1px 4px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    HELMET 98.4%
                  </span>
                </div>

                {/* Bounding Box 2: Safety Vest */}
                <div
                  style={{
                    position: 'absolute',
                    top: '85px',
                    left: '55px',
                    width: '120px',
                    height: '80px',
                    border: '2px solid #10b981',
                    boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)',
                    borderRadius: '4px'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-16px',
                      left: '0',
                      background: '#10b981',
                      color: '#030712',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '1px 4px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    VEST 99.1%
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  [CAMERA_STREAM_FEED::ACTIVE]
                </div>
              </div>

              {/* Real-Time Telemetry Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    MODEL
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00f0ff' }}>YOLOv8</div>
                </div>
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    LATENCY
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>22ms</div>
                </div>
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    SAFETY
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>PASSED</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                soundFX.playSwitch();
              }}
              style={{
                padding: '0.45rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeFilter === cat ? 700 : 500,
                background: activeFilter === cat ? 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)' : 'var(--bg-card)',
                color: activeFilter === cat ? '#030712' : 'var(--text-secondary)',
                border: `1px solid ${activeFilter === cat ? 'transparent' : 'var(--border-color)'}`,
                boxShadow: activeFilter === cat ? '0 0 20px rgba(0, 240, 255, 0.4)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => {
                soundFX.playSwitch();
                setSelectedProject(p);
              }}
            />
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
