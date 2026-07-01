import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_LABELS, STATUS_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const statusLabel = product.status ? STATUS_LABELS[product.status] : null;
  const hasDiscount = product.originalPrice != null;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const goToProduct = () => navigate(`/produto/${product.id}`);

  const handleAdd = (e) => {
    e.stopPropagation();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className="product-card"
      onClick={goToProduct}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && goToProduct()}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <div className={`product-image cat-${product.category}${product.image ? ' product-image-photo' : ''}`}>
        {product.image
          ? <img src={product.image} alt={product.name} className="product-photo" />
          : <span className="product-image-icon">{product.icon}</span>
        }
        {statusLabel && (
          <span className="product-status-badge">{statusLabel}</span>
        )}
        {hasDiscount && (
          <span className="product-discount-badge">-{discountPct}% OFF</span>
        )}
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
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </article>
  );
}
