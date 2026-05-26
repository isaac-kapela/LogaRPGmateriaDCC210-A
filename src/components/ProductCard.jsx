import { CATEGORY_LABELS, STATUS_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import StarRating from './StarRating';

export default function ProductCard({ product, onOpenModal }) {
  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
  const statusLabel = product.status ? STATUS_LABELS[product.status] : null;

  return (
    <article
      className="product-card"
      onClick={() => onOpenModal(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenModal(product)}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      <div className={`product-image cat-${product.category}`}>
        <span className="product-image-icon">{product.icon}</span>
        {statusLabel && (
          <span className="product-status-badge">{statusLabel}</span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{categoryLabel}</span>
        <h3 className="product-name">{product.name}</h3>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            className="product-add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
