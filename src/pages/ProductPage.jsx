import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, CATEGORY_LABELS, STATUS_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import StarRating from '../components/StarRating';
import PixModal, { generatePixKey } from '../components/PixModal';

const THUMB_TINTS = [
  'rgba(212,160,23,.15)',
  'rgba(139,29,29,.2)',
  'rgba(47,138,79,.15)',
  'rgba(80,140,200,.15)',
];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [pixKey, setPixKey] = useState(null);

  if (!product) {
    return (
      <div className="product-page-notfound">
        <p>Produto não encontrado.</p>
        <button className="btn btn-outline" onClick={() => navigate('/')}>Voltar à loja</button>
      </div>
    );
  }

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const statusLabel = product.status ? STATUS_LABELS[product.status] : null;
  const hasDiscount = product.originalPrice != null;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const installment = (product.price / 12).toFixed(2).replace('.', ',');


  return (
    <div className="product-page">
      <div className="container">
        {/* breadcrumb */}
        <nav className="pp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link>
          <span className="pp-breadcrumb-sep">›</span>
          <Link to="/#produtos">Loja</Link>
          <span className="pp-breadcrumb-sep">›</span>
          <span>{product.name}</span>
        </nav>

        <div className="pp-layout">
          {/* coluna esquerda — imagens */}
          <div className="pp-images">
            <div className={`pp-main-image cat-${product.category}`} style={{ background: THUMB_TINTS[activeThumb] + ', var(--bg-card)' }}>
              <span className="pp-main-icon">{product.icon}</span>
              {hasDiscount && (
                <span className="pp-sale-badge">-{discountPct}% OFF</span>
              )}
            </div>
            <div className="pp-thumbs">
              {THUMB_TINTS.map((tint, i) => (
                <button
                  key={i}
                  className={`pp-thumb cat-${product.category}${activeThumb === i ? ' active' : ''}`}
                  style={{ background: tint + ', var(--bg-card)' }}
                  onClick={() => setActiveThumb(i)}
                  aria-label={`Imagem ${i + 1}`}
                >
                  <span>{product.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* coluna direita — detalhes */}
          <div className="pp-details">
            {statusLabel && (
              <span className="pp-status-badge">{statusLabel}</span>
            )}

            <p className="pp-category">{categoryLabel}</p>
            <h1 className="pp-name">{product.name}</h1>

            <div className="pp-rating-row">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              <span className="pp-rating-text">
                {product.rating?.toFixed(1)} ({product.reviewCount} avaliações)
              </span>
            </div>

            <div className="pp-price-block">
              {hasDiscount && (
                <p className="pp-price-original">{formatPrice(product.originalPrice)}</p>
              )}
              <p className="pp-price">{formatPrice(product.price)}</p>
              <p className="pp-installment">
                ou em até 12x de R$ {installment} sem juros
              </p>
            </div>

            <blockquote className="pp-description">
              {product.description}
            </blockquote>

            {product.tags && (
              <div className="pp-tags">
                {product.tags.map((tag) => (
                  <span key={tag} className="pp-tag">{tag}</span>
                ))}
              </div>
            )}

            <p className="pp-stock">
              <span className="pp-stock-dot" />
              Em estoque
            </p>

            <div className="pp-qty-row">
              <div className="pp-qty">
                <button
                  className="pp-qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir"
                >−</button>
                <span className="pp-qty-val">{qty}</span>
                <button
                  className="pp-qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Aumentar"
                >+</button>
              </div>
            </div>

            <div className="pp-actions">
              <button
                type="button"
                className="pp-btn-cart"
                onClick={() => setPixKey(generatePixKey())}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2 2 12l10 10 10-10L12 2Zm0 3.17L18.83 12 12 18.83 5.17 12 12 5.17Z"/>
                </svg>
                PAGAR COM PIX
              </button>
              <button
                type="button"
                className="pp-btn-buy btn-pix"
                onClick={() => setPixKey(generatePixKey())}
              >
                COMPRAR AGORA
              </button>
            </div>

            <div className="pp-trust">
              <div className="pp-trust-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1" /><path d="M12 17h.01" />
                </svg>
                <span>Frete grátis acima de R$ 199</span>
              </div>
              <div className="pp-trust-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                </svg>
                <span>Devolução em 30 dias</span>
              </div>
              <div className="pp-trust-item">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* seção de avaliações */}
        <section className="pp-reviews">
          <div className="pp-reviews-header">
            <div>
              <h2 className="pp-reviews-title">Avaliações de Clientes</h2>
              <div className="pp-reviews-summary">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                <span className="pp-reviews-avg">{product.rating?.toFixed(1)}</span>
                <span className="pp-reviews-count">0 avaliações</span>
              </div>
            </div>
            <button className="pp-btn-review">ESCREVER AVALIAÇÃO</button>
          </div>

          <div className="pp-reviews-empty">
            <span className="pp-reviews-star-icon">☆</span>
            <p>Seja o primeiro a avaliar</p>
            <p className="pp-reviews-empty-sub">Compartilhe sua experiência com este produto</p>
          </div>
        </section>
      </div>

      {pixKey && (
        <PixModal
          pixKey={pixKey}
          total={formatPrice(product.price * qty)}
          onClose={() => setPixKey(null)}
        />
      )}
    </div>
  );
}
