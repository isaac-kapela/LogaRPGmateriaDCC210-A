import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from ?? '/';

  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    const result = login(form);
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

        <h1 className="auth-title">Entrar na conta</h1>
        <p className="auth-subtitle">Bem-vindo de volta, aventureiro.</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
              placeholder="••••••••"
              value={form.password}
              onChange={set('password')}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-switch">
          Não tem conta?{' '}
          <Link to="/cadastro" state={{ from }}>Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
