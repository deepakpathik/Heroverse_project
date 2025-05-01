import '../styles/Logo.css';

export default function Logo({ size = 'medium' }) {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-text">
        <span className="hero">HERO</span>
        <span className="verse">VERSE</span>
      </div>
      <div className="logo-decoration"></div>
    </div>
  );
} 