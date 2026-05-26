import { WHATSAPP_NUMBER, CATEGORY_LABELS } from '../data/products';

export function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function buildWhatsAppLink(product) {
  const price = formatPrice(product.price);
  const category = CATEGORY_LABELS[product.category] ?? product.category;

  const msg = [
    `Olá! 👋 Tenho interesse em comprar um produto da *Forja dos Dados*:`,
    ``,
    `🛒 *${product.name}*`,
    `📦 Categoria: ${category}`,
    `💰 Preço: ${price}`,
    ``,
    `Poderia me dar mais informações sobre disponibilidade e formas de entrega? Obrigado!`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
