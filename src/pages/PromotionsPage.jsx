import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, FILTERS, PROMO_SORT_OPTIONS, CATEGORY_LABELS, STATUS_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import StarRating from '../components/StarRating';

const promoProducts = products.filter((p) => p.originalPrice != null);

function calcStats() {
  if (!promoProducts.length) return { count: 0, maxDiscount: 0, avgSaving: 0, flash: 0 };
  const discounts = promoProducts.map((p) => Math.round((1 - p.price / p.originalPrice) * 100));
  const savings = promoProducts.map((p) => p.originalPrice - p.price);
  return {
    count: promoProducts.length,
    maxDiscount: Math.max(...discounts),
    avgSaving: Math.round(savings.reduce((a, b) => a + b, 0) / savings.length),
    flash: Math.min(promoProducts.length, 3),
  };
}

const STATS = calcStats();

export default function PromotionsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sort, setSort] = useState('discount');

  const filtered = useMemo(() => {
    let list = activeFilter === 'all'
      ? promoProducts
      : promoProducts.filter((p) => p.category === activeFilter);

    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => {
          const da = Math.round((1 - a.price / a.originalPrice) * 100);
          const db = Math.round((1 - b.price / b.originalPrice) * 100);
          return db - da;
        });
    }
    return sorted;
  }, [activeFilter, sort]);

  return (
    <div className="promo-page">
      {/* hero */}
      <div className="promo-hero">
        <div className="promo-hero-bg" />
        <div className="container promo-hero-content">
          <span className="promo-hero-chip">🔥 OFERTAS ESPECIAIS</span>
          <h1 className="promo-hero-title">
            Promoções <span className="promo-hero-accent">Épicas</span>
          </h1>
          <p className="promo-hero-sub">
            Descontos imperdíveis em dados, livros, miniaturas e muito mais.<br />
            Aproveite enquanto durar!
          </p>
        </div>
      </div>

      <div className="container">
        {/* stats */}
        <div className="promo-stats">
          <div className="promo-stat-card">
            <strong>{STATS.count}</strong>
            <span>PRODUTOS EM PROMOÇÃO</span>
          </div>
          <div className="promo-stat-card">
            <strong className="promo-stat-red">{STATS.maxDiscount}% OFF</strong>
            <span>ATÉ</span>
          </div>
          <div className="promo-stat-card">
            <strong className="promo-stat-red">R$ {STATS.avgSaving}</strong>
            <span>ECONOMIA MÉDIA</span>
          </div>
          <div className="promo-stat-card">
            <strong>{STATS.flash}</strong>
            <span>OFERTAS RELÂMPAGO</span>
          </div>
        </div>

        {/* toolbar */}
        <div className="promo-toolbar">
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar por"
          >
            {PROMO_SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* filtros */}
        <div className="filters promo-filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn promo-filter-btn${activeFilter === f.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              <span className="filter-icon" aria-hidden="true">{f.icon}</span>
              {f.label.toUpperCase()}
            </button>
          ))}
        </div>

        <p className="filters-result">
          {filtered.length} produto{filtered.length === 1 ? '' : 's'} em promoção
        </p>

        {filtered.length > 0 ? (
          <div className="products-grid promo-grid">
            {filtered.map((product) => {
              const discountPct = Math.round((1 - product.price / product.originalPrice) * 100);
              const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
              return (
                <article
                  key={product.id}
                  className={`product-card promo-card cat-${product.category}`}
                  onClick={() => navigate(`/produto/${product.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/produto/${product.id}`)}
                  aria-label={`Ver promoção de ${product.name}`}
                >
                  <div className={`product-image cat-${product.category} promo-card-image`}>
                    <span className="product-image-icon">{product.icon}</span>
                    <span className="promo-card-label">PROMOÇÃO</span>
                    <span className="promo-card-discount">-{discountPct}% OFF</span>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{categoryLabel}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                    <div className="product-footer">
                      <div className="product-price-group">
                        <span className="product-price-original">{formatPrice(product.originalPrice)}</span>
                        <span className="product-price">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="promo-empty">
            <span>🎲</span>
            <p>Nenhuma promoção nesta categoria no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
