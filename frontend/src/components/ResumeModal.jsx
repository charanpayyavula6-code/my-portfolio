import { useEffect, useState } from 'react';
import { X, Download, FileText, CheckCircle2, AlertTriangle, ExternalLink, Printer, Mail, Phone, MapPin, Globe, Award, Briefcase, BookOpen } from 'lucide-react';
import { profileData } from '../data/profile';
import { soundFX } from '../utils/audio';

export default function ResumeModal({ onClose }) {
  const [downloadStatus, setDownloadStatus] = useState('idle');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handlePrint = () => {
    soundFX.playSwitch();
    window.print();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'var(--space-2xl)',
          background: 'var(--bg-card)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '0 0 50px rgba(0, 240, 255, 0.25), 0 25px 60px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)'
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <h2
                id="resume-modal-title"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}
              >
                Curriculum Vitae / Official Résumé
              </h2>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                Payyavula Sri Charan • Verified Candidate Profile
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handlePrint}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => {
                soundFX.playSwitch();
                onClose();
              }}
              aria-label="Close résumé modal"
              style={{
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Verified Résumé Document View */}
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)'
          }}
          id="printable-resume"
        >
          {/* Header Block */}
          <div style={{ borderBottom: '2px solid rgba(0, 240, 255, 0.3)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Payyavula Sri Charan
            </h1>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem 1.25rem',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span>📍 Nellore, Andhra Pradesh - 524303</span>
              <span>📞 +91 9346733016</span>
              <span>✉️ charanpayyavula6@gmail.com</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem 1.25rem',
                fontSize: '0.825rem',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)',
                marginTop: '0.4rem'
              }}
            >
              <a href="https://github.com/charanpayyavula6-code" target="_blank" rel="noreferrer">
                github.com/charanpayyavula6-code
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/charan-payyavula-55286a354/?isSelfProfile=true" target="_blank" rel="noreferrer">
                linkedin.com/in/charan-payyavula
              </a>
              <span>•</span>
              <a href="https://payyavula-sri-charan-portfolio.vercel.app/" target="_blank" rel="noreferrer">
                payyavula-sri-charan-portfolio.vercel.app
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              Third-year B.E. Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning, with a strong interest in software development and web application development. Proficient in Python and Java, with knowledge of backend development using Flask and Spring Boot, and database management using SQL. Interested in building scalable web applications, developing REST APIs, and integrating databases to create efficient software solutions. Eager to apply technical knowledge to real-world projects and continuously improve software development skills.
            </p>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.3rem',
                marginBottom: '0.75rem'
              }}
            >
              Education
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Prathyusha Engineering College</strong>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  B.E. Computer Science &amp; Engineering (Artificial Intelligence and Machine Learning)
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>GPA: 7.5 / 10.0</div>
                <div style={{ color: 'var(--text-muted)' }}>2024 – 2028</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.65rem' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>Rainbow Em High School</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Secondary School Education</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Atmakur, Nellore, Andhra Pradesh
              </div>
            </div>
          </div>

          {/* Projects */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.3rem',
                marginBottom: '0.75rem'
              }}
            >
              Key Engineering Projects
            </h3>

            {/* Project 1 */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Fake News Detection System
                </strong>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  Python • Flask • REST API • Sentence-BERT • Gemini API • SQL
                </span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <li>Developed an AI-powered system to identify and classify potentially misleading news articles using Natural Language Processing (NLP).</li>
                <li>Applied text preprocessing and semantic analysis techniques to analyze news content and identify patterns associated with misinformation.</li>
                <li>Integrated Sentence-BERT for semantic text representation and Gemini API for AI-powered news analysis.</li>
                <li>Built a Flask-based backend to process user inputs, connect the frontend with the detection workflow, and used SQL for managing application data.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Speech Emotion Detection System
                </strong>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                  Python • Flask • Audio ML • REST API • HTML5/CSS3/JavaScript
                </span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                <li>Developed a Speech Emotion Recognition system to identify emotional patterns in speech audio using machine learning techniques.</li>
                <li>Implemented model training and inference workflows in Python to process audio inputs and generate emotion predictions.</li>
                <li>Built an interactive web interface using HTML, CSS, and JavaScript connected to a Python server backend.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Student ERP Management System
                </strong>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#f59e0b' }}>
                  Present working on that project
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Designing a centralized student academic administration system with role-based access, relational database schema, and REST APIs.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.3rem',
                marginBottom: '0.75rem'
              }}
            >
              Technical Skills
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><strong>Programming Languages:</strong> Python, Java</div>
              <div><strong>Web Development:</strong> Flask, Spring Boot, REST API, React, HTML5, CSS3, JavaScript</div>
              <div><strong>Database Management:</strong> SQL (MySQL Workbench)</div>
              <div><strong>Tools &amp; Platforms:</strong> Git, GitHub, VS Code, MySQL Workbench, Postman</div>
            </div>
          </div>

          {/* Internship Experience */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.3rem',
                marginBottom: '0.75rem'
              }}
            >
              Internship Experience
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Machine Learning Intern | CodeAlpha
                </strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>Virtual Internship — ML Engineer</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                June 2026 – August 2026
              </div>
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              <li>Completed virtual internship focused on machine learning concepts and practical model development.</li>
              <li>Developed machine learning models for disease prediction using Support Vector Machine (SVM), Logistic Regression, Random Forest, and XGBoost algorithms.</li>
              <li>Worked on data preprocessing, model training, and prediction workflows using Python.</li>
            </ul>
          </div>

          {/* Research & Publications */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.3rem',
                marginBottom: '0.75rem'
              }}
            >
              Research &amp; Publications
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              <strong>AI, Employment and Fiscal Sustainability: Assessing the Economic Effects of Artificial Intelligence Adoption and the Policy Options for Managing Workforce Transition</strong> (Sage Scholar / IEEE EBSCO)
              <br />
              Researched the impact of Artificial Intelligence adoption on employment across IT, manufacturing, and production industries. Analyzed relationship between AI-driven automation, workforce displacement, and government policy options.
            </p>
          </div>

          {/* Certifications & Languages */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <h3
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '0.3rem',
                  marginBottom: '0.5rem'
                }}
              >
                Key Certifications
              </h3>
              <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <li>• Certification Of Publication — Sage Scholar (Oct 2026)</li>
                <li>• IEEE — EBSCO (Sep 2026)</li>
                <li>• Code Alpha ML Internship Completion (Jul 2026)</li>
                <li>• MongoDB AI Strategy (VP Education, Jul 2026)</li>
                <li>• Generative AI Literacy (IT-ITES Sector, Dec 2025)</li>
                <li>• AR VR Training &amp; Hackathon — Prathyusha Engg College</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '0.3rem',
                  marginBottom: '0.5rem'
                }}
              >
                Languages Known
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Telugu', 'Tamil', 'English'].map((lang) => (
                  <span key={lang} className="tech-tag">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
            >
              <Download size={16} />
              <span>Save as PDF / Print</span>
            </button>

            <a
              href={`mailto:${profileData.contact.email}?subject=Interview%20Inquiry%20for%20Payyavula%20Sri%20Charan`}
              className="btn btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
            >
              <Mail size={16} />
              <span>Contact Candidate</span>
            </a>
          </div>

          <button
            onClick={() => {
              soundFX.playSwitch();
              onClose();
            }}
            className="btn btn-outline"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
