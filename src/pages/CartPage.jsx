import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/whatsapp';
import { WHATSAPP_NUMBER } from '../data/products';

function buildCartWhatsApp(items, total) {
  const lines = items.map(
    (i) => `• *${i.product.name}* × ${i.qty} — ${formatPrice(i.product.price * i.qty)}`
  );
  const msg = [
    `Olá! 👋 Gostaria de fazer um pedido na *Forja dos Dados*:`,
    ``,
    ...lines,
    ``,
    `💰 *Total: ${formatPrice(total)}*`,
    ``,
    `Poderia confirmar disponibilidade e formas de entrega? Obrigado!`,
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function CartPage() {
  const { items, remove, setQty, clear, totalItems, totalPrice } = useCart();

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
                      {product.material ? `${product.material}` : 'Kit'}
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

            <a
              href={buildCartWhatsApp(items, totalPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp cart-checkout-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Finalizar via WhatsApp
            </a>

            <Link to="/loja" className="cart-continue-link">
              ← Continuar comprando
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
