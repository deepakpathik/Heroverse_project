import '../styles/Footer.css';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="developer-info">
          <h3>Developer</h3>
          <div className="developer-details">
            <p className="name">Deepak  Pathik</p>
            <p className="description">
              Passionate about creating beautiful and functional web applications. 
              Specialized in React and modern web technologies.
            </p>
          </div>
        </div>
        
        <div className="social-links">
          <h3>Connect</h3>
          <div className="links">
            <a href="https://github.com/deepakpathik" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/deepak-pathik-944b792a7/?trk=opento_sprofile_topcard" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="project-info">
          <Logo size="small" />
          <p>
            HeroVerse is a web application built with React and the Marvel API.
            It allows users to search and explore Marvel characters and their comics.
          </p>
          <p className="copyright">
            © {new Date().getFullYear()} Deepak Pathik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 