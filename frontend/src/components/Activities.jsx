import { Briefcase, Boxes, Sparkles, Users, Award, Compass } from 'lucide-react';
import { activitiesData } from '../data/activities';
import { soundFX } from '../utils/audio';

export default function Activities() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase size={20} />;
      case 'Boxes':
        return <Boxes size={20} />;
      case 'Sparkles':
        return <Sparkles size={20} />;
      case 'Users':
      default:
        return <Users size={20} />;
    }
  };

  return (
    <section id="activities" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Engagement &amp; Growth</div>
          <h2 className="section-title">Activities &amp; Learning</h2>
          <p className="section-subtitle">
            Hands-on technical workshops, virtual internships, and collaborative engineering initiatives.
          </p>
        </div>

        {/* Activities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {activitiesData.map((act) => (
            <div
              key={act.id}
              className="bento-card"
              style={{
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-xl)',
                transition: 'all var(--transition-base)'
              }}
              onMouseEnter={() => soundFX.playBlip(1300, 0.015)}
            >
              <div>
                {/* Header Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)'
                    }}
                  >
                    {getIcon(act.icon)}
                  </div>

                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-blue)',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--badge-border)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600
                    }}
                  >
                    {act.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.3
                  }}
                >
                  {act.title}
                </h3>

                {/* Organization & Date */}
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent-cyan)',
                    fontWeight: 600,
                    marginBottom: '0.2rem'
                  }}
                >
                  {act.organization}
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.85rem'
                  }}
                >
                  {act.date}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}
                >
                  {act.description}
                </p>
              </div>

              {/* Verified Note */}
              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}
              >
                Curriculum &amp; Extracurricular Activity
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
