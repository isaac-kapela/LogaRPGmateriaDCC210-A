const WA_HREF = 'https://wa.me/SEUNUMERO';

const features = [
  { icon: '🎲', title: 'Dados Premium',  desc: 'Sets exclusivos em metal, resina e pedra natural' },
  { icon: '📦', title: 'Envio Rápido',   desc: 'Embalagem segura e entrega para todo o Brasil' },
  { icon: '💬', title: 'Atendimento',    desc: 'Tire dúvidas direto no WhatsApp, com quem entende' },
  { icon: '⭐', title: 'Qualidade',      desc: 'Produtos testados e aprovados pela comunidade' },
];

export default function About() {
  return (
    <section className="about-section" id="sobre">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Sobre a Forja</h2>
            <p>
              Somos apaixonados por RPG e queremos trazer os melhores materiais
              para aventureiros de todos os níveis — do iniciante ao veterano.
            </p>
            <p>
              Trabalhamos com produtos de alta qualidade, desde dados artesanais
              até miniaturas pintadas à mão. Cada item é escolhido com carinho
              para enriquecer suas campanhas.
            </p>
            <a
              href={WA_HREF}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale Conosco
            </a>
          </div>

          <div className="about-features">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
