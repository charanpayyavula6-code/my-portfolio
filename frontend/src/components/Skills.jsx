import { useState, useMemo } from 'react';
import {
  Code2,
  Cpu,
  Globe,
  Database,
  Wrench,
  CheckCircle,
  Search,
  Sparkles,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { soundFX } from '../utils/audio';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 size={20} />;
      case 'Cpu':
        return <Cpu size={20} />;
      case 'Globe':
        return <Globe size={20} />;
      case 'Database':
        return <Database size={20} />;
      case 'Wrench':
      default:
        return <Wrench size={20} />;
    }
  };

  // Filter categories and skills based on search query
  const filteredCategories = useMemo(() => {
    let cats = selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory);

    if (!searchQuery.trim()) return cats;

    const q = searchQuery.toLowerCase();
    return cats
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.level.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        )
      }))
      .filter((cat) => cat.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Neural Tech Matrix</div>
          <h2 className="section-title">Technical Competencies</h2>
          <p className="section-subtitle">
            Authentic, rigorously developed engineering capabilities across artificial intelligence, systems, and modern web architectures.
          </p>
        </div>

        {/* Search & Filter Station */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto var(--space-2xl) auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}
        >
          {/* Live Search Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.08)'
            }}
          >
            <Search size={18} color="var(--accent-cyan)" />
            <input
              type="text"
              placeholder="Search competencies (e.g., Python, Scikit-learn, React, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <button
              onClick={() => {
                setSelectedCategory('all');
                soundFX.playSwitch();
              }}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: selectedCategory === 'all' ? 700 : 500,
                background:
                  selectedCategory === 'all'
                    ? 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                color: selectedCategory === 'all' ? '#030712' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === 'all' ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
                boxShadow: selectedCategory === 'all' ? '0 0 20px rgba(0, 240, 255, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              All Disciplines
            </button>

            {skillCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    soundFX.playSwitch();
                  }}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected
                      ? 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#030712' : 'var(--text-secondary)',
                    border: `1px solid ${isSelected ? 'transparent' : 'rgba(255, 255, 255, 0.08)'}`,
                    boxShadow: isSelected ? '0 0 20px rgba(0, 240, 255, 0.4)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: filteredCategories.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {filteredCategories.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem 1rem',
                color: 'var(--text-muted)'
              }}
            >
              No skills match &quot;{searchQuery}&quot;. Try clearing your search term.
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bento-card"
                style={{
                  padding: 'var(--space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(0, 240, 255, 0.12)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      color: 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {cat.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      DOMAIN: {cat.shortCode}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {cat.description}
                </p>

                {/* Skills List in Domain */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        transition: 'all 0.2s ease'
                      }}
                      className="skill-item-card"
                      onMouseEnter={() => soundFX.playBlip(1200, 0.015)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.15rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(0, 240, 255, 0.1)',
                            color: 'var(--accent-cyan)',
                            border: '1px solid rgba(0, 240, 255, 0.25)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
