import { useState } from 'react';

export function generatePixKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function PixModal({ pixKey, total, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="pix-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pix-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pix-close" onClick={onClose} aria-label="Fechar">✕</button>
        <h3 className="pix-title">Pagamento via Pix</h3>
        {total != null && (
          <p className="pix-subtitle">
            Valor: <strong>{total}</strong>
          </p>
        )}
        <p className="pix-hint">Copie a chave abaixo e cole no seu app do banco:</p>
        <div className="pix-key-box">
          <code className="pix-key">{pixKey}</code>
          <button className="pix-copy-btn" onClick={handleCopy}>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        <p className="pix-footer">A chave é gerada aleatoriamente para este pedido.</p>
      </div>
    </div>
  );
}
