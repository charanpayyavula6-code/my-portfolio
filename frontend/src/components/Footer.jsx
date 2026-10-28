import { ArrowUp, Mail, Sparkles, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { profileData } from '../data/profile';

export default function Footer({ onReplayIntro, onOpenResume }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-primary)',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-2xl)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Footer Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {/* Brand Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.1))',
                border: '1.5px solid var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  background: 'var(--grad-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                SC
              </span>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {profileData.fullName}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                B.E. Computer Science &amp; Engineering (AI &amp; ML) • Prathyusha Engineering College
              </div>
            </div>
          </div>

          {/* Social Links & Replay Intro */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onReplayIntro}
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-blue)';
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <Sparkles size={14} />
              <span>Replay Intro</span>
            </button>

            <button
              onClick={onOpenResume}
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-blue)';
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              Résumé
            </button>

            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              style={{
                color: 'var(--text-secondary)',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              style={{
                color: 'var(--text-secondary)',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href={profileData.socialLinks.email}
              aria-label="Direct Email"
              style={{
                color: 'var(--text-secondary)',
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Mail size={18} />
            </a>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              title="Scroll back to top"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {currentYear} {profileData.fullName}. All rights reserved.
          </div>

          <div>
            Designed &amp; built with <span style={{ color: 'var(--accent-cyan)' }}>React</span> &bull; Production Ready
          </div>
        </div>
      </div>
    </footer>
  );
}
