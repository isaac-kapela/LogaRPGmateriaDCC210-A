/* ============================================
   LOJA RPG — script.js
   ============================================ */

// ============================================
// CONFIGURAÇÃO — altere aqui
// ============================================

// Coloque aqui o número do WhatsApp no formato internacional
// Exemplo: "5531999999999" (55 = Brasil, 31 = DDD, 9 dígitos)
const WHATSAPP_NUMBER = "SEUNUMERO";

// ============================================
// PRODUTOS
// ============================================

const products = [
  // --- DADOS ---
  {
    id: 1,
    name: "Set de Dados Metálicos — Dragão",
    description: "7 dados poliedros em liga de zinco com acabamento cromado. Gravuras de dragão em relevo. Inclui estojo de couro sintético.",
    category: "dados",
    price: 89.90,
    icon: "🎲",
    specs: ["7 peças", "Liga de zinco", "Estojo incluso", "D4 ao D20"],
    isNew: true,
  },
  {
    id: 2,
    name: "Set de Dados de Resina Mágica",
    description: "Dados artesanais em resina translúcida com inclusões douradas. Cada peça é única, produzida à mão.",
    category: "dados",
    price: 49.90,
    icon: "✨",
    specs: ["7 peças", "Resina artesanal", "Cores variadas", "D4 ao D20"],
    isNew: false,
  },
  {
    id: 3,
    name: "Dados de Pedra Natural",
    description: "Set exclusivo esculpido em pedra natural. Acabamento polido, peso equilibrado. Disponível em obsidiana, mármore e ágata.",
    category: "dados",
    price: 129.90,
    icon: "🪨",
    specs: ["7 peças", "Pedra natural", "Peso premium", "Escolha a pedra"],
    isNew: false,
  },
  {
    id: 4,
    name: "Set de D6 para Wargame (36 un)",
    description: "Dados de seis faces em plástico de alta qualidade, ideais para jogos de estratégia e wargames.",
    category: "dados",
    price: 39.90,
    icon: "🎯",
    specs: ["36 peças", "Plástico rígido", "D6 apenas", "Cores à escolha"],
    isNew: false,
  },

  // --- LIVROS ---
  {
    id: 5,
    name: "Livro do Jogador — D&D 5ª Ed.",
    description: "O guia essencial para jogadores de Dungeons & Dragons. Contém todas as regras de criação de personagem, classes, raças e magias.",
    category: "livros",
    price: 199.90,
    icon: "📖",
    specs: ["316 páginas", "Capa dura", "PT-BR", "5ª edição"],
    isNew: false,
  },
  {
    id: 6,
    name: "Manual dos Monstros",
    description: "Mais de 300 criaturas detalhadas para o Dungeon Master popular suas aventuras. Ilustrações épicas em cada página.",
    category: "livros",
    price: 189.90,
    icon: "👹",
    specs: ["352 páginas", "Capa dura", "PT-BR", "5ª edição"],
    isNew: false,
  },
  {
    id: 7,
    name: "Aventura: A Maldição do Castelo",
    description: "Aventura completa para 4-6 jogadores de nível 1 a 10. Inclui mapas, fichas de PNJ e tokens para impressão.",
    category: "livros",
    price: 79.90,
    icon: "🏰",
    specs: ["96 páginas", "Brochura", "PT-BR", "Nível 1-10"],
    isNew: true,
  },
  {
    id: 8,
    name: "Guia do Mestre",
    description: "O guia definitivo para Dungeon Masters. Regras avançadas, criação de mundos, NPCs e tesouros aleatórios.",
    category: "livros",
    price: 199.90,
    icon: "📚",
    specs: ["320 páginas", "Capa dura", "PT-BR", "5ª edição"],
    isNew: false,
  },

  // --- MINIATURAS ---
  {
    id: 9,
    name: "Miniatura Dragão Vermelho",
    description: "Miniatura em resina de alta resolução. Detalhes incríveis, escama por escama. Base de 150mm inclusa. Não pintada.",
    category: "miniaturas",
    price: 149.90,
    icon: "🐉",
    specs: ["Resina", "Base 150mm", "Não pintada", "Escala 28mm"],
    isNew: true,
  },
  {
    id: 10,
    name: "Pack Guerreiros (10 miniaturas)",
    description: "Dez miniaturas de guerreiros variados em plástico rígido. Perfeitas para combates em massa e campanhas longas.",
    category: "miniaturas",
    price: 89.90,
    icon: "⚔️",
    specs: ["10 peças", "Plástico", "Não pintadas", "Escala 28mm"],
    isNew: false,
  },
  {
    id: 11,
    name: "Beholder — Resina Pintada",
    description: "Miniatura do clássico Beholder pintada à mão por artista especializado. Detalhes profissionais com sombreamento e iluminação.",
    category: "miniaturas",
    price: 249.90,
    icon: "👁️",
    specs: ["Resina", "Pintada à mão", "Base inclusa", "Escala 28mm"],
    isNew: false,
  },
  {
    id: 12,
    name: "Liche Necromante",
    description: "Miniatura detalhada do temível Liche em resina de alta resolução. Manto esvoaçante e cajado com caveira.",
    category: "miniaturas",
    price: 79.90,
    icon: "💀",
    specs: ["Resina", "Não pintada", "Base 32mm", "Escala 28mm"],
    isNew: false,
  },

  // --- ACESSÓRIOS ---
  {
    id: 13,
    name: "Tapete de Batalha Neoprene 90×60",
    description: "Tapete de neoprene antiderrapante com grid quadriculado. Superfície macia, não risca a mesa. Enrola fácil para transporte.",
    category: "acessorios",
    price: 159.90,
    icon: "🗺️",
    specs: ["90 × 60 cm", "Neoprene 3mm", "Grid 2,5cm", "Antiderrapante"],
    isNew: false,
  },
  {
    id: 14,
    name: "Fichas de Personagem (pad 50 fls)",
    description: "Bloco com 50 folhas de fichas de personagem oficial de D&D 5ª edição. Papel de qualidade, tinta resistente.",
    category: "acessorios",
    price: 29.90,
    icon: "📋",
    specs: ["50 folhas", "A4", "D&D 5ª Ed.", "Papel 90g"],
    isNew: false,
  },
  {
    id: 15,
    name: "Kit de Tokens de Iniciativa (30 un)",
    description: "Tokens acrílicos numerados para controle de iniciativa e status em combate. Inclui suportes de mesa.",
    category: "acessorios",
    price: 39.90,
    icon: "🎭",
    specs: ["30 tokens", "Acrílico 3mm", "Numerados", "Suportes inclusos"],
    isNew: true,
  },
  {
    id: 16,
    name: "Mapa Dungeon Grid Hexagonal",
    description: "Mapa reutilizável em PVC com impressão de grade hexagonal. Pode ser usado com marcadores apagáveis.",
    category: "acessorios",
    price: 69.90,
    icon: "🏔️",
    specs: ["60 × 45 cm", "PVC flexível", "Grid hex", "Reutilizável"],
    isNew: false,
  },
];

