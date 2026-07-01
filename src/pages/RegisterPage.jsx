import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();
  const from         = location.state?.from ?? '/';

  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email || !form.password || !form.confirm) {
      setError('Preencha todos os campos.');
      return;
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const result = register({ name: form.name.trim(), email: form.email, password: form.password });
    setLoading(false);

    if (!result.ok) { setError(result.error); return; }
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span>⚔</span>
          <span>FORJA<span className="auth-logo-accent">RPG</span></span>
        </div>

        <h1 className="auth-title">Criar conta</h1>
        <p className="auth-subtitle">Junte-se à guilda dos aventureiros.</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome de aventureiro"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={set('password')}
              autoComplete="new-password"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Confirmar senha</label>
            <input
              id="confirm"
              type="password"
              placeholder="Repita a senha"
              value={form.confirm}
              onChange={set('confirm')}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-switch">
          Já tem conta?{' '}
          <Link to="/login" state={{ from }}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}
