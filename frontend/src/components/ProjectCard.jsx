import { ExternalLink, ArrowUpRight, Eye, GraduationCap, Activity, ShieldAlert, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { soundFX } from '../utils/audio';

export default function ProjectCard({ project, onSelect }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Eye':
        return <Eye size={22} />;
      case 'GraduationCap':
        return <GraduationCap size={22} />;
      case 'Activity':
        return <Activity size={22} />;
      case 'ShieldAlert':
        return <ShieldAlert size={22} />;
      case 'Layers':
      default:
        return <Layers size={22} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return {
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.35)',
          color: '#10b981',
          label: 'Completed'
        };
      case 'In Progress':
        return {
          bg: 'rgba(0, 240, 255, 0.12)',
          border: 'rgba(0, 240, 255, 0.35)',
          color: 'var(--accent-cyan)',
          label: 'In Progress'
        };
      case 'Concept':
      default:
        return {
          bg: 'rgba(245, 158, 11, 0.12)',
          border: 'rgba(245, 158, 11, 0.35)',
          color: 'var(--accent-amber)',
          label: 'Project Concept'
        };
    }
  };

  const statusInfo = getStatusBadge(project.status);

  return (
    <article
      className="bento-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-xl)',
        borderRadius: 'var(--radius-xl)',
        transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={() => soundFX.playBlip(1100, 0.015)}
    >
      <div>
        {/* Top Meta Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem'
          }}
        >
          {/* Category Icon Badge */}
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)'
            }}
          >
            {getIcon(project.icon)}
          </div>

          {/* Status Badge */}
          <span
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              background: statusInfo.bg,
              border: `1px solid ${statusInfo.border}`,
              color: statusInfo.color,
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: statusInfo.color
              }}
            />
            {statusInfo.label}
          </span>
        </div>

        {/* Category tag */}
        <div
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            marginBottom: '0.4rem'
          }}
        >
          {project.category}
        </div>

        {/* Project Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            lineHeight: 1.3
          }}
        >
          {project.title}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.25rem'
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.5rem'
          }}
        >
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                alignSelf: 'center',
                fontFamily: 'var(--font-mono)'
              }}
            >
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <button
          onClick={() => {
            soundFX.playSwitch();
            onSelect(project);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--accent-cyan)',
            cursor: 'pointer'
          }}
        >
          <span>Blueprint Details</span>
          <ArrowUpRight size={16} />
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              style={{
                color: 'var(--text-muted)',
                padding: '0.35rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Application Demo"
              style={{
                color: 'var(--text-muted)',
                padding: '0.35rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
