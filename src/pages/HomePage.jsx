import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { products, CATEGORY_LABELS, STATUS_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

const CATEGORIES = [
  { key: 'dados', label: 'Resina',  icon: '✨', desc: 'Dados artesanais em resina' },
  { key: 'dados', label: 'Metal',   icon: '⚙',  desc: 'Ligas de zinco e latão' },
  { key: 'dados', label: 'Madeira', icon: '🪵', desc: 'Esculpidos à mão' },
  { key: 'dados', label: 'Pedra',   icon: '🪨', desc: 'Obsidiana, mármore e mais' },
  { key: 'dados', label: 'Plástico',icon: '🎯', desc: 'Acrílico e opções econômicas' },
  { key: 'kits',  label: 'Kits',    icon: '🎁', desc: 'Conjuntos temáticos completos' },
];

const featured    = products.filter((p) => p.isFeatured);
const bestsellers = products.filter((p) => p.isBestseller);

function ProductRow({ product }) {
  const navigate = useNavigate();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const statusLabel   = product.status ? STATUS_LABELS[product.status] : null;
  const hasDiscount   = product.originalPrice != null;
  const discountPct   = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/produto/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/produto/${product.id}`)}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <div className={`product-image cat-${product.category}${product.image ? ' product-image-photo' : ''}`}>
        {product.image
          ? <img src={product.image} alt={product.name} className="product-photo" />
          : <span className="product-image-icon">{product.icon}</span>
        }
        {statusLabel && <span className="product-status-badge">{statusLabel}</span>}
        {hasDiscount && <span className="product-discount-badge">-{discountPct}% OFF</span>}
      </div>
      <div className="product-info">
        <span className="product-category">{categoryLabel}</span>
        <h3 className="product-name">{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="product-footer">
          <div className="product-price-group">
            {hasDiscount && (
              <span className="product-price-original">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="product-price">{formatPrice(product.price)}</span>
          </div>
          <button
            className={`product-add-btn${added ? ' product-add-btn--added' : ''}`}
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >{added ? '✓' : '+'}</button>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Categorias ── */}
      <section className="home-categories">
        <div className="container">
          <p className="home-section-eyebrow">NAVEGUE POR CATEGORIA</p>
          <h2 className="home-section-title">Arsenal Completo</h2>
          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                to={`/loja?cat=${cat.key}`}
                className="category-card"
              >
                <span className="category-card-icon">{cat.icon}</span>
                <div className="category-card-info">
                  <span className="category-card-label">{cat.label.toUpperCase()}</span>
                  <span className="category-card-desc">{cat.desc}</span>
                </div>
                <span className="category-card-arrow">›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Em Destaque ── */}
      <section className="home-featured">
        <div className="container">
          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">⚡ SELECIONADOS PARA VOCÊ</p>
              <h2 className="home-section-title">
                Em <span className="home-title-accent">Destaque</span>
              </h2>
            </div>
            <Link to="/loja" className="home-ver-todos">VER TODOS →</Link>
          </div>
          <div className="products-grid products-grid-4">
            {featured.map((p) => <ProductRow key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Oferta Relâmpago ── */}
      <section className="flash-sale">
        <div className="container">
          <div className="flash-sale-inner">
            <div className="flash-sale-content">
              <div className="flash-sale-chip">
                <span className="flash-sale-chip-icon">⚡</span>
                <span>OFERTA RELÂMPAGO</span>
              </div>
              <p className="flash-sale-percent">30% OFF</p>
              <p className="flash-sale-subtitle">em Miniaturas</p>
              <p className="flash-sale-coupon-label">Use o cupom no checkout:</p>
              <div className="flash-sale-coupon">MINI30</div>
              <div className="flash-sale-actions">
                <Link to="/loja?cat=figuras" className="btn btn-primary">
                  GARANTE AGORA →
                </Link>
                <span className="flash-sale-stock">
                  <span className="flash-sale-dot" />
                  Estoque limitado
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mais Vendidos ── */}
      <section className="home-bestsellers">
        <div className="container">
          <div className="home-section-header">
            <div>
              <p className="home-section-eyebrow">OS FAVORITOS DA AVENTURA</p>
              <h2 className="home-section-title">Mais Vendidos</h2>
            </div>
          </div>
          <div className="products-grid products-grid-4">
            {bestsellers.map((p) => <ProductRow key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Benefícios ── */}
      <section className="benefits-bar">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon-box">🚚</div>
              <div className="benefit-text">
                <h4>Frete Grátis</h4>
                <p>Nas compras acima de R$ 199,90 para todo o Brasil</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon-box">🔄</div>
              <div className="benefit-text">
                <h4>Troca Garantida</h4>
                <p>30 dias para troca ou devolução sem burocracia</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon-box">🔒</div>
              <div className="benefit-text">
                <h4>Pagamento Seguro</h4>
                <p>SSL e proteção total contra fraude em todas as compras</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
