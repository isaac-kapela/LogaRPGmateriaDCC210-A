export default function Footer() {
  return (
    <>
      <section className="newsletter-section">
        <div className="container">
          <p className="newsletter-eyebrow">Fique por dentro</p>
          <h2 className="newsletter-title">Ofertas Exclusivas</h2>
          <p className="newsletter-text">
            Assine nossa newsletter e ganhe 10% de desconto na primeira compra.
            Além de promoções e novidades do universo RPG.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="seu@email.com" aria-label="E-mail" />
            <button type="submit" className="btn btn-primary">Assinar</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-brand">
                <span className="logo-icon" aria-hidden="true">⚔</span>
                <span>FORJA<span className="logo-accent">RPG</span></span>
              </div>
              <p className="footer-tagline">
                Kits temáticos em resina e metal sólido.
                Dados exclusivos para adventureiros.
              </p>
            </div>

            <div className="footer-col">
              <h4>Produtos</h4>
              <ul>
                <li><a href="/loja?mat=Resina">Resina</a></li>
                <li><a href="/loja?mat=Metal">Metal</a></li>
                <li><a href="/loja">Ver Todos</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Ajuda</h4>
              <ul>
                <li><a href="#">Frete e Entrega</a></li>
                <li><a href="#">Trocas e Devoluções</a></li>
                <li><a href="#">Rastreamento</a></li>
                <li><a href="#">Perguntas Frequentes</a></li>
                <li><a href="#">Fale Conosco</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contato</h4>
              <p className="footer-contact-line">
                <span className="icn">✉</span> contato@forjarpg.com.br
              </p>
              <p className="footer-contact-line">
                <span className="icn">☎</span> (32) 9 1126-624
              </p>
              <p className="footer-contact-line">
                <span className="icn">⌖</span> Juiz de Fora, MG
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} ForjaRPG. Todos os direitos reservados.
            </p>
            <p className="footer-meta">
              <span>🔒 Pagamento seguro</span>
              <span>·</span>
              <span>SSL</span>
              <span>·</span>
              <span>PCI DSS</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
