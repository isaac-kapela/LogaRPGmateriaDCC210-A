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
          <div className="hero-dice-orbit">
            <div className="hero-dice-main">🎲</div>
            <div className="hero-dice-orbit-item hero-dice-orbit-1">✨</div>
            <div className="hero-dice-orbit-item hero-dice-orbit-2">⚙</div>
            <div className="hero-dice-orbit-item hero-dice-orbit-3">🔥</div>
            <div className="hero-dice-orbit-item hero-dice-orbit-4">🛡</div>
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
          <strong>12.000+</strong>
          <span>Clientes</span>
        </div>
        <div className="hero-stat">
          <strong>4.9 ★</strong>
          <span>Avaliação Média</span>
        </div>
      </div>
    </section>
  );
}
