import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { products, CATEGORY_LABELS, STATUS_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

const MATERIALS = [
  { mat: 'Resina', icon: '✨', desc: 'Dados artesanais, translúcidos e vibrantes', color: '#7b4fcf', query: '?mat=Resina' },
  { mat: 'Metal',  icon: '⚙',  desc: 'Dados em liga de zinco e aço sólido',        color: '#7a8fa6', query: '?mat=Metal' },
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

      {/* ── Materiais ── */}
      <section className="home-categories" id="materiais">
        <div className="container">
          <p className="home-section-eyebrow">EXPLORE POR MATERIAL</p>
          <h2 className="home-section-title">Cada Dado, uma História</h2>
          <div className="categories-grid">
            {MATERIALS.map((m) => (
              <Link
                key={m.mat}
                to={`/loja${m.query}`}
                className="category-card"
                style={{ '--mat-color': m.color }}
              >
                <span className="category-card-icon">{m.icon}</span>
                <div className="category-card-info">
                  <span className="category-card-label">{m.mat.toUpperCase()}</span>
                  <span className="category-card-desc">{m.desc}</span>
                </div>
                <span className="category-card-arrow">›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Em Destaque ── */}
      <section className="home-featured" id="produtos">
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

      {/* ── Por que nossa Forja ── */}
      <section className="why-section">
        <div className="container">
          <div className="why-header">
            <p className="home-section-eyebrow">🎲 ARTESANATO ÉPICO</p>
            <h2 className="home-section-title">
              Por que <span className="home-title-accent">nossos dados</span>?
            </h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-card-icon">🎨</div>
              <h3>Cada Dado é Único</h3>
              <p>Resina artesanal fundida à mão: sem dois dados iguais. Veios, bolhas e cores criam peças exclusivas que não existem em nenhuma outra mesa.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">⚖️</div>
              <h3>Peso e Equilíbrio</h3>
              <p>Metal sólido, pedra polida e madeira densa com centro de massa calibrado. Rolagens justas e resultado confiável em qualquer superfície.</p>
            </div>
            <div className="why-card">
              <div className="why-card-icon">🏰</div>
              <h3>Feitos para Durar</h3>
              <p>Materiais premium que envelhecem com dignidade. Seus dados atravessarão campanhas, décadas e serão passados adiante como relíquias de aventura.</p>
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
              <div className="benefit-icon-box">🎲</div>
              <div className="benefit-text">
                <h4>Pagamento via Pix</h4>
                <p>Pague com Pix e receba confirmação imediata do seu pedido</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
