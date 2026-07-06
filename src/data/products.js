export const WHATSAPP_NUMBER = "553291126624";

export const CATEGORY_LABELS = {
  kits: "Kits",
};

export const CATEGORY_ICONS = {
  kits: "🎁",
};

export const FILTERS = [
  { value: "all",    label: "Todos",  icon: "✕",  type: "cat" },
  { value: "Resina", label: "Resina", icon: "✨", type: "mat" },
  { value: "Metal",  label: "Metal",  icon: "⚙",  type: "mat" },
];

export const SORT_OPTIONS = [
  { value: "popular",    label: "Mais populares" },
  { value: "price-asc",  label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating",     label: "Melhor avaliado" },
  { value: "newest",     label: "Mais recentes" },
];

export const PROMO_SORT_OPTIONS = [
  { value: "discount",   label: "Maior desconto" },
  { value: "price-asc",  label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating",     label: "Melhor avaliado" },
];

export const STATUS_LABELS = {
  novo:           "Novo",
  classico:       "Clássico",
  favorito:       "Favorito",
  "mais-vendido": "Mais Vendido",
};

export const products = [

  /* ════════════════════════
     KITS — Resina
  ════════════════════════ */
  {
    id: 21,
    name: "Kit A Chama Arcana",
    description: "Kit temático de fogo com dados em resina flamejante, bolsa de couro vermelho e 2 fichas de personagem. Para os feiticeiros que jogam com tudo ou nada.",
    category: "kits",
    material: "Resina",
    price: 150,
    image: "/kits/chama-arcana.jpeg",
    icon: "🔥",
    specs: ["7 dados resina fogo", "Bolsa de couro vermelha", "2 fichas personagem", "Guia de magias incluso"],
    tags: ["#kit", "#fogo", "#arcano"],
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    status: "novo",
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: 23,
    name: "Kit O Arauto do Abismo",
    description: "Kit sombrio com dados roxos D20 e D4 translúcidos, grimório de bolso e tokens de criatura. Para os mestres do vazio e da mente.",
    category: "kits",
    material: "Resina",
    price: 150,
    image: "/kits/arauto-do-abismo.jpeg",
    icon: "🐙",
    specs: ["7 dados roxos D20", "Grimório de bolso", "10 tokens criatura", "Véu de tecido roxo"],
    tags: ["#kit", "#abismo", "#psíquico"],
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    status: "favorito",
    rating: 4.9,
    reviewCount: 28,
  },

  /* ════════════════════════
     KITS — Metal
  ════════════════════════ */
  {
    id: 22,
    name: "Kit O Senhor da Forja",
    description: "Kit do guerreiro com dados metálicos D12, martelo de mesa decorativo e escudo do jogador. Para os anões e bárbaros que forjam sua própria lenda.",
    category: "kits",
    material: "Metal",
    price: 250,
    image: "/kits/senhor-da-forja.jpeg",
    icon: "⚒",
    specs: ["7 dados metálicos", "Martelo decorativo", "Escudo do jogador", "Estojo de couro"],
    tags: ["#kit", "#guerreiro", "#forja"],
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    status: "mais-vendido",
    rating: 4.8,
    reviewCount: 31,
  },
  {
    id: 24,
    name: "Kit A Égide Celestial",
    description: "Kit do paladino com dados D20 verde-água metalizados, escudo do mestre e ficha de paladino pré-preenchida. Para os defensores da luz.",
    category: "kits",
    material: "Metal",
    price: 250,
    image: "/kits/egide-celestial.jpeg",
    icon: "🛡",
    specs: ["7 dados D20 verde-água", "Escudo do mestre", "Ficha pré-preenchida", "Caixinha metálica"],
    tags: ["#kit", "#paladino", "#celestial"],
    isNew: false,
    isFeatured: true,
    isBestseller: false,
    status: "favorito",
    rating: 5.0,
    reviewCount: 19,
  },
];
