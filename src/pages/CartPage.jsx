import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/whatsapp';
import PixModal, { generatePixKey } from '../components/PixModal';

export default function CartPage() {
  const { items, remove, setQty, clear, totalItems, totalPrice } = useCart();
  const [pixKey, setPixKey] = useState(null);

  const handlePay = () => setPixKey(generatePixKey());

  if (items.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-inner">
          <span className="cart-empty-icon">🎲</span>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione dados ou kits para começar sua aventura.</p>
          <Link to="/loja" className="btn btn-primary">Ver Produtos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <p className="products-breadcrumb">início <span className="sep">›</span> carrinho</p>
        <h1 className="cart-title">Carrinho</h1>

        <div className="cart-layout">
          {/* lista */}
          <div className="cart-items">
            {items.map(({ product, qty }) => {
              const hasDiscount = product.originalPrice != null;
              const discountPct = hasDiscount
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;

              return (
                <div key={product.id} className="cart-item">
                  <div className={`cart-item-img cat-${product.category}${product.image ? ' cart-item-img-photo' : ''}`}>
                    {product.image
                      ? <img src={product.image} alt={product.name} />
                      : <span>{product.icon}</span>
                    }
                    {hasDiscount && (
                      <span className="cart-item-badge">-{discountPct}% OFF</span>
                    )}
                  </div>

                  <div className="cart-item-info">
                    <span className="cart-item-category">
                      {product.material ?? 'Kit'}
                    </span>
                    <h3 className="cart-item-name">{product.name}</h3>
                    <div className="cart-item-price-row">
                      {hasDiscount && (
                        <span className="cart-item-original">{formatPrice(product.originalPrice)}</span>
                      )}
                      <span className="cart-item-price">{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-control">
                      <button
                        className="qty-btn"
                        onClick={() => qty === 1 ? remove(product.id) : setQty(product.id, qty - 1)}
                        aria-label="Diminuir"
                      >−</button>
                      <span className="qty-value">{qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => setQty(product.id, qty + 1)}
                        aria-label="Aumentar"
                      >+</button>
                    </div>
                    <span className="cart-item-subtotal">{formatPrice(product.price * qty)}</span>
                    <button
                      className="cart-item-remove"
                      onClick={() => remove(product.id)}
                      aria-label="Remover"
                    >✕</button>
                  </div>
                </div>
              );
            })}

            <button className="cart-clear-btn" onClick={clear}>
              Limpar carrinho
            </button>
          </div>

          {/* resumo */}
          <aside className="cart-summary">
            <h3 className="cart-summary-title">Resumo do pedido</h3>

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Frete</span>
                <span className="cart-summary-free">
                  {totalPrice >= 199.9 ? 'Grátis 🎉' : 'A combinar'}
                </span>
              </div>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {totalPrice < 199.9 && (
              <p className="cart-frete-hint">
                Faltam <strong>{formatPrice(199.9 - totalPrice)}</strong> para frete grátis!
              </p>
            )}

            <button
              type="button"
              onClick={handlePay}
              className="btn btn-pix cart-checkout-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2 2 12l10 10 10-10L12 2Zm0 3.17L18.83 12 12 18.83 5.17 12 12 5.17Z"/>
              </svg>
              Pagar com Pix
            </button>

            <Link to="/loja" className="cart-continue-link">
              ← Continuar comprando
            </Link>
          </aside>
        </div>
      </div>

      {pixKey && (
        <PixModal
          pixKey={pixKey}
          total={formatPrice(totalPrice)}
          onClose={() => setPixKey(null)}
        />
      )}
    </div>
  );
}
