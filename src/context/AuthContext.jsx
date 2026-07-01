import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const USERS_KEY   = 'forja-users';
const SESSION_KEY = 'forja-session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) ?? []; } catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const register = useCallback(({ name, email, password }) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Este e-mail já está cadastrado.' };
    }
    const newUser = { id: Date.now(), name, email: email.toLowerCase(), password };
    saveUsers([...users, newUser]);
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'E-mail ou senha incorretos.' };
    const session = { id: found.id, name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