// ============================================
// WhatsApp
// ============================================

function buildWhatsAppLink(product) {
  const price = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const msg = [
    `Olá! 👋 Tenho interesse em comprar um produto da *Loja RPG*:`,
    ``,
    `🛒 *${product.name}*`,
    `📦 Categoria: ${categoryLabel(product.category)}`,
    `💰 Preço: ${price}`,
    ``,
    `Poderia me dar mais informações sobre disponibilidade e formas de entrega? Obrigado!`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function categoryLabel(cat) {
  const labels = {
    dados:      "Dados RPG",
    livros:     "Livros",
    miniaturas: "Miniaturas",
    acessorios: "Acessórios",
  };
  return labels[cat] || cat;
}

// ============================================
// Render Helpers
// ============================================

function categoryClass(cat) {
  return `cat-${cat}`;
}

function badgeClass(cat) {
  return `badge-${cat}`;
}

function formatPrice(price) {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function createCardHTML(product) {
  return `
    <article class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image ${categoryClass(product.category)}">
        <span class="product-image-icon">${product.icon}</span>
        <span class="product-badge ${badgeClass(product.category)}">${categoryLabel(product.category)}</span>
        ${product.isNew ? `<span class="product-tag-new">Novo</span>` : ""}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <a
            href="${buildWhatsAppLink(product)}"
            class="product-buy-btn"
            target="_blank"
            rel="noopener"
            onclick="event.stopPropagation()"
            aria-label="Comprar ${product.name} via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Comprar
          </a>
        </div>
      </div>
    </article>
  `;
}

function createModalHTML(product) {
  const specs = product.specs
    .map(s => `<span class="modal-spec">${s}</span>`)
    .join("");

  return `
    <div class="modal-product-image ${categoryClass(product.category)}">
      <span style="font-size:7rem;filter:drop-shadow(0 8px 24px rgba(0,0,0,.6))">${product.icon}</span>
    </div>
    <div class="modal-product-details">
      <span class="modal-badge ${badgeClass(product.category)}">${categoryLabel(product.category)}</span>
      <h2 class="modal-product-name" id="modal-title">${product.name}</h2>
      <p class="modal-product-desc">${product.description}</p>
      <div class="modal-product-specs">${specs}</div>
      <div class="modal-price-row">
        <div>
          <p class="modal-price">${formatPrice(product.price)}</p>
          <p class="modal-price-label">Preço via WhatsApp</p>
        </div>
        <a
          href="${buildWhatsAppLink(product)}"
          class="modal-buy-btn"
          target="_blank"
          rel="noopener"
          aria-label="Comprar via WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Comprar via WhatsApp
        </a>
      </div>
    </div>
  `;
}

// ============================================
// Render Products
// ============================================

let activeFilter = "all";
const grid = document.getElementById("products-grid");
const emptyMsg = document.getElementById("products-empty");

function renderProducts(filter) {
  activeFilter = filter;
  const filtered = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyMsg.classList.remove("hidden");
    return;
  }

  emptyMsg.classList.add("hidden");
  grid.innerHTML = filtered.map(createCardHTML).join("");

  // Attach click-to-open-modal on card (but not on the buy button)
  grid.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = Number(card.dataset.id);
      openModal(id);
    });
  });
}

