import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 24; i++) {
      const el = document.createElement('div');
      el.classList.add('particle');
      const size = 1 + Math.random() * 3;
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 40}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${4 + Math.random() * 8}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(el);
    }

    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-particles" ref={particlesRef} />

      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="star">★</span>
            Especialistas em Dados para RPG
            <span className="star">★</span>
          </p>

          <h1 className="hero-title">
            Role o Dado
            <span className="hero-title-accent">Perfeito</span>
          </h1>

          <p className="hero-subtitle">
            Kits temáticos em resina artesanal e metal sólido.
            Conjuntos únicos para cada aventureiro, forjados para durar gerações.
          </p>

          <div className="hero-actions">
            <Link to="/loja" className="btn btn-primary">
              Explorar Loja <span aria-hidden="true">→</span>
            </Link>
            <Link to="/loja?mat=Resina" className="btn btn-outline">
              Ver Resina
            </Link>
          </div>

          <div className="hero-badges">
            <span className="hero-badge">✨ Resina Artesanal</span>
            <span className="hero-badge">⚙ Metal Sólido</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-inner">
            <div className="hero-kits-grid">
              {[
                { src: '/kits/chama-arcana.jpeg',     label: 'Chama Arcana',     icon: '🔥' },
                { src: '/kits/arauto-do-abismo.jpeg', label: 'Arauto do Abismo', icon: '🐙' },
                { src: '/kits/senhor-da-forja.jpeg',  label: 'Senhor da Forja',  icon: '⚒' },
                { src: '/kits/egide-celestial.jpeg',  label: 'Égide Celestial',  icon: '✨' },
              ].map((kit, i) => (
                <div key={i} className="hero-kit-card">
                  <img src={kit.src} alt={kit.label} className="hero-kit-img" />
                  <div className="hero-kit-overlay">
                    <span className="hero-kit-icon">{kit.icon}</span>
                    <span className="hero-kit-label">{kit.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">⌄</div>

      <div className="hero-stats">
        <div className="hero-stat">
          <strong>4</strong>
          <span>Kits Exclusivos</span>
        </div>
        <div className="hero-stat">
          <strong>2</strong>
          <span>Materiais</span>
        </div>
        <div className="hero-stat">
          <strong>4.9 ★</strong>
          <span>Avaliação Média</span>
        </div>
      </div>
    </section>
  );
}
