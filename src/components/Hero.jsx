import { useEffect, useRef } from 'react';

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

      <div className="container">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="star">★</span>
            A Maior Loja RPG do Brasil
            <span className="star">★</span>
          </p>

          <h1 className="hero-title">
            Forje sua
            <span className="hero-title-accent">Lenda</span>
          </h1>

          <p className="hero-subtitle">
            Dados, miniaturas, livros, escudos e muito mais. Tudo que você precisa
            para aventuras épicas ao redor da mesa.
          </p>

          <div className="hero-actions">
            <a href="#produtos" className="btn btn-primary">
              Explorar Loja <span aria-hidden="true">→</span>
            </a>
            <a href="#promocoes" className="btn btn-outline">
              Ver Promoções
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">⌄</div>

      <div className="hero-stats">
        <div className="hero-stat">
          <strong>500+</strong>
          <span>Produtos</span>
        </div>
        <div className="hero-stat">
          <strong>12.000+</strong>
          <span>Clientes</span>
        </div>
        <div className="hero-stat">
          <strong>∞</strong>
          <span>Sessões Jogadas</span>
        </div>
        <div className="hero-stat">
          <strong>4.9 ★</strong>
          <span>Avaliação Média</span>
        </div>
      </div>
    </section>
  );
}