// ============================================
// Filters
// ============================================

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// ============================================
// Modal
// ============================================

const overlay  = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const closeBtn  = document.getElementById("modal-close");

function openModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  modalBody.innerHTML = createModalHTML(product);
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// ============================================
// Header scroll effect
// ============================================

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });

// ============================================
// Mobile menu
// ============================================

const menuToggle = document.getElementById("menu-toggle");
const mobileNav  = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll(".mobile-nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });
});

// ============================================
// Floating particles in hero
// ============================================

(function spawnParticles() {
  const container = document.getElementById("hero-particles");
  if (!container) return;

  function createParticle() {
    const el = document.createElement("div");
    el.classList.add("particle");

    const x = Math.random() * 100;
    const duration = 4 + Math.random() * 8;
    const delay = Math.random() * 10;
    const size = 1 + Math.random() * 3;

    el.style.cssText = `
      left: ${x}%;
      bottom: ${Math.random() * 40}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(el);
  }

  for (let i = 0; i < 28; i++) createParticle();
})();

// ============================================
// Warn if WhatsApp number not set
// ============================================

if (WHATSAPP_NUMBER === "SEUNUMERO") {
  console.warn(
    "[Loja RPG] ⚠️  Configure seu número do WhatsApp!\n" +
    "Abra o script.js e altere a variável WHATSAPP_NUMBER na linha 13.\n" +
    "Exemplo: const WHATSAPP_NUMBER = \"5531999999999\";"
  );
}

// ============================================
// Init
// ============================================

renderProducts("all");
