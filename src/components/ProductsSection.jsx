import { useMemo, useState } from 'react';
import { products, FILTERS, SORT_OPTIONS } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let list = activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

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
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [activeFilter, search, sort]);

  return (
    <section className="products-section" id="produtos">
      <div className="container">
        <p className="products-breadcrumb">
          início <span className="sep">›</span> loja
        </p>

        <div className="section-header-shop">
          <h2 className="section-title">Arsenal RPG</h2>
        </div>

        <div className="shop-toolbar">
          <div className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar produtos"
            />
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar por"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              <span className="filter-icon" aria-hidden="true">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        <p className="filters-result">
          {filtered.length} produto{filtered.length === 1 ? '' : 's'} encontrado{filtered.length === 1 ? '' : 's'}
        </p>

        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="products-empty">
            Nenhum produto encontrado.
          </p>
        )}
      </div>
    </section>
  );
}
