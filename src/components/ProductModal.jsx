import { useEffect, useState } from 'react';
import { CATEGORY_LABELS } from '../data/products';
import { formatPrice } from '../utils/whatsapp';
import StarRating from './StarRating';
import PixModal, { generatePixKey } from './PixModal';

export default function ProductModal({ product, onClose }) {
  const isOpen = product !== null;
  const [pixKey, setPixKey] = useState(null);

  // Fecha com ESC e trava o scroll do body
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const label = CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className={`modal-product-image cat-${product.category}`}>
          <span style={{ fontSize: '7rem', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.6))' }}>
            {product.icon}
          </span>
        </div>

        <div className="modal-product-details">
          <span className={`modal-badge badge-${product.category}`}>{label}</span>

          <h2 className="modal-product-name" id="modal-title">
            {product.name}
          </h2>

          <div className="modal-rating">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <span className="rating-count">
              {product.rating?.toFixed(1)} de 5 · {product.reviewCount} avaliações
            </span>
          </div>

          <p className="modal-product-desc">{product.description}</p>

          <div className="modal-product-specs">
            {product.specs.map((spec) => (
              <span key={spec} className="modal-spec">{spec}</span>
            ))}
          </div>

          <div className="modal-price-row">
            <div>
              <p className="modal-price">{formatPrice(product.price)}</p>
              <p className="modal-price-label">Pagamento via Pix</p>
            </div>
            <button
              type="button"
              className="modal-buy-btn btn-pix"
              onClick={() => setPixKey(generatePixKey())}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2 2 12l10 10 10-10L12 2Zm0 3.17L18.83 12 12 18.83 5.17 12 12 5.17Z"/>
              </svg>
              Comprar com Pix
            </button>
          </div>
        </div>
      </div>

      {pixKey && (
        <PixModal
          pixKey={pixKey}
          total={formatPrice(product.price)}
          onClose={() => setPixKey(null)}
        />
      )}
    </div>
  );
}
