import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // fecha o menu do usuário ao clicar fora
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const isHome   = location.pathname === '/';
  const isPromos = location.pathname === '/promocoes';

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon" aria-hidden="true">⚔</span>
            <span className="logo-text">
              FORJA<span className="logo-accent">RPG</span>
            </span>
          </Link>

          <nav className="nav">
            <Link to="/" className={`nav-link${isHome && !isPromos ? ' active' : ''}`}>Início</Link>
            <Link to="/loja" className={`nav-link${location.pathname === '/loja' ? ' active' : ''}`}>Loja</Link>
            <Link to="/promocoes" className={`nav-link${isPromos ? ' active' : ''}`}>Promoções</Link>
          </nav>

          <div className="header-actions">
            <button className="header-icon-btn" aria-label="Buscar" onClick={() => navigate('/loja')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <button className="header-icon-btn cart-btn" aria-label="Carrinho" onClick={() => navigate('/carrinho')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
              )}
            </button>

            {/* Conta — deslogado */}
            {!user && (
              <button
                className="header-icon-btn"
                aria-label="Entrar"
                onClick={() => navigate('/login')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            )}

            {/* Conta — logado */}
            {user && (
              <div className="user-menu-wrap" ref={userMenuRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  aria-label="Menu da conta"
                  aria-expanded={userMenuOpen}
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <span className="user-dropdown-name">{user.name}</span>
                      <span className="user-dropdown-email">{user.email}</span>
                    </div>
                    <div className="user-dropdown-divider" />
                    <button
                      className="user-dropdown-item user-dropdown-logout"
                      onClick={handleLogout}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
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
        <Link to="/" className="mobile-nav-link" onClick={closeMenu}>Início</Link>
        <Link to="/loja" className="mobile-nav-link" onClick={closeMenu}>Loja</Link>
        <Link to="/promocoes" className="mobile-nav-link" onClick={closeMenu}>Promoções</Link>
        <div className="mobile-nav-divider" />
        {user
          ? <button className="mobile-nav-link mobile-nav-btn" onClick={() => { handleLogout(); closeMenu(); }}>Sair ({user.name})</button>
          : <Link to="/login" className="mobile-nav-link" onClick={closeMenu}>Entrar / Cadastrar</Link>
        }
      </div>
    </>
  );
}
