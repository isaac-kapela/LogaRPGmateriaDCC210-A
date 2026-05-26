import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container header-inner">
          <a href="#" className="logo">
            <span className="logo-icon" aria-hidden="true">⚔</span>
            <span className="logo-text">
              FORJA<span className="logo-accent">RPG</span>
            </span>
          </a>

          <nav className="nav">
            <a href="#" className="nav-link active">Início</a>
            <a href="#produtos" className="nav-link">Loja</a>
            <a href="#promocoes" className="nav-link">Promoções</a>
          </nav>

          <div className="header-actions">
            <button className="header-icon-btn" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="header-icon-btn" aria-label="Carrinho">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </button>
            <button className="header-icon-btn" aria-label="Minha conta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>

          <button
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        <a href="#" className="mobile-nav-link" onClick={closeMenu}>Início</a>
        <a href="#produtos" className="mobile-nav-link" onClick={closeMenu}>Loja</a>
        <a href="#promocoes" className="mobile-nav-link" onClick={closeMenu}>Promoções</a>
      </div>
    </>
  );
}
