import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink, MessageSquare, Copy, Check, Sparkles, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import { profileData } from '../data/profile';
import { soundFX } from '../utils/audio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mailtoGenerated, setMailtoGenerated] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const presets = [
    {
      label: '💼 AI/ML Role',
      subject: 'Opportunity: AI/ML Engineering Role',
      message: 'Hi Sri Charan,\n\nI reviewed your portfolio and was impressed by your work in machine learning and systems engineering. We have an opportunity that aligns with your profile and would love to connect.'
    },
    {
      label: '🤝 Project Collab',
      subject: 'Collaboration on AI / Systems Project',
      message: 'Hi Sri Charan,\n\nI came across your work in Computer Vision and AI architectures. I am working on an initiative and would like to explore collaborating with you.'
    },
    {
      label: '☕ Tech Chat',
      subject: 'Connecting regarding AI & Software Systems',
      message: 'Hi Sri Charan,\n\nI saw your portfolio and would love to connect for a quick tech chat regarding AI/ML pipelines and modern web systems.'
    }
  ];

  const handleApplyPreset = (p) => {
    soundFX.playSwitch();
    setFormData((prev) => ({
      ...prev,
      subject: p.subject,
      message: p.message
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    soundFX.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a message subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message or inquiry.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Your message should be at least 10 characters long.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Prepare mailto fallback link with prefilled parameters
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Charan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent via Portfolio Contact Form`
    );
    const link = `mailto:${profileData.contact.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    setMailtoGenerated(link);

    // Post to Django REST Framework backend API
    try {
      const res = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: 'general'
        })
      });

      if (res.ok) {
        soundFX.playSuccess();
        setIsSubmitting(false);
        setIsSubmitted(true);
        return;
      }
    } catch {
      // Backend not currently reachable; continue to mailto client
    }

    // Fallback: Trigger native email client
    setTimeout(() => {
      soundFX.playSuccess();
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.location.href = link;
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">Get In Touch</div>
          <h2 className="section-title">Let&apos;s Build Something Meaningful.</h2>
          <p className="section-subtitle">
            I&apos;m always interested in learning, exploring new technologies, and connecting with people who enjoy building useful software.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-2xl)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Card 1: Email */}
            <div
              className="bento-card"
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    OFFICIAL DISPATCH
                  </div>
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    style={{
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      color: 'var(--text-primary)',
                      wordBreak: 'break-all'
                    }}
                  >
                    {profileData.contact.email}
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: copiedEmail ? '#10b981' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Card: Phone */}
            <div
              className="bento-card"
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    flexShrink: 0
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    DIRECT PHONE / WHATSAPP
                  </div>
                  <a
                    href="tel:9346733016"
                    style={{
                      fontWeight: 700,
                      fontSize: '0.98rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    +91 9346733016
                  </a>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('9346733016');
                  soundFX.playSuccess();
                  setCopiedPhone(true);
                  setTimeout(() => setCopiedPhone(false), 2000);
                }}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: copiedPhone ? '#10b981' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Card 2: LinkedIn & GitHub */}
            <div
              className="bento-card"
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(129, 140, 248, 0.1)',
                  border: '1px solid rgba(129, 140, 248, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-violet)',
                  flexShrink: 0
                }}
              >
                <LinkedinIcon size={22} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  PROFESSIONAL NETWORKS
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      color: 'var(--accent-blue)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={profileData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span>GitHub</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Location & Availability */}
            <div
              className="bento-card"
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-emerald)',
                  flexShrink: 0
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  LOCATION &amp; AVAILABILITY
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {profileData.contact.location}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 500 }}>
                  ● {profileData.contact.availability}
                </div>
              </div>
            </div>

            {/* Recruiter Transparency Note */}
            <div
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(56, 189, 248, 0.05)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>Recruiter Note:</strong> All contact information is configured centrally in{' '}
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>src/data/profile.js</code>. Submissions automatically launch your default mail app prefilled with your message.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            className="bento-card"
            style={{
              padding: 'var(--space-2xl)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(0, 240, 255, 0.3)'
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1.5px solid var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)',
                    margin: '0 auto 1.25rem auto'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Message Prepared!
                </h3>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Your email application was triggered with your pre-filled inquiry. If it didn&apos;t open automatically, you can click below:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                  <a
                    href={mailtoGenerated}
                    className="btn btn-primary"
                    style={{ width: '100%', maxWidth: '280px' }}
                  >
                    <span>Open Mail Client</span>
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={handleReset}
                    className="btn btn-secondary"
                    style={{ width: '100%', maxWidth: '280px' }}
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)'
                    }}
                  >
                    Quantum Transceiver
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#10b981',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    ENCRYPTED_TLS
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  Fill out the form below or pick a one-click preset to connect directly.
                </p>

                {/* Quick Presets Chips */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      marginBottom: '0.45rem'
                    }}
                  >
                    ONE-CLICK INQUIRY PRESETS:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {presets.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        style={{
                          padding: '0.32rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(0, 240, 255, 0.08)',
                          border: '1px solid rgba(0, 240, 255, 0.25)',
                          color: 'var(--accent-cyan)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.18s ease'
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Your Full Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: `1px solid ${errors.name ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                      color: 'var(--text-primary)',
                      fontSize: '0.925rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                  {errors.name && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.785rem',
                        color: 'var(--accent-rose)',
                        marginTop: '0.35rem'
                      }}
                    >
                      <AlertCircle size={13} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Your Email Address <span style={{ color: 'var(--accent-rose)' }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: `1px solid ${errors.email ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                      color: 'var(--text-primary)',
                      fontSize: '0.925rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                  {errors.email && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.785rem',
                        color: 'var(--accent-rose)',
                        marginTop: '0.35rem'
                      }}
                    >
                      <AlertCircle size={13} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Subject Field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contact-subject"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Subject <span style={{ color: 'var(--accent-rose)' }}>*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Opportunity / Technical Collaboration"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: `1px solid ${errors.subject ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                      color: 'var(--text-primary)',
                      fontSize: '0.925rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                  {errors.subject && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.785rem',
                        color: 'var(--accent-rose)',
                        marginTop: '0.35rem'
                      }}
                    >
                      <AlertCircle size={13} />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Message <span style={{ color: 'var(--accent-rose)' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, project idea, or inquiry here..."
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: `1px solid ${errors.message ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                      color: 'var(--text-primary)',
                      fontSize: '0.925rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color var(--transition-fast)'
                    }}
                  />
                  {errors.message && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.785rem',
                        color: 'var(--accent-rose)',
                        marginTop: '0.35rem'
                      }}
                    >
                      <AlertCircle size={13} />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    fontSize: '1rem',
                    gap: '0.5rem'
                  }}
                >
                  {isSubmitting ? (
                    <span>Preparing Mail Client...</span>
                  ) : (
                    <>
                      <span>Send Inquiry Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
